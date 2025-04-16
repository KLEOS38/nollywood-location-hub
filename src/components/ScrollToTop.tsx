
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lastPathRef = useRef(pathname);
  
  useEffect(() => {
    // Only scroll when the pathname actually changes and not on initial render
    if (lastPathRef.current !== pathname) {
      // Debounce the scroll with a setTimeout
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      // Update the ref to the current pathname
      lastPathRef.current = pathname;
      
      // Clear timeout on cleanup
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);
  
  return null;
}
