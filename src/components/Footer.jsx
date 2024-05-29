import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="font-normal relative text-gray-700 bg-white border-y border-y-gray-300 py-6 w-full md:flex flex-col gap-6 md:flex-row-reverse md:justify-between md:px-8">
      <div className="hidden md:flex md:flex-row-reverse items-center gap-5">
        <div className="hidden md:flex md:gap-3 justify-evenly align-center">
          <Link
            to={"/"}
            className="underline underline-offset-2 md:hover:text-primary"
          >
            Home
          </Link>
          <Link
            to={"/leaderboard"}
            className="underline underline-offset-2 md:hover:text-primary"
          >
            Leaderboard
          </Link>
        </div>
        <div className="hidden md:block border border-r-gray-400 h-8"></div>
        <SocialLinks />
      </div>
      <div className="flex justify-center items-center flex-col gap-3 md:items-start">
        <p className="font-medium text-3xl">
          Pixel<span className="text-primary">Hunt</span>
        </p>
        <p>
          &copy; Copyright 2024 -{" "}
          <a
            href="https://github.com/0xabdulkhalid/"
            target="_blank"
            className="text-primary"
          >
            0xabdulkhalid
          </a>
        </p>
      </div>
    </footer>
  );
}
