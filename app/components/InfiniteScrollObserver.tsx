import { useEffect, useRef } from "react";
import intersectionObserver from "../utils/intersection-observer";

export default function InfiniteScrollObserver({
  onLoadMore,
  options = {
    root: null,
    rootMargin: "250px",
    threshold: 0,
  },
}: {
  onLoadMore: () => void;
  options?: object;
}) {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    const InfiniteScrollObserver = intersectionObserver(
      loaderRef.current,
      (entry) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      options
    );

    return () => {
      InfiniteScrollObserver.cleanup();
    };
  }, [onLoadMore]);

  return (
    <>
      <div ref={loaderRef} />
    </>
  );
}
