import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCountries } from "~/hooks/useCountries";
import CountryMap from "~/components/countries/CountryMap";
import AddToBucketBtn from "~/components/countries/AddToBucketBtn";

export function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { getCountry } = useCountries();
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    setCountry(getCountry(code || ""));
  }, []);

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
                  className="h-8"
                />
                <h1 className="text-4xl font-bold">{country.name.common}</h1>
              </div>

              <div className="mt-4">
                <p>
                  <strong>Official Name:</strong> {country.name.official}
                </p>
                <p>
                  <strong>Capital:</strong>{" "}
                  {country.capital ? country.capital.join(", ") : "N/A"}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((curr: any) => curr.name)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>

              <div className="mt-4">
                Fusce egestas molestie ipsum vitae molestie. Proin et tortor in
                orci viverra lacinia a vitae tortor. Nunc porttitor congue dui,
                ac volutpat orci. Fusce vel ornare tellus. Sed ultrices neque
                tincidunt mauris convallis, id pellentesque lorem dignissim.
                Vestibulum at posuere sapien. Etiam aliquet, felis in faucibus
                finibus, ligula nibh hendrerit quam, nec placerat ante velit ut
                ligula. Morbi mollis sit amet sem in scelerisque. Proin eu ex
                justo. In eleifend posuere semper. Suspendisse venenatis
                tincidunt massa. Ut et nunc lacus. Praesent vitae libero sapien.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
                nibh tellus. Donec nec vulputate lacus, eget blandit libero.
              </div>

              <div className="mt-8">
                <AddToBucketBtn country={country} showLabel />
              </div>
            </div>

            <div>
              <CountryMap
                cca2Code={code}
                width="550"
                height="400"
                className="ml-auto"
              ></CountryMap>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
