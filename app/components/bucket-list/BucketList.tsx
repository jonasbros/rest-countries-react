import { useEffect, useState, useRef } from "react";
import { useBucketList } from "~/hooks/useBucketList";

import AddToBucketBtn from "~/components/countries/AddToBucketBtn";
import InfiniteScrollObserver from "../InfiniteScrollObserver";

export default function BucketList() {
  const { getInfiniteScrollPaginated, getTotalPages } = useBucketList();
  const [countries, setCountries] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  const listContainer = useRef<HTMLDivElement>(null);
  currentPageRef.current = currentPage;

  const fetchCountries = async (page = currentPage) => {
    const fetchedCountries = await getInfiniteScrollPaginated(page);
    setCountries(fetchedCountries as any);
  };

  const loadMoreCountries = () => {
    if (currentPageRef.current >= totalPages && isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = currentPageRef.current + 1;
    fetchCountries(nextPage);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setTotalPages(getTotalPages());
  }, []);
  return (
    <div ref={listContainer} className="col-span-4 h-full overflow-y-scroll">
      {countries.length === 0 ? (
        <p className="text-center italic mt-10 opacity-60">
          Your bucket list is empty. Start adding countries!
        </p>
      ) : (
        <>
          <ul className="list bg-base-100 rounded-box shadow-md p-3">
            {countries.map((country) => (
              <li
                className="list-row hover:bg-base-200 cursor-pointer"
                key={country.cca2}
              >
                <div>
                  <img
                    className="h-10 w-14 rounded-box"
                    src={country.flags.png}
                  />
                </div>
                <div>
                  <div>{country.name.common}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {country.name.official}
                  </div>
                </div>
                <AddToBucketBtn country={country} className="btn-soft" />
              </li>
            ))}

            {isLoadingMore && (
              <li className="list-row">
                <div className="h-10 w-14 skeleton"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 skeleton"></div>
                  <div className="h-4 w-64 skeleton"></div>
                </div>
                <div className="size-10 skeleton"></div>
              </li>
            )}
          </ul>
          <InfiniteScrollObserver
            onLoadMore={loadMoreCountries}
            options={{
              root: listContainer.current,
              rootMargin: "0px",
              threshold: 1,
            }}
          />
        </>
      )}
    </div>
  );
}
