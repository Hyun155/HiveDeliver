import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { FaLocationDot, FaMountainSun, FaWarehouse } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import PageHeader from '../components/PageHeader.jsx'
import EnhancedDroneMap from '../components/EnhancedDroneMap.jsx'
import SimulationControls from '../components/SimulationControls.jsx'

function LiveMapPage() {
  const { t } = useTranslation()
  const [isRunning, setIsRunning] = useState(true)
  const [droneCount, setDroneCount] = useState(8)
  const [speed, setSpeed] = useState(1)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [priorityMode, setPriorityMode] = useState(false)
  const [showNoFlyZones, setShowNoFlyZones] = useState(true)

  const handleReset = () => {
    setIsRunning(false)
    if (window.__droneMapReset) {
      window.__droneMapReset()
    }
    setTimeout(() => setIsRunning(true), 100)
  }

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('map.title')}
          subtitle={t('map.subtitle')}
        />
      </Box>

      <Grid container spacing={1.5}>
        {/* Main Map Area */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box className="reveal-up delay-1">
            <EnhancedDroneMap
              droneCount={droneCount}
              speed={speed}
              isRunning={isRunning}
              showHeatmap={showHeatmap}
              priorityMode={priorityMode}
              showNoFlyZones={showNoFlyZones}
            />
          </Box>
        </Grid>

        {/* Controls & Legend Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={1.5}>
            {/* Simulation Controls */}
            <Box className="reveal-up delay-2">
              <SimulationControls
                isRunning={isRunning}
                onToggleRunning={() => setIsRunning((prev) => !prev)}
                onReset={handleReset}
                droneCount={droneCount}
                onDroneCountChange={setDroneCount}
                speed={speed}
                onSpeedChange={setSpeed}
                showHeatmap={showHeatmap}
                onToggleHeatmap={() => setShowHeatmap((prev) => !prev)}
                priorityMode={priorityMode}
                onTogglePriority={() => setPriorityMode((prev) => !prev)}
                showNoFlyZones={showNoFlyZones}
                onToggleNoFlyZones={() => setShowNoFlyZones((prev) => !prev)}
              />
            </Box>

            {/* Map Legend */}
            <Box className="reveal-up delay-3">
              <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {t('map.mapLegend')}
                  </Typography>
                  <Stack spacing={1}>
                    <div className="legend-row">
                      <span className="legend-icon legend-warehouse"><FaWarehouse /></span>
                      <Typography variant="body2" color="text.primary">{t('map.warehouseHub')}</Typography>
                    </div>
                    <div className="legend-row">
                      <span className="legend-icon legend-drone"><GiDeliveryDrone /></span>
                      <Typography variant="body2" color="text.primary">{t('map.activeDrone')}</Typography>
                    </div>
                    <div className="legend-row">
                      <span className="legend-icon legend-point"><FaLocationDot /></span>
                      <Typography variant="body2" color="text.primary">{t('map.urbanDest')}</Typography>
                    </div>
                    <div className="legend-row">
                      <span className="legend-icon legend-rural"><FaMountainSun /></span>
                      <Typography variant="body2" color="text.primary">{t('map.ruralDest')}</Typography>
                    </div>
                    <div className="legend-row">
                      <span className="legend-icon legend-critical"><MdPriorityHigh /></span>
                      <Typography variant="body2" color="text.primary">{t('map.criticalDel')}</Typography>
                    </div>
                    <div className="legend-row">
                      <span className="legend-icon legend-nofly"><MdBlock /></span>
                      <Typography variant="body2" color="text.primary">{t('map.noFlyZone')}</Typography>
                    </div>
                  </Stack>

                  {showHeatmap && (
                    <Stack sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {t('map.heatmapLegend')}
                      </Typography>
                      <div className="heatmap-gradient-bar" />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">{t('map.lowCoverage')}</Typography>
                        <Typography variant="caption" color="text.secondary">{t('map.highCoverage')}</Typography>
                      </Stack>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Box>

            {/* Priority Info */}
            <Box className="reveal-up delay-4">
              <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
                    {t('map.priorityLevels')}
                  </Typography>
                  <Stack spacing={0.8}>
                    {[
                      { label: t('map.critical'), color: '#ef4444', desc: t('map.medicalSupplies') },
                      { label: t('map.high'), color: '#f97316', desc: t('map.remoteDeliveries') },
                      { label: t('map.medium'), color: '#eab308', desc: t('map.standardSME') },
                      { label: t('map.low'), color: '#22c55e', desc: t('map.nonUrgent') },
                    ].map((p) => (
                      <Stack key={p.label} direction="row" alignItems="center" spacing={1}>
                        <Chip
                          label={p.label}
                          size="small"
                          sx={{
                            bgcolor: p.color,
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '0.62rem',
                            letterSpacing: '0.05em',
                            minWidth: 70,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.82rem' }}>
                          {p.desc}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            {/* Coordination Snapshot */}
            <Box className="reveal-up delay-5">
              <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    {t('map.coordSnapshot')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.7 }}>
                    {t('map.coordDesc1')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {t('map.coordDesc2')}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default LiveMapPage
