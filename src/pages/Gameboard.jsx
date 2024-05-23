import { useState } from "react";

export default function Gameboard() {
  const [coords, setCoords] = useState(false);

  function getCoords(e) {
    const imageRect = e.target.getBoundingClientRect();
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;

    console.log(`X: ${x}px, Y: ${y}px`);
    setCoords({ X: x, Y: y });
  }

  return (
    <main>
      <div className="relative">
        <img src="words-waldo.webp" alt="Waldo" onClick={getCoords} />
        {coords && (
          <div
            style={{
              translate: `${coords.X - 28}px ${coords.Y - 28}px`,
            }}
            className="grid absolute top-0 left-0 place-items-center -outline-offset-[.3rem] w-14 h-14 rounded-full outline-dashed outline-3 outline-white bg-[#0008]"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </main>
  );
}
