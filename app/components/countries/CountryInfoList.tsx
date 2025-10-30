export default function CountryInfoList({ country }: { country: any }) {
  return (
    <ul>
      <li>
        <span className="font-bold">Official Name:</span>{" "}
        {country.name.official}
      </li>
      <li>
        <span className="font-bold">Languages:</span>{" "}
        {Object.values(country.languages).join(", ")}
      </li>
      <li>
        <span className="font-bold">Capital:</span> {country.capital.join(", ")}
      </li>
      <li>
        <span className="font-bold">Continent:</span>{" "}
        {country.continents.join(", ")}
      </li>
      <li>
        <span className="font-bold">Population:</span>{" "}
        {country.population.toLocaleString()}
      </li>
      <li>
        <span className="font-bold">Timezones:</span>{" "}
        {country.timezones.join(", ")}
      </li>
      <li>
        <span className="font-bold">Currencies:</span>{" "}
        {Object.keys(country.currencies)[0]}
      </li>
    </ul>
  );
}
