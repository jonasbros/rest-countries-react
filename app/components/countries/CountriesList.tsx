'use client';

import { useState, useEffect } from "react";
import { useCountries } from "~/hooks/useCountries";
import CountryCard from "./CountryCard";
import CountriesLoading from "./CountriesLoading";

export default function CountriesList() {
    const { getPaginated  } = useCountries();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fectCountries = async () => {
            const fetchCountries = await getPaginated();
            setCountries(fetchCountries as any);
        }
        fectCountries();
    }, []);

    console.log(countries);

    return (
        <div className="grid grid-cols-4 gap-8">
          {countries.length === 0 ? (
            <CountriesLoading />
          ) : (
            countries.map((country: any) => (
              <CountryCard country={country} key={country.name.common} />
            ))
          )}
        </div>
    );
  }

