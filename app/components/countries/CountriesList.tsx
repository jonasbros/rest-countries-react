import { useState, useEffect, useRef } from "react";

import { useCountries } from "~/hooks/useCountries";
import CountryCard from "./CountryCard";
import CountriesLoading from "./CountriesLoading";
import InfiniteScrollObserver from "../InfiniteScrollObserver";

export default function CountriesList() {
  const { getInfiniteScrollPaginated, getTotalPages } = useCountries();
  const [countries, setCountries] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
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
    <>
      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2">
        {countries.length > 0
          ? countries.map((country: any) => (
              <CountryCard country={country} key={country.name.common} />
            ))
          : null}

        {countries.length === 0 || isLoadingMore ? <CountriesLoading /> : null}
      </div>

      {countries.length > 0 ? (
        <InfiniteScrollObserver onLoadMore={loadMoreCountries} />
      ) : null}
    </>
  );
}
