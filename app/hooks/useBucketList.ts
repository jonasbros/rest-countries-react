export function useBucketList() {
  return {
    getAll,
    getInfiniteScrollPaginated,
    addToBucketList,
    setBucketList,
    removeFromBucketList,
    toggleFromBucketList,
    isCountryInBucketList,
    getTotalPages,
  };
}

function getAll() {
  const storedBucketList = localStorage.getItem("bucketList");
  if (storedBucketList) {
    return JSON.parse(storedBucketList);
  }
  return [];
}

function getInfiniteScrollPaginated(page: number = 1, perpage: number = 12) {
  const bucketList = getAll();
  return bucketList.slice(0, page * perpage);
}

function setBucketList(bucketList: any[]) {
  localStorage.setItem("bucketList", JSON.stringify(bucketList));
}

function addToBucketList(country: any) {
  const bucketList = getAll();
  const exists = bucketList.find((item: any) => item.cca2 === country.cca2);
  if (!exists) {
    bucketList.push(country);
    setBucketList(bucketList);
  }
}

function removeFromBucketList(country: any) {
  const bucketList = getAll();
  const updatedBucketList = bucketList.filter(
    (item: any) => item.cca2 !== country.cca2
  );
  setBucketList(updatedBucketList);
}

function toggleFromBucketList(country: any) {
  const bucketList = getAll();
  const exists = bucketList.find((item: any) => item.cca2 === country.cca2);
  if (exists) {
    removeFromBucketList(country);
  } else {
    addToBucketList(country);
  }
}

function isCountryInBucketList(country: any): boolean {
  const bucketList = getAll();
  if (!bucketList.length) return false;
  return bucketList.some((item: any) =>
    item ? item.cca2 === country.cca2 : false
  );
}

function getTotalPages(perpage: number = 12) {
  const bucketList = getAll();
  return Math.ceil(bucketList.length / perpage);
}
