export function formatTime(time: number) {
  if (time === 0) {
    return {
      message: "The wedding day is here! 🎉",
    };
  }

  const days = Math.floor(time / (1000 * 24 * 60 * 60));
  const hours = Math.floor((time / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((time / (60 * 1000)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
