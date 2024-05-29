/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Timer from "../components/Timer";

export default function Gameboard() {
  const { state } = useLocation();
  if (!state) return <Navigate to="/" />;

  const [coords, setCoords] = useState(false);
  const [targetStats, setTargetStats] = useState(
    Object.fromEntries(
      Array.from({ length: state.targets.length }, (_, i) => [i, false])
    )
  );
  const [tooltipPosition, setTooltipPosition] = useState(true);
  const containerRef = useRef(null);
  const markerRef = useRef(null);
  const imageRef = useRef(null);

  function getCoords(e) {
    const imageRect = e.target.getBoundingClientRect();
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;

    console.log(`X: ${x}px, Y: ${y}px`);
    setCoords({ X: x, Y: y });
  }

  function validateCoordinates(target, index) {
    const img = imageRef.current;

    const cursor = {
      X: Math.floor((coords.X / img.clientWidth) * img.naturalWidth),
      Y: Math.floor((coords.Y / img.clientHeight) * img.naturalHeight),
    };

    console.log(`Native Coordinates for X: ${coords.X}, Y: ${coords.Y}`);
    console.log(`Image Coordinates for X: ${cursor.X}, Y: ${cursor.Y}`);

    const result =
      Math.abs(target.x - cursor.X) < 30 && Math.abs(target.y - cursor.Y) < 30;

    if (result)
      setTargetStats({
        ...targetStats,
        [index]: true,
      });

    createIndicator(result);
  }

  function createIndicator(isSuccess) {
    const indicator = document.createElement("div");
    indicator.style.left = `${coords.X - 28}px`;
    indicator.style.top = `${coords.Y - 28}px`;
    indicator.style.background = isSuccess ? "#0a0b" : "#a00b";
    indicator.className =
      "grid absolute pointer-events-none top-0 left-0 place-items-center -outline-offset-[.3rem] w-14 h-14 rounded-full outline-dashed outline-3 outline-white";

    indicator.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-width="3">${
      isSuccess
        ? '<polyline points="20 6 9 17 4 12"/>'
        : '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
    }</svg>`;

    containerRef.current.appendChild(indicator);
    setCoords(false);
  }

  useEffect(() => {
    if (coords) {
      const { right, left } = markerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const spaceAvailable = screenWidth - Math.min(right, left);

      setTooltipPosition(spaceAvailable >= 210);
    }
  }, [coords]);

  return (
    <main>
      <div ref={containerRef} className="relative">
        <img ref={imageRef} src={state.image} alt="Waldo" onClick={getCoords} />
        {coords && (
          <div
            ref={markerRef}
            style={{
              translate: `${coords.X - 28}px ${coords.Y - 28}px`,
            }}
            className="grid absolute z-20 top-0 left-0 place-items-center -outline-offset-[.3rem] w-14 h-14 rounded-full outline-dashed outline-3 outline-white bg-[#0008]"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>

            <ul
              style={{
                translate: `${tooltipPosition ? "70" : "-70"}%`,
              }}
              className="absolute bg-gray-50 min-w-max top-0 overflow-hidden outline outline-1 outline-gray-400 shadow-2xl rounded-md"
            >
              {state.targets.map((item, index) => (
                <li key={index}>
                  <button
                    disabled={targetStats[index]}
                    onClick={() => validateCoordinates(item.marker, index)}
                    className="p-3 pr-4 flex gap-2 items-center w-full font-normal border border-gray-300 border-collapse text-start transition-[background] md:hover:bg-gray-200 active:bg-gray-300 disabled:pointer-events-none disabled:opacity-50 disabled:line-through"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-12 border border-indigo-300 rounded-md object-cover"
                    />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Timer
        stats={targetStats}
        gameId={state.id}
        targetsPreview={
          <div className="flex flex-col justify-center gap-1 md:flex-row md:min-w-[40rem] md:gap-4">
            {state.targets.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-md bg-gray-50 pr-4 flex gap-2 w-full max-w-52 items-center font-normal text-start"
              >
                <img
                  src={item.image}
                  className="w-12 h-12 outline outline-1 outline-gray-400 rounded-md object-cover"
                />
                {item.name}
              </div>
            ))}
          </div>
        }
      />
    </main>
  );
}
