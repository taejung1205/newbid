import { useEffect, useState } from "react";

export function useCountdown(targetDate: Date | undefined) {
  if (targetDate === undefined || typeof targetDate === "undefined") {
    return [-1, -1, -1];
  }
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
}

function getReturnValues(countDown: number) {
  // calculate time left
  const hours = Math.floor(countDown / (1000 * 60 * 60)) % 100;
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const hoursStr = addLeadingZeros(hours, 2);
  const minutesStr = addLeadingZeros(minutes, 2);
  const secondsStr = addLeadingZeros(seconds, 2);

  return [hoursStr, minutesStr, secondsStr];
}

function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, "0");
}
