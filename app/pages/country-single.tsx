import { useParams } from "react-router";

export function CountryPage() {
  const { code } = useParams();
  return (
    <main className="flex items-center justify-center pt-32 pb-6">
      <section className="container bg-base-300 p-6 rounded-2xl">
        Country Page - {code}
      </section>
    </main>
  );
}
