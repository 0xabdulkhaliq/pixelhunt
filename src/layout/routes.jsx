import Layout from "./Layout";
import Home from "../pages/Home";
import Gameboard from "../pages/Gameboard";
import Leaderboard from "../pages/Leaderboard";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "gameboard",
        element: <Gameboard />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
];

export default routes;
