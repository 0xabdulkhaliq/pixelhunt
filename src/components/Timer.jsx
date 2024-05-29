import { useState, useRef, useEffect } from "react";
import { Clock } from "react-feather";
import Modal from "./Modal";
import Form from "./Form";

const Timer = ({ stats, gameId, targetsPreview }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(new Date() - startTimeRef.current);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    const targetsFound = Object.values(stats).every((value) => value === true);

    if (targetsFound) {
      setIsRunning(false);
      setFormVisible(true);
    }
  }, [stats]);

  const startTimer = () => {
    setModalVisible(false);
    setIsRunning(true);
    startTimeRef.current = new Date() - elapsedTime;
  };

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <>
      <div className="fixed top-0 right-0 mt-[2px] p-2 md:p-3 z-20">
        <div className="flex items-center gap-2 min-w-[7.1rem]">
          <Clock strokeWidth={3} size={19} className="text-primary" />
          <p className="text-lg">{formatTime(elapsedTime)}</p>
        </div>
      </div>
      <Modal visibility={modalVisible}>
        <h2 className="text-white text-2xl font-medium">You need to find,</h2>
        {targetsPreview}
        <button
          className="bg-primary mt-4 mx-auto cursor-pointer text-white border-2 border-white text-center block px-6 py-3 uppercase tracking-wider font-medium shadow-lg rounded-lg transition-[transform,background] duration-500 hover:bg-indigo-700 active:scale-90 text-md w-max"
          onClick={startTimer}
        >
          Start Game
        </button>
      </Modal>
      <Modal visibility={formVisible}>
        <Form duration={elapsedTime} id={gameId} />
      </Modal>
    </>
  );
};

export default Timer;
