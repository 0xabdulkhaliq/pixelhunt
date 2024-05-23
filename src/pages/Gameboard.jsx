import { useState, useEffect, useRef } from "react";

export default function Gameboard() {
  const [coords, setCoords] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(true);
  const markerRef = useRef(null);

  function getCoords(e) {
    const imageRect = e.target.getBoundingClientRect();
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;

    console.log(`X: ${x}px, Y: ${y}px`);
    setCoords({ X: x, Y: y });
  }

  useEffect(() => {
    if (coords) {
      const marker = markerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const rightSpace = screenWidth - marker.right;

      setTooltipPosition(rightSpace >= 110);
    }
  }, [coords]);

  return (
    <main>
      <div className="relative">
        <img src="words-waldo.webp" alt="Waldo" onClick={getCoords} />
        {coords && (
          <div
            ref={markerRef}
            style={{
              translate: `${coords.X - 28}px ${coords.Y - 28}px`,
            }}
            className="grid absolute top-0 left-0 place-items-center -outline-offset-[.3rem] w-14 h-14 rounded-full outline-dashed outline-3 outline-white bg-[#0008]"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>

            <ul
              style={{
                translate: `${tooltipPosition ? "6" : "-6"}rem`,
              }}
              className="absolute min-w-24 top-0 overflow-hidden outline outline-1 outline-gray-400 shadow-2xl rounded-md"
            >
              {[1, 2, 3].map((el, index) => (
                <li key={index} className="w-full">
                  <button className="px-5 w-full py-3 outline font-normal outline-1 outline-gray-400 text-start bg-gray-50 transition-[background] md:hover:bg-gray-200 active:bg-gray-300">
                    Target {el}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
