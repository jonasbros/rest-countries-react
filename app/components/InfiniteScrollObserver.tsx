import { useEffect, useRef } from "react";
import intersectionObserver from "../utils/intersection-observer";

export default function InfiniteScrollObserver({ onLoadMore, isLastPage }: { onLoadMore: () => void, isLastPage: Boolean }) {
  const loaderRef = useRef(null); 

  useEffect(() => {
    if (!loaderRef.current) return;
    const InfiniteScrollObserver = intersectionObserver(
        loaderRef.current,
        (entry) => {
            if(entry.isIntersecting) {
              onLoadMore();
            }
        },
        {
          root: null,
          rootMargin: "250px",
          threshold: 0,
        }
    );

    return () => {
      InfiniteScrollObserver.cleanup();
    }
  }, [onLoadMore]);

  return (
    <>
      <div ref={loaderRef} />
    </>
  );
}
