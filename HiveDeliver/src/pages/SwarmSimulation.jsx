import { useState } from "react";
import DroneSwarm from "../components/DroneSwarm";
import ControlsPanel from "../components/ControlsPanel";
import CoverageHeatmap from "../components/CoverageHeatmap";
import RuralMap from "../components/RuralMap";

export default function SwarmSimulation() {
  const [running, setRunning] = useState(false);
  const [droneCount, setDroneCount] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [heatmap, setHeatmap] = useState(false);

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="col-span-2">
        {heatmap ? (
          <CoverageHeatmap drones={droneCount} />
        ) : (
          <DroneSwarm drones={droneCount} speed={speed} running={running} />
        )}

        <RuralMap />
      </div>

      <ControlsPanel
        running={running}
        setRunning={setRunning}
        droneCount={droneCount}
        setDroneCount={setDroneCount}
        speed={speed}
        setSpeed={setSpeed}
        heatmap={heatmap}
        setHeatmap={setHeatmap}
      />
    </div>
  );
}
