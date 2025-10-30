import { useEffect, useState, useRef, useContext, Suspense } from "react";
import { useCountries } from "~/hooks/useCountries";
import { BucketListSelectedCountry } from "~/context/contexts";
import CountryMap from "../countries/CountryMap";
import CountryInfoList from "../countries/CountryInfoList";

export default function BucketCountryPreview() {
  const { selectedCountry } = useContext(BucketListSelectedCountry);
  const { getCountryInfo } = useCountries();
  const [countryInfo, setCountryInfo] = useState<any>(null);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCountryInfo = async () => {
      setCountryInfo(await getCountryInfo(selectedCountry.name.common));
    };

    fetchCountryInfo();

    setCountryInfo(null);
  }, [selectedCountry]);

  return (
    <div className="col-span-8 pl-6 h-full">
      {!selectedCountry ? (
        <div className="flex justify-center items-center h-full">
          <p className="italic -mt-10">Select a country from the left.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-rows-2 items-start gap-8 h-full">
          <div className="row-span-1">
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
            <CountryInfoList country={selectedCountry} />
          </div>
          <CountryMap
            cca2Code={selectedCountry.cca2}
            width="100%"
            height="300"
            className="ml-auto rounded-lg row-span-1"
          />

          <div className="col-span-2 row-span-1 overflow-y-auto h-full">
            <div className="pr-4">
              {!countryInfo ? (
                <p>Loading Country Info...</p>
              ) : (
                countryInfo.map((paragraph: string) => (
                  <p className="mb-4 text-justify" key={paragraph}>
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
