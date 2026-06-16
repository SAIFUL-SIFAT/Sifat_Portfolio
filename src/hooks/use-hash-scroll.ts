import { useEffect } from "react";

/**
 * Scrolls to the element matching `window.location.hash` on mount and on
 * subsequent hash changes. This makes hash links like /#skills work even
 * after a page refresh, which is otherwise lost because the SSR document
 * is rendered before the client has a chance to apply the hash.
 *
 * `prefers-reduced-motion` users get instant jumps instead of smooth
 * scrolling.
 */
export function useHashScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;

      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      // Wait one frame so SSR-driven scroll restoration can finish first.
      requestAnimationFrame(() => {
        el.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}
