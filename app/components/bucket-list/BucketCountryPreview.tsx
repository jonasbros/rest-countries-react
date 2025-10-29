import { useEffect, useState, useRef, useContext } from "react";
import { BucketListSelectedCountry } from "~/context/contexts";
import CountryMap from "../countries/CountryMap";

export default function BucketCountryPreview() {
  const { selectedCountry } = useContext(BucketListSelectedCountry);
  return (
    <div className="col-span-8">
      {!selectedCountry ? (
        <div className="flex justify-center items-center h-full">
          <p className="italic -mt-10">Select a country from the left.</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={selectedCountry.flags.svg}
              alt={`${selectedCountry.name.common} flag`}
              className="h-10"
            />
            <div>
              <h1 className="text-4xl font-bold">
                {selectedCountry.name.common}
              </h1>
            </div>
          </div>
          <div>
            <CountryMap
              cca2Code={selectedCountry.cca2}
              width="400"
              height="300"
            />
          </div>
        </div>
      )}
    </div>
  );
}
