
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  
  useEffect(() => {
    // Only run the effect if the path actually changed
    if (prevPathRef.current !== pathname) {
      // Set a single timeout with a longer delay
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
      
      // Update the reference
      prevPathRef.current = pathname;
      
      // Clean up
      return () => clearTimeout(timer);
    }
  }, [pathname]);
  
  return null;
}
