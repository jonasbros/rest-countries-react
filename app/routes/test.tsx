import type { Route } from "./+types/test";
import { Coom } from "../pages/coom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coom" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Coom />;
}
