import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white p-2 md:p-3 border-b border-solid border-b-gray-300">
      <Link to={"/"} className="font-medium text-2xl">
        Pixel<span className="text-primary">Hunt</span>
      </Link>
    </header>
  );
}
