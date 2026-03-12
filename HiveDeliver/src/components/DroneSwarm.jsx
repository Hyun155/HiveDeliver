import { useEffect, useState } from "react";

export default function DroneSwarm({ drones = 10, speed = 1, running }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(
      Array.from({ length: drones }, () => ({
        x: Math.random() * 90,
        y: Math.random() * 90,
      }))
    );
  }, [drones]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setPositions((p) =>
        p.map((d) => ({
          x: Math.max(0, Math.min(95, d.x + (Math.random() - 0.5) * 4 * speed)),
          y: Math.max(0, Math.min(95, d.y + (Math.random() - 0.5) * 4 * speed)),
        }))
      );
    }, 500);

    return () => clearInterval(interval);
  }, [running, speed]);

  return (
    <div className="relative h-[400px] bg-gray-900 rounded-lg overflow-hidden">
      {positions.map((drone, i) => (
        <div
          key={i}
          className="absolute text-xl"
          style={{
            left: `${drone.x}%`,
            top: `${drone.y}%`,
          }}
        >
          🚁
        </div>
      ))}
    </div>
  );
}
