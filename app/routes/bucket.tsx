import type { Route } from "./+types/bucket";
import { BucketListPage } from "../pages/bucket";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "myBucket" },
    { name: "description", content: "Countries Bucket List!" },
  ];
}

export default function BucketList() {
  return <BucketListPage />;
}
