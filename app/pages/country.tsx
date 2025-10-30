import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCountries } from "~/hooks/useCountries";
import CountryMap from "~/components/countries/CountryMap";
import AddToBucketBtn from "~/components/countries/AddToBucketBtn";
import CountryInfoList from "~/components/countries/CountryInfoList";

export function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { getCountry, getCountryInfo } = useCountries();
  const [country, setCountry] = useState<any>(null);
  const [countryInfo, setCountryInfo] = useState<any>(null);

  useEffect(() => {
    setCountry(getCountry(code || ""));
  }, []);

  useEffect(() => {
    if (!country) return;
    const fetchCountryInfo = async () => {
      setCountryInfo(await getCountryInfo(country.name.common));
    };
    fetchCountryInfo();
  });

  return (
    <main className="flex items-center justify-center pt-32 pb-6">
      <section className="container bg-base-300 p-6 rounded-2xl">
        <button
          className="btn btn-primary btn-square btn-sm"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        {!country ? (
          <p className="mt-8">Loading country data...</p>
        ) : (
          <div className="grid grid-cols-2 mt-8">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="h-10"
                />
                <h1 className="text-4xl font-semibold">
                  {country.name.common}
                </h1>
              </div>

              <div className="mt-4">
                <CountryInfoList country={country} />
              </div>

              <div className="mt-8">
                <AddToBucketBtn country={country} showLabel />
              </div>

              <div className="mt-6">
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

            <div>
              <CountryMap
                cca2Code={code}
                width="550"
                height="400"
                className="ml-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
