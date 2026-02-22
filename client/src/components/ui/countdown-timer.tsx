import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-03-10T16:30:00Z"); // 13:30 Brasília = 16:30 UTC

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center mb-8">
        <p className="text-[#C9A84C] font-bold text-lg">🎉 Evento em andamento!</p>
      </div>
    );
  }

  const blocks = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <div className="flex justify-center gap-3 mb-8">
      {blocks.map((b) => (
        <div
          key={b.label}
          className="bg-white/5 border border-[#C9A84C]/20 rounded-lg px-4 py-3 min-w-[70px] text-center"
        >
          <span className="block text-2xl md:text-3xl font-bold text-[#C9A84C]">
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="block text-[10px] uppercase tracking-wider text-white/50 mt-1">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
