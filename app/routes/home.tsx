import type { Route } from "./+types/home";
import { Welcome } from "../pages/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "myBucket" },
    { name: "description", content: "Countries Bucket List!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
