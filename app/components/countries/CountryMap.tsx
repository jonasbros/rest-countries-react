import { useEffect, useState } from 'react'
import { useCountries } from '~/hooks/useCountries';

export default function CountryMap({ cca2Code, height, width, className }: { cca2Code: string | undefined, height?: string, width?: string, className: string }) {
    const ApiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY;
    const { getCountry } = useCountries();
    const [country, setCountry] = useState<any>(null);
    
    useEffect(() => {
        setCountry(getCountry(cca2Code || ''));
    }, []);

    return (
        country ? (
            <iframe
                width={width}
                height={height}
                loading="lazy"
                allowFullscreen="true"
                referrerpolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${ApiKey}
                &q=${country.name.common}&center=${country.latlng.join(',')}&zoom=6`}
                className={className}
            >
            </iframe>
        ) : (
            <p>Loading map...</p>
        )
    );
}1