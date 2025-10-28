import customFetch from "~/lib/api";

export function useCountries() {
  return { getAll, getPaginated, getInfiniteScrollPaginated, getTotalPages, getCountry };
}

async function getAll() {
  const storedCountries = localStorage.getItem("countries");
  if (storedCountries) {
    return JSON.parse(storedCountries);
  }

  const fields = [
    'name',
    'flags',
    'continents',
    'population',
    'capital',
    'timezones',
    'currencies',
    'languages',
    'cca2',
    'latlng',
  ].join(',');

  return await customFetch({ endpoint: `/all?fields=${fields}` })
  .then((data) => {
    localStorage.setItem("countries", JSON.stringify(data));
    return data;
  })
  .catch((error) => {
    console.error("Error fetching countries:", error)
    throw new Error(`Error fetching countries: ${error}`);
  });
}

async function getPaginated(page: number = 1, perpage: number = 12) {
  const countries = await getAll();
  return countries.slice((page - 1) * perpage, page * perpage);
} 

async function getInfiniteScrollPaginated(page: number = 1, perpage: number = 12) {
  const countries = await getAll();
  return countries.slice(0, page * perpage);
} 

function getTotalPages(perpage: number = 12) {
  const storedCountries = localStorage.getItem("countries");
  let countries = [];
  if (storedCountries) {
    countries = JSON.parse(storedCountries);
  }

  return Math.ceil(countries.length / perpage);
}

function getCountry(cca2Code: string) {
  const storedCountries = localStorage.getItem("countries");
  let countries = [];
  if (storedCountries) {
    countries = JSON.parse(storedCountries);
  }

  return countries.find((country: any) => country.cca2 === cca2Code.toUpperCase());
}