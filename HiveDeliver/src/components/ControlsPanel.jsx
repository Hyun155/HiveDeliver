export default function ControlsPanel({
  running,
  setRunning,
  droneCount,
  setDroneCount,
  speed,
  setSpeed,
  heatmap,
  setHeatmap,
}) {
  return (
    <div className="bg-white shadow p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Simulation Controls</h2>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setRunning(!running)}
      >
        {running ? "Pause" : "Start"}
      </button>

      <div>
        <label>Number of Drones</label>
        <input
          type="range"
          min="5"
          max="50"
          value={droneCount}
          onChange={(e) => setDroneCount(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Drone Speed</label>
        <input
          type="range"
          min="1"
          max="5"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setHeatmap(!heatmap)}
      >
        Toggle Heatmap
      </button>
    </div>
  );
}
