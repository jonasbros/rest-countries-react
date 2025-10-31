import { useEffect, useState } from "react";
import { useCountries } from "~/hooks/useCountries";

export default function CountryMap({
  cca2Code,
  className,
}: {
  cca2Code: string | undefined;
  height?: string;
  width?: string;
  className?: string;
}) {
  const ApiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY;
  const { getCountry } = useCountries();
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    setCountry(getCountry(cca2Code || ""));
  }, [cca2Code]);

  return country ? (
    <div className={`relative ${className}`}>
      <span className="loading loading-spinner loading-lg absolute top-1/2 left-1/2 -translate-1/2"></span>

      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen={true}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${ApiKey}
                    &q=${country.name.common}&center=${country.latlng.join(",")}&zoom=6`}
        className="relative z-1 rounded-lg"
      ></iframe>
    </div>
  ) : (
    <p>Loading map...</p>
  );
}
1;
