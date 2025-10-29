import type { Route } from "./+types/country";
import { CountryPage } from "../pages/country";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "myBucket" },
    { name: "description", content: "Countries Bucket List!" },
  ];
}

export default function Country() {
  return <CountryPage />;
}
