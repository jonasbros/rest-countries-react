import BucketList from "~/components/bucket-list/BucketList";
import BucketCountryPreview from "~/components/bucket-list/BucketCountryPreview";

export function BucketListPage() {
  return (
    <main className="flex items-center justify-center pt-32 pb-6">
      <section className="container bg-base-300 p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">My Bucket List</h1>
        <div className="grid grid-cols-12 gap-4 h-[600px]">
          <BucketList />
          <BucketCountryPreview />
        </div>
      </section>
    </main>
  );
}
