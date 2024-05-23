import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mx-auto">
      <Link to={"/gameboard"} className="btn-primary w-max">
        Game
      </Link>
    </main>
  );
}
