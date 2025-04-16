
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lastPathRef = useRef(pathname);
  const initialRenderRef = useRef(true);
  
  useEffect(() => {
    // Skip the initial render to prevent unnecessary scrolling
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }
    
    // Only scroll when the pathname actually changes
    if (lastPathRef.current !== pathname) {
      // Use a longer timeout to ensure we're not triggering too many history updates
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
      
      // Update the ref to the current pathname
      lastPathRef.current = pathname;
      
      // Clear timeout on cleanup
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);
  
  return null;
}
