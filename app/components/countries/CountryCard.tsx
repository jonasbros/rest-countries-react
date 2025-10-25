import AddToBucketBtn from "./AddToBucketBtn";

export default function CountryCard({ country }: { country: any }) {
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure>
            <img
                src={country.flags.png}
                alt="Shoes"
                className="w-full h-[210px]" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{country.name.common}</h2>
                <p className="mb-4">Vexillologist DSA mumblecore, same paleo etsy slow-carb meggings bicycle rights helvetica small batch. Etsy pinterest gochujang cred mustache. Kombucha raw denim marxism cardigan, dreamcatcher squid.</p>

                <div className="flex justify-between">
                    <ul>
                        <li><span className="font-medium">Capital:</span> {country.capital.join(', ')}</li>
                        <li><span className="font-medium">Continent:</span> {country.continents.join(', ')}</li>
                        <li><span className="font-medium">Population:</span> {country.population.toLocaleString()}</li>
                        <li><span className="font-medium">Timezones:</span> {country.timezones.join(', ')}</li>
                    </ul>

                    <ul>
                        <li><span className="font-medium">Currencies:</span> {Object.keys(country.currencies)[0]}</li>
                        <li><span className="font-medium">Continent:</span> {Object.values(country.continents).join(', ')}</li>
                    </ul>
                </div>

                <div className="card-actions justify-end">
                    <AddToBucketBtn country={country} />
                    <button className="btn btn-primary">More Info</button>
                </div>
            </div>
        </div>
    );
}