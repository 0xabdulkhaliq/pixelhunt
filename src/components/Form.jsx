import { useRef, useState } from "react";
import { Loader, CheckCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";

export default function Form({ duration, id }) {
  const name = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [successDialog, setSuccessDialog] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.current) return setError("Username cannot be empty");
    if (name.current.length <= 3)
      return setError("Username must be 3-20 characters");

    try {
      setLoading(true);
      const username = name.current;

      await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/leaderboard/add-score?gameId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, duration }),
        }
      );
    } catch (error) {
      setError("Network Error, Please try again");
    } finally {
      setSuccessDialog(true);

      setTimeout(() => {
        navigate("/");
      }, 1250);
    }
  };

  return successDialog ? (
    <div className="bg-white shadow-xl w-full max-w-96 rounded-lg p-4 py-7 text-center">
      <CheckCircle
        className="text-green-500 mx-auto"
        size={85}
        strokeWidth={1.6}
      />
      <h2 className="font-normal mt-6 text-xl md:text-2xl">
        Score Added Successfully!
      </h2>
    </div>
  ) : (
    <form
      action=""
      onSubmit={handleSubmit}
      className="bg-white shadow-xl w-full max-w-96 rounded-lg p-4 text-center"
    >
      <p className="font-medium mb-1 text-2xl">
        You finished in &nbsp;
        <span className="text-primary">{formatDuration(duration)}</span>!
      </p>
      <p>Submit your score to the Leaderboard</p>

      <div className="text-start mt-8">
        <label htmlFor="name" className="font-normal">
          Username
        </label>
        <input
          onChange={(e) => (name.current = e.target.value)}
          type="text"
          name="name"
          id="name"
          className="block outline mt-2 outline-1 outline-gray-400 w-full rounded-md p-2"
        />

        {error && (
          <p className="text-red-500 mt-2 ml-2 mb-4 font-normal">» {error}</p>
        )}
      </div>
      <button
        disabled={loading}
        className="bg-primary cursor-pointer mt-3 text-white text-center block px-4 py-2 uppercase tracking-wider font-medium shadow-lg rounded-md transition-[transform,background] duration-500 hover:bg-indigo-700 active:scale-90 w-full disabled:pointer-events-none"
      >
        {loading ? (
          <Loader
            color="#fff"
            size={30}
            className="mx-auto animate-spin-slow"
          />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
