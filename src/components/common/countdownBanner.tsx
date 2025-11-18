"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="min-w-[60px] rounded-lg bg-white/20 p-2 backdrop-blur-sm sm:min-w-[80px] sm:rounded-xl sm:p-4">
        <div className="text-2xl font-bold tabular-nums sm:text-4xl">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="mt-2 text-xs text-purple-200 sm:text-sm">{label}</div>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 text-white sm:rounded-3xl sm:p-8 lg:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

      <div className="relative space-y-4 text-center sm:space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm sm:text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
          Oferta Relâmpago
        </div>

        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Aproveite antes que acabe!
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-purple-100 sm:text-base lg:text-lg">
          Descontos de até 70% em produtos selecionados
        </p>

        <div className="flex justify-center gap-2 pt-4 sm:gap-4">
          <TimeBox value={timeLeft.hours} label="Horas" />
          <div className="self-start pt-2 text-3xl font-bold sm:text-5xl">
            :
          </div>
          <TimeBox value={timeLeft.minutes} label="Minutos" />
          <div className="self-start pt-2 text-3xl font-bold sm:text-5xl">
            :
          </div>
          <TimeBox value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
