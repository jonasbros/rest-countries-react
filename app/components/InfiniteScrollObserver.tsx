'use client';

import { useEffect, useRef } from "react";

export default function InfiniteScrollObserver({ onLoadMore, isLastPage }: { onLoadMore: () => void, isLastPage: Boolean }) {
  const loaderRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLastPage) {
            onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "250px",
        threshold: 0,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [onLoadMore]);

  return (
    <>
      <div ref={loaderRef} className="h-10" />
    </>
  );
}
