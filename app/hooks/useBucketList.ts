export function useBucketList() {
    return { 
        getBucketList,
        addToBucketList,
        setBucketList,
        removeFromBucketList,
        toggleFromBucketList,
        isCountryInBucketList
    };
}

function getBucketList() {
    const storedBucketList = localStorage.getItem("bucketList");
    if (storedBucketList) {
        return JSON.parse(storedBucketList);
    }
    return [];
}

function setBucketList(bucketList: any[]) {
    localStorage.setItem("bucketList", JSON.stringify(bucketList));
}

function addToBucketList(country: any) {
    const bucketList = getBucketList();
    const exists = bucketList.find((item: any) => item.cca2 === country.cca2);
    if (!exists) {
        bucketList.push(country);
        setBucketList(bucketList);
    }
}

function removeFromBucketList(country: any) {
    const bucketList = getBucketList();
    const updatedBucketList = bucketList.filter((item: any) => item.cca2 !== country.cca2);
    setBucketList(updatedBucketList);
}

function toggleFromBucketList(country: any) {
    const bucketList = getBucketList();
    const exists = bucketList.find((item: any) => item.cca2 === country.cca2);
    if (exists) {
        removeFromBucketList(country);
    } else {
        addToBucketList(country);
    }
}

function isCountryInBucketList(country: any): boolean {
    const bucketList = getBucketList();
    if(!bucketList.length) return false;
    return bucketList.some((item: any) => item ? item.cca2 === country.cca2 : false);
}