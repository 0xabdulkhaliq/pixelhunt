export const formatDuration = (duration) => {
  const totalMilliseconds = duration % 1000;
  const totalSeconds = Math.floor((duration / 1000) % 60);
  const totalMinutes = Math.floor(duration / 1000 / 60);

  if (totalMinutes > 0) {
    return `${totalMinutes}m ${totalSeconds}s`;
  } else {
    return `${totalSeconds}.${totalMilliseconds.toString().padStart(3, "0")}s`;
  }
};
