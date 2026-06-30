import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Reset scroll position to top on every route change.
    // We use a small timeout to ensure it happens after React has finished rendering.
    const scrollHandler = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    scrollHandler();
    
    // Some browsers or libraries like AOS might interfere, 
    // so we call it again after a tiny delay for maximum reliability.
    const timeoutId = setTimeout(scrollHandler, 10);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, search]);

  return null;
}
