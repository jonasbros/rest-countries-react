import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/country/:code", "routes/country.tsx"),
  route("/my-bucket", "routes/bucket.tsx"),
] satisfies RouteConfig;
