import { useState, useEffect } from "react";
import BucketList from "~/components/bucket-list/BucketList";
import BucketCountryPreview from "~/components/bucket-list/BucketCountryPreview";
import BucketCountryPreviewModal from "~/components/bucket-list/BucketCountryPreviewModal";
import { BucketListSelectedCountry } from "~/context/contexts";

import getScreenBreakpoint from "~/utils/screen-breakpoint";

export function BucketListPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("md");

  useEffect(() => {
    if (!window) return;
    const screenWidth = window.innerWidth;
    setCurrentBreakpoint(getScreenBreakpoint(screenWidth));

    window.addEventListener("resize", () => {
      const newScreenWidth = window.innerWidth;
      setCurrentBreakpoint(getScreenBreakpoint(newScreenWidth));
    });

    return () => {
      window.removeEventListener("resize", () => {
        const newScreenWidth = window.innerWidth;
        setCurrentBreakpoint(getScreenBreakpoint(newScreenWidth));
      });
    };
  }, []);

  return (
    <BucketListSelectedCountry.Provider
      value={{ selectedCountry, setSelectedCountry }}
    >
      <section className="container bg-base-300 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">My Bucket List</h1>
        <div className="grid grid-cols-12 grid-rows-1 gap-4 h-fit md:h-[600px]">
          <BucketList />

          {currentBreakpoint !== "sm" &&
          currentBreakpoint !== "xs" &&
          currentBreakpoint !== "md" ? (
            <BucketCountryPreview />
          ) : (
            <BucketCountryPreviewModal />
          )}
        </div>
      </section>
    </BucketListSelectedCountry.Provider>
  );
}
