import CountriesList from "~/components/countries/CountriesList";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-32 pb-6">
      <section className="container bg-base-300 p-6 rounded-2xl">
        <CountriesList />
      </section>
    </main>
  );
}
