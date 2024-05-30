import gameData from "../gameData";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { formatDuration } from "../utils/formatDuration";

export default function Leaderboard() {
  const [waldo, setWaldo] = useState(0);
  const [scores, setScores] = useState(null);

  const getScores = async () => {
    try {
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leaderboard/scores?gameId=${
          waldo + 1
        }`
      );
      const { scores } = await request.json();

      setTimeout(() => setScores(scores), 750);
    } catch (error) {
      console.log("Error during Fetching Scores: ", error);
    }
  };

  useEffect(() => {
    setScores(null);
    getScores();
  }, [waldo]);

  const getFormattedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex-grow w-full 2xl:max-w-7xl mx-auto">
      <div className="mx-auto sticky z-10 bg-[#201d5b] overflow-x-hidden top-10 md:top-12">
        <img
          src={`https://wsrv.nl/?url=${gameData[waldo].image}&w=1200&h=300&fit=cover`}
          alt=""
          className="w-full h-40 md:h-52 object-cover"
        />
        <div className="bg-[#25207da8] pb-6 flex justify-between items-center absolute inset-0">
          <button
            className="p-1 text-white transition-opacity active:opacity-30 disabled:pointer-events-none disabled:opacity-30 md:scale-150 md:pl-2"
            aria-label="Previous Waldo"
            title="Previous Waldo"
            disabled={!waldo}
            onClick={() => setWaldo(waldo - 1)}
          >
            <ChevronLeft strokeWidth={2} />
          </button>
          <h2 className="font-medium text-2xl md:text-4xl text-white text-center">
            {gameData[waldo].title}
          </h2>
          <button
            className="p-1 text-white transition-opacity active:opacity-30 disabled:pointer-events-none disabled:opacity-30 md:scale-150 md:pr-2"
            aria-label="Next Waldo"
            title="Next Waldo"
            disabled={waldo >= gameData.length - 1}
            onClick={() => setWaldo(waldo + 1)}
          >
            <ChevronRight strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="px-3 relative -top-[2.3rem] md:-top-12">
        <table className="table-auto shadow-2xl h-fit mx-auto font-normal text-center w-full max-w-2xl border-separate border-spacing-0 rounded-lg">
          <thead className="sticky top-[10.25rem] md:top-52 z-20 md:text-base outline outline-1 outline-white rounded-t-md">
            <tr className="text-white">
              <th className="bg-primary border-white">Rank</th>
              <th className="bg-primary border-white">Username</th>
              <th className="bg-primary border-r-0 border-white md:border-r">
                Time
              </th>
              <th className="bg-primary hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white outline outline-1 outline-primary rounded-b-md">
            {scores
              ? scores.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td className="border-r-0  md:border-r">
                      {formatDuration(item.time)}
                    </td>
                    <td className="hidden  md:table-cell md:border-r-0">
                      {getFormattedDate(item.createdAt)}
                    </td>
                  </tr>
                ))
              : Array(6)
                  .fill()
                  .map((_, index) => (
                    <tr key={index}>
                      <td className="w-20">{index + 1}</td>
                      <td>
                        <div className="h-4 animate-pulse bg-gray-600 w-3/4 mx-auto"></div>
                      </td>
                      <td className="border-r-0  md:border-r">
                        <div className="h-4 animate-pulse bg-gray-600 w-3/4 mx-auto"></div>
                      </td>
                      <td className="hidden md:table-cell md:border-r-0">
                        <div className="h-4 animate-pulse bg-gray-600 w-3/4 mx-auto"></div>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
