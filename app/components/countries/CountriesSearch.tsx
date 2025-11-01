import { useState, useEffect, useRef } from "react";
export default function CountriesSearch({
  onChange,
}: {
  onChange: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    if (!inputRef) return;
    setQuery(inputRef.current!.value);
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  useEffect(() => {
    if (typeof debouncedQuery === "string") {
      onChange(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div className="mb-6">
      <label className="input input-lg">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          ref={inputRef}
          type="search"
          required
          placeholder="Search Countries"
          onChange={handleInput}
        />
      </label>
    </div>
  );
}
