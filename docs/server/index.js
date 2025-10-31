import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, isRouteErrorResponse, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, Meta, Links, ScrollRestoration, Scripts, useParams, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useCallback, useEffect, createContext, useContext } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function ErrorBoundary$1({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", { className: "pt-16 p-4 container mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { children: message }),
    /* @__PURE__ */ jsx("p", { children: details }),
    stack
  ] });
}
function ThemeSwitch() {
  return /* @__PURE__ */ jsxs("label", { className: "swap swap-rotate", children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", className: "theme-controller", value: "cmyk" }),
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "swap-on h-7 w-7 fill-current",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "swap-off h-7 w-7 fill-current",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          }
        )
      }
    )
  ] });
}
function TheHeader() {
  return /* @__PURE__ */ jsx("div", { className: "container fixed left-1/2 -translate-x-1/2 mt-4 z-1", children: /* @__PURE__ */ jsxs("nav", { className: "navbar bg-base-300/50 shadow-sm rounded-2xl backdrop-blur-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "btn btn-ghost text-xl", children: "myBucket" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-none", children: /* @__PURE__ */ jsxs("ul", { className: "menu menu-horizontal px-1 gap-2", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/my-bucket", className: "btn btn-primary btn-ghost", children: "My Bucket" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ThemeSwitch, {}) })
    ] }) })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(TheHeader, {}), /* @__PURE__ */ jsx("main", {
        className: "flex items-center justify-center pt-26 lg:pt-32 pb-6",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsx(ErrorBoundary$1, {
    error
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const customFetch = async ({ endpoint, method = "GET", headers, body }) => {
  const apiUrl = "https://restcountries.com/v3.1";
  try {
    const response = await fetch(apiUrl + endpoint, {
      method,
      headers,
      body
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};
function useCountries() {
  return {
    getAll: getAll$1,
    getPaginated,
    getInfiniteScrollPaginated: getInfiniteScrollPaginated$1,
    getTotalPages: getTotalPages$1,
    getCountry,
    getCountryInfo
  };
}
async function getAll$1() {
  const storedCountries = localStorage.getItem("countries");
  if (storedCountries) {
    return JSON.parse(storedCountries);
  }
  const fields = [
    "name",
    "flags",
    "continents",
    "population",
    "capital",
    "timezones",
    "currencies",
    "languages",
    "cca2",
    "latlng"
  ].join(",");
  return await customFetch({ endpoint: `/all?fields=${fields}` }).then((data) => {
    localStorage.setItem("countries", JSON.stringify(data));
    return data;
  }).catch((error) => {
    console.error("Error fetching countries:", error);
    throw new Error(`Error fetching countries: ${error}`);
  });
}
async function getPaginated(page = 1, perpage = 12) {
  const countries = await getAll$1();
  return countries.slice((page - 1) * perpage, page * perpage);
}
async function getInfiniteScrollPaginated$1(page = 1, perpage = 12) {
  const countries = await getAll$1();
  return countries.slice(0, page * perpage);
}
function getTotalPages$1(perpage = 12) {
  const storedCountries = localStorage.getItem("countries");
  let countries = [];
  if (storedCountries) {
    countries = JSON.parse(storedCountries);
  }
  return Math.ceil(countries.length / perpage);
}
function getCountry(cca2Code) {
  const storedCountries = localStorage.getItem("countries");
  let countries = [];
  if (storedCountries) {
    countries = JSON.parse(storedCountries);
  }
  return countries.find(
    (country2) => country2.cca2 === cca2Code.toUpperCase()
  );
}
async function getCountryInfo(name) {
  const wikiPageUrl = `https://en.wikipedia.org/w/rest.php/v1/page/${name}/html`;
  try {
    const response = await fetch(wikiPageUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.text();
    return extractFirstSectionFromCountryInfo(result);
  } catch (error) {
    console.error(error.message);
  }
}
function extractFirstSectionFromCountryInfo(htmlContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const firstSection = doc.querySelector("section");
  const paragraphs = firstSection?.querySelectorAll("p");
  return Array.from(paragraphs || []).map((p) => p.textContent?.replace(/\[\w+\]/g, "")).filter(
    (text) => text !== null && text?.trim() !== "" && text !== "\n"
  );
}
function intersectionObserver(elements, callback, options) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry2) => {
      callback(entry2);
    });
  }, options);
  if (elements instanceof NodeList) {
    elements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    observer.observe(elements);
  }
  return { observer, cleanup: () => {
    observer.disconnect();
  } };
}
function useBucketList() {
  return {
    getAll,
    getInfiniteScrollPaginated,
    addToBucketList,
    setBucketList,
    removeFromBucketList,
    toggleFromBucketList,
    isCountryInBucketList,
    getTotalPages
  };
}
function getAll() {
  const storedBucketList = localStorage.getItem("bucketList");
  if (storedBucketList) {
    return JSON.parse(storedBucketList);
  }
  return [];
}
function getInfiniteScrollPaginated(page = 1, perpage = 12) {
  const bucketList = getAll();
  return bucketList.slice(0, page * perpage);
}
function setBucketList(bucketList) {
  localStorage.setItem("bucketList", JSON.stringify(bucketList));
}
function addToBucketList(country2) {
  const bucketList = getAll();
  const exists = bucketList.find((item) => item.cca2 === country2.cca2);
  if (!exists) {
    bucketList.push(country2);
    setBucketList(bucketList);
  }
}
function removeFromBucketList(country2) {
  const bucketList = getAll();
  const updatedBucketList = bucketList.filter(
    (item) => item.cca2 !== country2.cca2
  );
  setBucketList(updatedBucketList);
}
function toggleFromBucketList(country2) {
  const bucketList = getAll();
  const exists = bucketList.find((item) => item.cca2 === country2.cca2);
  if (exists) {
    removeFromBucketList(country2);
  } else {
    addToBucketList(country2);
  }
}
function isCountryInBucketList(country2) {
  const bucketList = getAll();
  if (!bucketList.length) return false;
  return bucketList.some(
    (item) => item ? item.cca2 === country2.cca2 : false
  );
}
function getTotalPages(perpage = 12) {
  const bucketList = getAll();
  return Math.ceil(bucketList.length / perpage);
}
function AddToBucketBtn({
  country: country2,
  showLabel = false,
  className
}) {
  const { toggleFromBucketList: toggleFromBucketList2, isCountryInBucketList: isCountryInBucketList2 } = useBucketList();
  const [isInList, setIsInList] = useState(isCountryInBucketList2(country2));
  const handleToggle = (country22) => {
    toggleFromBucketList2(country22);
    isCountryInBucketList2(country22) ? setIsInList(true) : setIsInList(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("label", { className: `btn btn-square btn-primary swap ${className}`, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: `add-to-bucketlist__btn-${country2.cca2}`,
          type: "checkbox",
          checked: isInList,
          onChange: (e) => {
            handleToggle(country2);
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "2.5",
          stroke: "currentColor",
          className: "size-[1.2em] swap-off",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "crimson",
          viewBox: "0 0 24 24",
          strokeWidth: "2.5",
          stroke: "currentColor",
          className: "size-[1.2em] swap-on",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            }
          )
        }
      )
    ] }),
    showLabel ? /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: `add-to-bucketlist__btn-${country2.cca2}`,
        className: "ml-2 cursor-pointer select-none transition-opacity duration-150 hover:opacity-80",
        children: [
          isInList ? "Remove from" : "Add to",
          " Bucket List"
        ]
      }
    ) : null
  ] });
}
function CountryCard({ country: country2 }) {
  const ref = useRef(null);
  const [isUnloaded, setIsUnloaded] = useState(false);
  const handleUnload = useCallback(() => {
    setIsUnloaded(true);
  }, []);
  const handleReload = useCallback(() => {
    setIsUnloaded(false);
  }, []);
  useEffect(() => {
    if (!ref.current) return;
    const animationObserver = intersectionObserver(ref.current, (entry2) => {
      entry2.target.classList.toggle(
        "animate-fade-in-scale-up",
        entry2.isIntersecting
      );
      if (entry2.isIntersecting) {
        animationObserver.observer.unobserve(entry2.target);
      }
    });
    const unloadObserver = intersectionObserver(
      ref.current,
      (entry2) => {
        if (entry2.isIntersecting) {
          handleReload();
        } else {
          const rect = entry2.boundingClientRect;
          const distanceFromViewport = Math.abs(
            rect.top - window.innerHeight / 2
          );
          if (distanceFromViewport > 2e3) {
            handleUnload();
          }
        }
      },
      {
        rootMargin: "2000px"
      }
    );
    return () => {
      animationObserver.cleanup();
      unloadObserver.cleanup();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref, className: "country-card card bg-base-100 shadow-sm", children: [
    /* @__PURE__ */ jsx("figure", { children: isUnloaded ? /* @__PURE__ */ jsx("div", { className: "w-full h-[250px] bg-gray-200 2xl:h-[210px] lg:h-[250px]" }) : /* @__PURE__ */ jsx(
      "img",
      {
        src: country2.flags.png,
        alt: "Shoes",
        className: "w-full h-[250px] 2xl:h-[210px] lg:h-[250px] sm:h-[210px]"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsx("h2", { className: "card-title", children: country2.name.common }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Capital:" }),
            " ",
            country2.capital.join(", ")
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Languages:" }),
            " ",
            Object.values(country2.languages).join(", ")
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Continent:" }),
            " ",
            country2.continents.join(", ")
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Timezones:" }),
            " ",
            country2.timezones.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Currencies:" }),
            " ",
            Object.keys(country2.currencies)[0]
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Population:" }),
            " ",
            country2.population.toLocaleString()
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "card-actions justify-end mt-auto", children: [
        /* @__PURE__ */ jsx(AddToBucketBtn, { country: country2 }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/country/${country2.cca2.toLowerCase()}`,
            className: "btn btn-primary",
            children: "More Info"
          }
        )
      ] })
    ] })
  ] });
}
function CountriesLoading() {
  return /* @__PURE__ */ jsx(Fragment, { children: [...Array(8)].map((_, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "skeleton h-32 w-full" }),
    /* @__PURE__ */ jsx("div", { className: "skeleton h-4 w-28" }),
    /* @__PURE__ */ jsx("div", { className: "skeleton h-4 w-full" }),
    /* @__PURE__ */ jsx("div", { className: "skeleton h-4 w-full" })
  ] }, index)) });
}
function InfiniteScrollObserver({
  onLoadMore,
  options = {
    root: null,
    rootMargin: "250px",
    threshold: 0
  }
}) {
  const loaderRef = useRef(null);
  useEffect(() => {
    if (!loaderRef.current) return;
    const InfiniteScrollObserver2 = intersectionObserver(
      loaderRef.current,
      (entry2) => {
        if (entry2.isIntersecting) {
          onLoadMore();
        }
      },
      options
    );
    return () => {
      InfiniteScrollObserver2.cleanup();
    };
  }, [onLoadMore]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { ref: loaderRef }) });
}
function CountriesList() {
  const { getInfiniteScrollPaginated: getInfiniteScrollPaginated2, getTotalPages: getTotalPages2 } = useCountries();
  const [countries, setCountries] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  currentPageRef.current = currentPage;
  const fetchCountries = async (page = currentPage) => {
    const fetchedCountries = await getInfiniteScrollPaginated2(page);
    setCountries(fetchedCountries);
  };
  const loadMoreCountries = () => {
    if (currentPageRef.current >= totalPages && isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = currentPageRef.current + 1;
    fetchCountries(nextPage);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    setTotalPages(getTotalPages2());
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2", children: [
      countries.length > 0 ? countries.map((country2) => /* @__PURE__ */ jsx(CountryCard, { country: country2 }, country2.name.common)) : null,
      countries.length === 0 || isLoadingMore ? /* @__PURE__ */ jsx(CountriesLoading, {}) : null
    ] }),
    countries.length > 0 ? /* @__PURE__ */ jsx(InfiniteScrollObserver, { onLoadMore: loadMoreCountries }) : null
  ] });
}
function Welcome() {
  return /* @__PURE__ */ jsx("section", { className: "container bg-base-300 p-6 rounded-2xl", children: /* @__PURE__ */ jsx(CountriesList, {}) });
}
function meta$2({}) {
  return [{
    title: "myBucket"
  }, {
    name: "description",
    content: "Countries Bucket List!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function CountryMap({
  cca2Code,
  className
}) {
  const ApiKey = "AIzaSyBTtmpgbiwn7oSPXVT-DQBir0j60tQqcHg";
  const { getCountry: getCountry2 } = useCountries();
  const [country2, setCountry] = useState(null);
  useEffect(() => {
    setCountry(getCountry2(cca2Code || ""));
  }, [cca2Code]);
  return country2 ? /* @__PURE__ */ jsxs("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-lg absolute top-1/2 left-1/2 -translate-1/2" }),
    /* @__PURE__ */ jsx(
      "iframe",
      {
        width: "100%",
        height: "100%",
        loading: "lazy",
        allowFullScreen: true,
        referrerPolicy: "no-referrer-when-downgrade",
        src: `https://www.google.com/maps/embed/v1/place?key=${ApiKey}
                    &q=${country2.name.common}&center=${country2.latlng.join(",")}&zoom=6`,
        className: "relative z-1 rounded-lg"
      }
    )
  ] }) : /* @__PURE__ */ jsx("p", { children: "Loading map..." });
}
function CountryInfoList({ country: country2 }) {
  return /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Official Name:" }),
      " ",
      country2.name.official
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Languages:" }),
      " ",
      Object.values(country2.languages).join(", ")
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Capital:" }),
      " ",
      country2.capital.join(", ")
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Continent:" }),
      " ",
      country2.continents.join(", ")
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Population:" }),
      " ",
      country2.population.toLocaleString()
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Timezones:" }),
      " ",
      country2.timezones.join(", ")
    ] }),
    /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Currencies:" }),
      " ",
      Object.keys(country2.currencies)[0]
    ] })
  ] });
}
function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { getCountry: getCountry2, getCountryInfo: getCountryInfo2 } = useCountries();
  const [country2, setCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  useEffect(() => {
    setCountry(getCountry2(code || ""));
  }, []);
  useEffect(() => {
    if (!country2) return;
    const fetchCountryInfo = async () => {
      setCountryInfo(await getCountryInfo2(country2.name.common));
    };
    fetchCountryInfo();
  });
  return /* @__PURE__ */ jsxs("section", { className: "container bg-base-300 p-6 rounded-2xl", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "btn btn-primary btn-square btn-sm",
        onClick: () => navigate(-1),
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx("line", { x1: "19", y1: "12", x2: "5", y2: "12" }),
              /* @__PURE__ */ jsx("polyline", { points: "12 19 5 12 12 5" })
            ]
          }
        )
      }
    ),
    !country2 ? /* @__PURE__ */ jsx("p", { className: "mt-8", children: "Loading country data..." }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: country2.flags.svg,
                alt: `${country2.name.common} flag`,
                className: "h-10"
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold", children: country2.name.common })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(CountryInfoList, { country: country2 }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(AddToBucketBtn, { country: country2, showLabel: true }) })
        ] }),
        /* @__PURE__ */ jsx(
          CountryMap,
          {
            cca2Code: code,
            className: "mt-4 md:mt-0 md:ml-auto rounded-lg w-full h-[300px] md:h-full"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 md:mt-0", children: !countryInfo ? /* @__PURE__ */ jsx("p", { children: "Loading Country Info..." }) : countryInfo.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "mb-4 text-justify", children: paragraph }, paragraph)) })
    ] })
  ] });
}
function meta$1({}) {
  return [{
    title: "myBucket"
  }, {
    name: "description",
    content: "Countries Bucket List!"
  }];
}
const country = UNSAFE_withComponentProps(function Country() {
  return /* @__PURE__ */ jsx(CountryPage, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: country,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const BucketListSelectedCountry = createContext(null);
function BucketList() {
  const { getInfiniteScrollPaginated: getInfiniteScrollPaginated2, getTotalPages: getTotalPages2 } = useBucketList();
  const [countries, setCountries] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  const listContainer = useRef(null);
  const { setSelectedCountry } = useContext(BucketListSelectedCountry);
  currentPageRef.current = currentPage;
  const fetchCountries = async (page = currentPage) => {
    const fetchedCountries = await getInfiniteScrollPaginated2(page);
    setCountries(fetchedCountries);
  };
  const loadMoreCountries = () => {
    if (currentPageRef.current >= totalPages && isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = currentPageRef.current + 1;
    fetchCountries(nextPage);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };
  const selectCountry = (country2) => {
    setSelectedCountry(country2);
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    setTotalPages(getTotalPages2());
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: listContainer,
      className: "col-span-12 lg:col-span-4 overflow-y-auto pr-2 h-[600px] md:h-full",
      children: countries.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center italic mt-10 opacity-60", children: "Your bucket list is empty. Start adding countries!" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("ul", { className: "list bg-base-100 rounded-box shadow-md", children: [
          countries.map((country2) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "list-row hover:bg-base-200 cursor-pointer",
              onClick: () => selectCountry(country2),
              children: [
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { className: "h-10", src: country2.flags.png }) }),
                /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
                  /* @__PURE__ */ jsx("p", { children: country2.name.common }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs uppercase font-semibold opacity-60", children: country2.name.official })
                ] }),
                /* @__PURE__ */ jsx(AddToBucketBtn, { country: country2, className: "btn-soft" })
              ]
            },
            country2.cca2
          )),
          isLoadingMore && /* @__PURE__ */ jsxs("li", { className: "list-row", children: [
            /* @__PURE__ */ jsx("div", { className: "h-10 w-14 skeleton" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 w-32 skeleton" }),
              /* @__PURE__ */ jsx("div", { className: "h-4 w-64 skeleton" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "size-10 skeleton" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          InfiniteScrollObserver,
          {
            onLoadMore: loadMoreCountries,
            options: {
              root: listContainer.current,
              rootMargin: "0px",
              threshold: 1
            }
          }
        )
      ] })
    }
  );
}
function BucketCountryPreview() {
  const { selectedCountry } = useContext(BucketListSelectedCountry);
  const { getCountryInfo: getCountryInfo2 } = useCountries();
  const [countryInfo, setCountryInfo] = useState(null);
  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCountryInfo = async () => {
      setCountryInfo(await getCountryInfo2(selectedCountry.name.common));
    };
    fetchCountryInfo();
    setCountryInfo(null);
  }, [selectedCountry]);
  return /* @__PURE__ */ jsx("div", { className: "col-span-8 pl-6 h-full", children: !selectedCountry ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsx("p", { className: "italic -mt-10", children: "Select a country from the left." }) }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 grid-rows-2 items-start gap-8 h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "row-span-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: selectedCountry.flags.svg,
            alt: `${selectedCountry.name.common} flag`,
            className: "h-10"
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: selectedCountry.name.common }) })
      ] }),
      /* @__PURE__ */ jsx(CountryInfoList, { country: selectedCountry })
    ] }),
    /* @__PURE__ */ jsx(
      CountryMap,
      {
        cca2Code: selectedCountry.cca2,
        className: "w-full lg:h-[300px] row-span-1"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 row-span-1 overflow-y-auto h-full", children: /* @__PURE__ */ jsx("div", { className: "pr-4", children: !countryInfo ? /* @__PURE__ */ jsx("p", { children: "Loading Country Info..." }) : countryInfo.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "mb-4 text-justify", children: paragraph }, paragraph)) }) })
  ] }) });
}
function BucketCountryPreviewModal() {
  const { selectedCountry } = useContext(BucketListSelectedCountry);
  const { getCountryInfo: getCountryInfo2 } = useCountries();
  const [countryInfo, setCountryInfo] = useState(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!selectedCountry) return;
    const fetchCountryInfo = async () => {
      setCountryInfo(await getCountryInfo2(selectedCountry.name.common));
    };
    fetchCountryInfo();
    setCountryInfo(null);
    dialogRef.current?.showModal();
  }, [selectedCountry]);
  return !selectedCountry ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsx("p", { className: "italic -mt-10", children: "Select a country." }) }) : /* @__PURE__ */ jsxs("dialog", { ref: dialogRef, className: "modal", children: [
    /* @__PURE__ */ jsxs("div", { className: "modal-box py-8", children: [
      /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", children: "✕" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-4 h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: selectedCountry.flags.svg,
              alt: `${selectedCountry.name.common} flag`,
              className: "h-10"
            }
          ),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-4xl font-bold", children: selectedCountry.name.common }) })
        ] }),
        /* @__PURE__ */ jsx(CountryInfoList, { country: selectedCountry }),
        /* @__PURE__ */ jsx(
          CountryMap,
          {
            cca2Code: selectedCountry.cca2,
            className: "w-full h-[300px]"
          }
        ),
        !countryInfo ? /* @__PURE__ */ jsx("p", { children: "Loading Country Info..." }) : countryInfo.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "text-justify", children: paragraph }, paragraph))
      ] })
    ] }),
    /* @__PURE__ */ jsx("form", { method: "dialog", className: "modal-backdrop", children: /* @__PURE__ */ jsx("button", { children: "close" }) })
  ] });
}
function getScreenBreakpoint(screenWidth) {
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  };
  if (screenWidth >= breakpoints["2xl"]) return "2xl";
  if (screenWidth >= breakpoints.xl) return "xl";
  if (screenWidth >= breakpoints.lg) return "lg";
  if (screenWidth >= breakpoints.md) return "md";
  if (screenWidth >= breakpoints.sm) return "sm";
  return "xs";
}
function BucketListPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("md");
  useEffect(() => {
    if (!window) return;
    const screenWidth = window.innerWidth;
    setCurrentBreakpoint(getScreenBreakpoint(screenWidth));
    window.addEventListener("resize", () => {
      const newScreenWidth = window.innerWidth;
      setCurrentBreakpoint(getScreenBreakpoint(newScreenWidth));
    });
    return () => {
      window.removeEventListener("resize", () => {
        const newScreenWidth = window.innerWidth;
        setCurrentBreakpoint(getScreenBreakpoint(newScreenWidth));
      });
    };
  }, []);
  return /* @__PURE__ */ jsx(
    BucketListSelectedCountry.Provider,
    {
      value: { selectedCountry, setSelectedCountry },
      children: /* @__PURE__ */ jsxs("section", { className: "container bg-base-300 p-6 rounded-2xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "My Bucket List" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 grid-rows-1 gap-4 h-fit md:h-[600px]", children: [
          /* @__PURE__ */ jsx(BucketList, {}),
          currentBreakpoint !== "sm" && currentBreakpoint !== "xs" && currentBreakpoint !== "md" ? /* @__PURE__ */ jsx(BucketCountryPreview, {}) : /* @__PURE__ */ jsx(BucketCountryPreviewModal, {})
        ] })
      ] })
    }
  );
}
function meta({}) {
  return [{
    title: "myBucket"
  }, {
    name: "description",
    content: "Countries Bucket List!"
  }];
}
const bucket = UNSAFE_withComponentProps(function BucketList2() {
  return /* @__PURE__ */ jsx(BucketListPage, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bucket,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CAlpmPlg.js", "imports": ["/assets/chunk-OIYGIGL5-Cc9HuriF.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-C4FZh8Eo.js", "imports": ["/assets/chunk-OIYGIGL5-Cc9HuriF.js"], "css": ["/assets/root-ChIehVzr.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Lctakj_R.js", "imports": ["/assets/chunk-OIYGIGL5-Cc9HuriF.js", "/assets/AddToBucketBtn-CO2KqOW1.js", "/assets/InfiniteScrollObserver-CYXGa9se.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/country": { "id": "routes/country", "parentId": "root", "path": "/country/:code", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/country-DVw3xmlt.js", "imports": ["/assets/chunk-OIYGIGL5-Cc9HuriF.js", "/assets/AddToBucketBtn-CO2KqOW1.js", "/assets/CountryInfoList-blIKev0O.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/bucket": { "id": "routes/bucket", "parentId": "root", "path": "/my-bucket", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/bucket-CR6jEZZK.js", "imports": ["/assets/chunk-OIYGIGL5-Cc9HuriF.js", "/assets/AddToBucketBtn-CO2KqOW1.js", "/assets/InfiniteScrollObserver-CYXGa9se.js", "/assets/CountryInfoList-blIKev0O.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-f39ba552.js", "version": "f39ba552", "sri": void 0 };
const assetsBuildDirectory = "docs\\client";
const basename = "/";
const future = { "v8_middleware": true, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/country": {
    id: "routes/country",
    parentId: "root",
    path: "/country/:code",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/bucket": {
    id: "routes/bucket",
    parentId: "root",
    path: "/my-bucket",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
