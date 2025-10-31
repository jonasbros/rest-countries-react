export default function CountriesLoading() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </>
  );
}
