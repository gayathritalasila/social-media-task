import { useEffect } from "react";

/**
 * Custom hook to detect and handle clicks outside a specific element.
 *
 * @param {React.RefObject} ref - The React ref of the element to detect outside clicks.
 * @param {Function} callback - The function to call when a click outside the element is detected.
 * @param {boolean} [enabled=true] - Optional flag to enable or disable the hook dynamically.
 */
const useOutsideClick = (ref, callback, enabled = true) => {
    useEffect(() => {
        if (!enabled) return; // Disable the effect if not enabled

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, callback, enabled]);
};

export default useOutsideClick;
