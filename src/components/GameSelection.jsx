import gameData from "../gameData";
import { Link } from "react-router-dom";
import { Play } from "react-feather";

export default function GameSelection() {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl mb-4 md:mb-8 text-gray-800 font-medium text-center">
        Select your <span className="text-primary">Game</span>
      </h1>

      <div className="flex flex-col gap-5 p-2 max-w-lg mx-auto lg:flex-row lg:justify-center lg:max-w-5xl">
        {gameData.map((item, index) => (
          <div
            key={index}
            className="bg-white outline outline-1 outline-indigo-300 p-2 rounded-lg shadow md:flex-grow"
          >
            <img
              src={`https://wsrv.nl/?url=${item.image}&w=700&h=500&fit=cover`}
              alt=""
              className="w-full border border-indigo-300 rounded-md h-40 object-cover"
            />
            <div className="flex justify-between">
              <Link
                to={"/gameboard"}
                state={item}
                className="btn-primary text-md flex items-center justify-between mt-2 w-full"
              >
                <h2>{item.title}</h2>
                <Play stroke="#fff" strokeWidth={3} size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
