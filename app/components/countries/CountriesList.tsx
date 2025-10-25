'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import { useCountries } from "~/hooks/useCountries";
import CountryCard from "./CountryCard";
import CountriesLoading from "./CountriesLoading";
import Pagination from "~/components/Pagination";

export default function CountriesList() {
    const {getPaginated, getTotalPages } = useCountries();
    const [countries, setCountries] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchCountries = async () => {
            const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
            const fetchCountries = await getPaginated(currentPage);
            setCountries(fetchCountries as any);
        }
        fetchCountries();
    }, [searchParams.get("page")]);

    useEffect(() => { 
      setTotalPages(getTotalPages());
     }, []);

    return (
      <>
        <div className="grid grid-cols-4 gap-8">
          {countries.length === 0 ? (
            <CountriesLoading />
          ) : (
            countries.map((country: any) => (
              <CountryCard country={country} key={country.name.common} />
            ))
          )}
        </div>

        {countries.length > 0 ? (
          <div className="flex justify-end mt-4">
            <Pagination totalPages={totalPages} />
          </div>
        ) : null} 
      </>

    );
  }

