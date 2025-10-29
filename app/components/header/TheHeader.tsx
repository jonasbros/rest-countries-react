import { Link } from "react-router";
import ThemeSwitch from "./ThemeSwitch";

export default function TheHeader() {
  return (
    <div className="container fixed left-1/2 -translate-x-1/2 mt-4 z-1">
      <nav className="navbar bg-base-300/50 shadow-sm rounded-2xl backdrop-blur-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            myBucket
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link to="/my-bucket" className="btn btn-primary btn-ghost">
                My Bucket
              </Link>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
