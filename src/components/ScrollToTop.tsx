
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lastPathRef = useRef(pathname);
  
  useEffect(() => {
    // Only scroll when the pathname actually changes
    if (lastPathRef.current !== pathname) {
      // Use requestAnimationFrame for smoother scrolling and to prevent rapid updates
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
      
      // Update the ref to the current pathname
      lastPathRef.current = pathname;
    }
  }, [pathname]);
  
  return null;
}
