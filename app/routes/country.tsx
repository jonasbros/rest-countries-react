import type { Route } from "./+types/country";
import { CountryPage } from "../pages/country-single";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "myBucket" },
    { name: "description", content: "Countries Bucket List!" },
  ];
}

export default function Home() {
  return <CountryPage />;
}
