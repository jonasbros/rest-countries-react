import { useEffect, useState, useRef, useContext } from "react";
import { useCountries } from "~/hooks/useCountries";
import { BucketListSelectedCountry } from "~/context/contexts";
import CountryMap from "../countries/CountryMap";
import CountryInfoList from "../countries/CountryInfoList";

export default function BucketCountryPreviewModal() {
  const { selectedCountry } = useContext(BucketListSelectedCountry);
  const { getCountryInfo } = useCountries();
  const [countryInfo, setCountryInfo] = useState<any>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCountryInfo = async () => {
      setCountryInfo(await getCountryInfo(selectedCountry.name.common));
    };

    fetchCountryInfo();

    setCountryInfo(null);
    dialogRef.current?.showModal();
  }, [selectedCountry]);

  return selectedCountry ? (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box py-8">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col items-start gap-4 h-full">
          <div className="flex items-center gap-3">
            <img
              src={selectedCountry.flags.svg}
              alt={`${selectedCountry.name.common} flag`}
              className="h-10"
            />
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">
                {selectedCountry.name.common}
              </h1>
            </div>
          </div>
          <CountryInfoList country={selectedCountry} />
          <CountryMap
            cca2Code={selectedCountry.cca2}
            className="w-full h-[300px]"
          />

          {!countryInfo ? (
            <p>Loading Country Info...</p>
          ) : (
            countryInfo.map((paragraph: string) => (
              <p className="text-justify" key={paragraph}>
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  ) : null;
}
