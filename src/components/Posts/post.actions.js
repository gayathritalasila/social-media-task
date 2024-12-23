import FirebaseApp from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp, getDocs, query, where, getFirestore, doc,getDoc,updateDoc } from "firebase/firestore";
import { addPost, setPosts, setLoading, likePost, setPostLikes } from "./posts.slice";

const storage = getStorage(FirebaseApp);
const postsDb = getFirestore(FirebaseApp);

const uploadMedia = async (file, userId) => {
    if (!file) {
        console.log("No file provided for upload");
        return null;
    }
    try {
        const storageRef = ref(storage, `posts/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);
        return fileURL;
    } catch (error) {
        console.log("Error uploading file:", error.message);
        return null;
    }
};


const addPostToFirestone = (userId, userName, userPhoto, content, mediaFiles) => async (dispatch) => {
  if (!mediaFiles || mediaFiles.length === 0) {
    // Handle no media files selected
    return;
  }

  try {
    dispatch(setLoading(true));

    // Upload media files
    const mediaPromises = mediaFiles.map(async (file) => {
      try {
        return await uploadMedia(file, userId);
      } catch (error) {
        console.error("Error uploading media:", error.message);
        return null;
      }
    });

    const mediaURLs = await Promise.all(mediaPromises);

    console.log("Adding post to Firestore:", { userId, userName, userPhoto, content, mediaFiles });
    // Add post to Firestore with an initial likes count of 0
    const postRef = await addDoc(collection(postsDb, "posts"), {
      userId,
      userName,
      userPhoto,
      content,
      media: mediaURLs.filter((url) => url), // Filter out any failed uploads
      timestamp: serverTimestamp(),
      likes: 0,  // New likes field
      likedBy: [], // Array to track users who liked the post
    });

    console.log("Post added with ID:", postRef.id);

    // Fetch the Firestore document to get the resolved timestamp
    const postSnapshot = await postRef.get();
    const postData = postSnapshot.data();
    const resolvedTimestamp = postData.timestamp.toDate(); // Convert Firestore Timestamp to Date

    // Prepare newPost object
    const newPost = {
      id: postRef.id,
      userId,
      userName,
      userPhoto,
      content,
      media: mediaURLs.filter((url) => url),
      timestamp: resolvedTimestamp, // Use Date object or resolved timestamp
      likes: 0, // Initialize likes count
      likedBy: [], // Initialize likedBy array
    };

    // Dispatch actions
    dispatch(addPost(newPost));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error adding post:", error.message);
    dispatch(setLoading(false));
  }
};

const likePostAction = (postId, userId) => async (dispatch) => {
  try {
      const postRef = doc(postsDb, "posts", postId);
      const postSnapshot = await getDoc(postRef);

      if (!postSnapshot.exists()) {
          console.error("Post not found");
          return false;
      }

      const postData = postSnapshot.data();

      if (postData.likedBy.includes(userId)) {
          console.log("User already liked this post.");
          return false; // User already liked the post
      }

      await updateDoc(postRef, {
          likes: postData.likes + 1,
          likedBy: [...postData.likedBy, userId],
      });

      console.log("Post liked successfully");

      // Optionally: dispatch updated data to Redux
      const updatedPostSnapshot = await getDoc(postRef);
      const updatedPostData = updatedPostSnapshot.data();

      dispatch(
          setPostLikes({
              postId,
              likes: updatedPostData.likes,
              likedBy: updatedPostData.likedBy,
          })
      );

      return true;
  } catch (error) {
      console.error("Error liking post:", error.message);
      return false;
  }
};

  
const fetchPostFromFirestone = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const querySnapshot = await getDocs(collection(postsDb, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        dispatch(setPosts(fetchedPosts));
        dispatch(setLoading(false));
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        dispatch(setLoading(false));
    }
};

const fetchAllPosts = () => async (dispatch, getState) => {
  try {
      dispatch(setLoading(true));

      // Fetch all posts from Firestore
      const querySnapshot = await getDocs(collection(postsDb, "posts"));

      // Access the current Redux state to get the logged-in user's ID
      const { login: { user } } = getState();
      const loggedUserId = user?.uid;

      // Filter posts to exclude those created by the logged-in user
      const fetchedPosts = querySnapshot.docs
          .map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }))
          .filter((post) => post.userId !== loggedUserId);

      // Dispatch the filtered posts to the Redux store
      dispatch(setPosts(fetchedPosts));
      dispatch(setLoading(false));
  } catch (error) {
      console.error("Error fetching posts:", error.message);
      dispatch(setLoading(false));
  }
};

const fetchUserPostsFromFirestore = (userId) => async (dispatch) => {
  try {
      dispatch(setLoading(true));

      // Create a Firestore query to filter posts by userId
      const postsQuery = query(
          collection(postsDb, "posts"),
          where("userId", "==", userId)  // Filter posts based on userId
      );

      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
      // Dispatch posts to the Redux store
      dispatch(setPosts(fetchedPosts));
      dispatch(setLoading(false));
  } catch (error) {
      console.error("Error fetching posts:", error.message);
      dispatch(setLoading(false));
  }
};


export { uploadMedia, addPostToFirestone, likePostAction, fetchPostFromFirestone, fetchAllPosts, fetchUserPostsFromFirestore };
