import gameData from "../gameData";
import { useState } from "react";

export default function Leaderboard() {
  const [waldo, setWaldo] = useState(0);

  const data = [
    // Mock Score Data...
  ];

  const getFormattedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-[73vh] w-full 2xl:max-w-7xl mx-auto">
      <div className="mx-auto sticky z-10 bg-[#201d5b] top-10 md:top-12">
        <img
          src={`https://wsrv.nl/?url=${gameData[waldo].image}&w=1200&h=300&fit=cover`}
          alt=""
          className="w-full h-40 md:h-52 object-cover"
        />
        <div className="bg-[#25207da8] absolute inset-0">
          <h2 className="font-medium text-2xl md:text-4xl text-white text-center mt-12 md:mt-20">
            {gameData[waldo].title}
          </h2>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td className="border-r-0  md:border-r">
                  {Math.floor((item.time / 1000) % 60)}.{item.time % 1000}s
                </td>
                <td className="hidden  md:table-cell md:border-r-0">
                  {getFormattedDate(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
