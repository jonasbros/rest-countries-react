import { useState, useEffect, useRef } from "react";

import { useCountries } from "~/hooks/useCountries";
import CountryCard from "./CountryCard";
import CountriesLoading from "./CountriesLoading";
import CountriesSearch from "./CountriesSearch";
import InfiniteScrollObserver from "../InfiniteScrollObserver";

export default function CountriesList() {
  const { getInfiniteScrollPaginated, getTotalPages, getSearchResults } =
    useCountries();
  const [countries, setCountries] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
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

  const searchCountries = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setTotalPages(getTotalPages());
  }, []);

  useEffect(() => {
    const runSearch = async () => {
      setCountries(await getSearchResults(query));
    };

    runSearch();
  }, [query]);

  return (
    <>
      <CountriesSearch onChange={searchCountries} />
      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2">
        {countries.length > 0
          ? countries.map((country: any) => (
              <CountryCard country={country} key={country.name.common} />
            ))
          : null}

        {countries.length === 0 || isLoadingMore ? <CountriesLoading /> : null}
      </div>

      {countries.length > 0 && !query ? (
        <InfiniteScrollObserver onLoadMore={loadMoreCountries} />
      ) : null}
    </>
  );
}
