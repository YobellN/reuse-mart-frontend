"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date | number; // Can accept Date object or unix timestamp in seconds
  onTimeUp?: () => void; // Add callback prop
}

export default function Countdown({ targetDate, onTimeUp }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // Convert target date to timestamp in milliseconds
    const targetTime =
      targetDate instanceof Date
        ? targetDate.getTime()
        : targetDate * 1000;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      // If time's up, return 0
      if (difference <= 0) {
        return 0;
      }

      return Math.floor(difference / 1000); // Convert to seconds
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // Clear interval when time's up
      if (remaining <= 0) {
        clearInterval(timer);
        onTimeUp?.(); // Call callback when time is up
      }
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate, onTimeUp]);

  // Format time
  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
      {formatTime(timeLeft)}
    </div>
  );
}