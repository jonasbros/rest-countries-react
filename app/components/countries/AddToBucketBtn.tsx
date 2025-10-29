import { useState } from "react";
import { useBucketList } from "~/hooks/useBucketList";

export default function AddToBucketBtn({
  country,
  showLabel = false,
  className,
}: {
  country: any;
  showLabel?: boolean;
  className?: string;
}) {
  const { toggleFromBucketList, isCountryInBucketList } = useBucketList();
  const [isInList, setIsInList] = useState(isCountryInBucketList(country));

  const handleToggle = (country: any) => {
    toggleFromBucketList(country);
    isCountryInBucketList(country) ? setIsInList(true) : setIsInList(false);
  };

  return (
    <>
      <label className={`btn btn-square btn-primary swap ${className}`}>
        <input
          id={`add-to-bucketlist__btn-${country.cca2}`}
          type="checkbox"
          checked={isInList}
          onChange={(e) => {
            handleToggle(country);
          }}
        />
        {/* off */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-[1.2em] swap-off"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        {/* on */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="crimson"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-[1.2em] swap-on"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </label>
      {showLabel ? (
        <label
          htmlFor={`add-to-bucketlist__btn-${country.cca2}`}
          className="ml-2 cursor-pointer select-none transition-opacity duration-150 hover:opacity-80"
        >
          {isInList ? "Remove from" : "Add to"} Bucket List
        </label>
      ) : null}
    </>
  );
}
