
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lastPathRef = useRef(pathname);
  
  useEffect(() => {
    // Only scroll when the pathname actually changes
    if (lastPathRef.current !== pathname) {
      // Scroll to top when the route changes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
      // Update the ref to the current pathname
      lastPathRef.current = pathname;
    }
  }, [pathname]);
  
  return null;
}
