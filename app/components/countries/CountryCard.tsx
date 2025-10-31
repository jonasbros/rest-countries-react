import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";

import intersectionObserver from "../../utils/intersection-observer";

import AddToBucketBtn from "./AddToBucketBtn";

export default function CountryCard({ country }: { country: any }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isUnloaded, setIsUnloaded] = useState(false);

  const handleUnload = useCallback(() => {
    setIsUnloaded(true);
  }, []);

  const handleReload = useCallback(() => {
    setIsUnloaded(false);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const animationObserver = intersectionObserver(ref.current, (entry) => {
      entry.target.classList.toggle(
        "animate-fade-in-scale-up",
        entry.isIntersecting
      );

      if (entry.isIntersecting) {
        animationObserver.observer.unobserve(entry.target);
      }
    });

    const unloadObserver = intersectionObserver(
      ref.current,
      (entry) => {
        if (entry.isIntersecting) {
          handleReload();
        } else {
          // Check distance for unloading
          const rect = entry.boundingClientRect;
          const distanceFromViewport = Math.abs(
            rect.top - window.innerHeight / 2
          );

          if (distanceFromViewport > 2000) {
            handleUnload();
          }
        }
      },
      {
        rootMargin: "2000px",
      }
    );

    return () => {
      animationObserver.cleanup();
      unloadObserver.cleanup();
    };
  }, []);

  return (
    <div ref={ref} className="country-card card bg-base-100 shadow-sm">
      <figure>
        {isUnloaded ? (
          <div className="w-full h-[250px] bg-gray-200 2xl:h-[210px] lg:h-[250px]" />
        ) : (
          <img
            src={country.flags.png}
            alt="Shoes"
            className="w-full h-[250px] 2xl:h-[210px] lg:h-[250px] sm:h-[210px]"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{country.name.common}</h2>
        <div>
          <div className="grid grid-cols-2">
            <ul>
              <li>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital.join(", ")}
              </li>
              <li>
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </li>
              <li>
                <span className="font-semibold">Continent:</span>{" "}
                {country.continents.join(", ")}
              </li>
              <li>
                <span className="font-semibold">Timezones:</span>{" "}
                {country.timezones.join(", ")}
              </li>
            </ul>

            <ul>
              <li>
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.keys(country.currencies)[0]}
              </li>
              <li>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
        <div className="card-actions justify-end mt-auto">
          <AddToBucketBtn country={country} />
          <Link
            to={`/country/${country.cca2.toLowerCase()}`}
            className="btn btn-primary"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
