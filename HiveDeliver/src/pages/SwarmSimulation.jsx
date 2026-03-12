import { useState } from "react";
import { Box, Typography } from "@mui/material";

import DroneSwarm from "../components/DroneSwarm";
import ControlsPanel from "../components/ControlsPanel";
import CoverageHeatmap from "../components/CoverageHeatmap";
import RuralMap from "../components/RuralMap";

export default function SwarmSimulationPage() {
  const [running, setRunning] = useState(false);
  const [droneCount, setDroneCount] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [heatmap, setHeatmap] = useState(false);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Drone Swarm Simulation
      </Typography>

      {heatmap ? (
        <CoverageHeatmap />
      ) : (
        <DroneSwarm drones={droneCount} speed={speed} running={running} />
      )}

      <RuralMap />

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
    </Box>
  );
}
