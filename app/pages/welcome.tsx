import CountriesList from "~/components/countries/CountriesList";

export function Welcome() {
  return (
    <section className="container bg-base-300 p-6 rounded-2xl">
      <CountriesList />
    </section>
  );
}
