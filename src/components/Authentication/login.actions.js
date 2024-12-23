import FirebaseApp from "../../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  setDoc,
  getDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { login, updateProfile as updateUserProfile } from "./login.slice";

const auth = getAuth(FirebaseApp);
const googleProvider = new GoogleAuthProvider();
const postsDb = getFirestore(FirebaseApp);

const handleLogin = async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      const userRef = doc(postsDb, "users", result.user.uid);
      const userSnapshot = await getDoc(userRef);

      let userBio = "";
      if (userSnapshot.exists()) {
        userBio = userSnapshot.data()?.bio || "";
      } else {
        // If the user doesn't exist in Firestore, create an initial entry
        await setDoc(userRef, {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          email: result.user.email,
          bio: "",
        });
      }

      // Dispatch user data to Redux state, including bio
      dispatch(
        login({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          emailVerified: result.user.emailVerified,
          bio: userBio,
        })
      );
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

const updateUserProfileInFirebase = (updatedData) => async (dispatch, getState) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();

    if (!user) {
        console.error("No user is logged in.");
        return;
    }

    try {
        let photoURL = updatedData.photoURL;

        // Check if photoURL is a base64 string (from file input)
        if (photoURL.startsWith("data:image")) {
            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            const base64Response = await fetch(photoURL);
            const blob = await base64Response.blob();

            // Upload the image to Firebase Storage
            await uploadBytes(storageRef, blob);
            photoURL = await getDownloadURL(storageRef); // Get the public URL
        }

        // Update Firebase Authentication Profile
        await updateProfile(user, {
            displayName: updatedData.displayName,
            photoURL: photoURL,
        });

        // Update Firestore with additional user info (like bio)
        const userRef = doc(postsDb, "users", user.uid);
        await setDoc(
            userRef,
            {
                displayName: updatedData.displayName,
                photoURL: photoURL,
                bio: updatedData.bio,
            },
            { merge: true }
        );

        // Update Redux state
        dispatch(
            updateUserProfile({
                displayName: updatedData.displayName,
                photoURL: photoURL,
                bio: updatedData.bio,
            })
        );

        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error.message);
    }
};

export { handleLogin, updateUserProfileInFirebase };
