import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip,
  LinearProgress,
} from '@mui/material'
import {
  FaClockRotateLeft,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation,
  FaChartBar,
} from 'react-icons/fa6'
import { MdHistory } from 'react-icons/md'
import PageHeader from '../components/PageHeader.jsx'
import { deliveryHistoryRecords } from '../data/clientFeaturesData.js'

const statusConfig = {
  Delivered: {
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.14)',
    border: 'rgba(34,197,94,0.4)',
    icon: <FaCircleCheck size={13} />,
  },
  Cancelled: {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.14)',
    border: 'rgba(239,68,68,0.4)',
    icon: <FaCircleXmark size={13} />,
  },
  Failed: {
    color: '#f97316',
    bg: 'rgba(249,115,22,0.14)',
    border: 'rgba(249,115,22,0.4)',
    icon: <FaTriangleExclamation size={13} />,
  },
}

// All records combined for manager view
const allRecords = deliveryHistoryRecords

function SummaryCard({ label, count, color, icon, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <Card sx={{ borderRadius: 3, flex: 1, minWidth: 120 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Box sx={{ color }}>{icon}</Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
          </Typography>
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: 800, color }}>
          {count}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{
            mt: 1,
            height: 5,
            borderRadius: 3,
            bgcolor: 'rgba(0,0,0,0.06)',
            '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 },
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.4, display: 'block' }}>
          {pct}% of total
        </Typography>
      </CardContent>
    </Card>
  )
}

function ManagerDeliveryHistory() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [date, setDate] = useState('')
  const [accountType, setAccountType] = useState('all')

  const filteredRows = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    return allRecords.filter((row) => {
      const matchesSearch = !normalized
        || row.id.toLowerCase().includes(normalized)
        || row.address.toLowerCase().includes(normalized)
        || row.drone.toLowerCase().includes(normalized)
        || (row.recipient && row.recipient.toLowerCase().includes(normalized))
      const matchesStatus = status === 'all' || row.status === status
      const matchesDate = !date || row.date === date
      const matchesAccount = accountType === 'all'
        || (accountType === 'sme' && row.userRole === 'user')
        || (accountType === 'manager' && row.userId === 'manager-1')
      return matchesSearch && matchesStatus && matchesDate && matchesAccount
    })
  }, [search, status, date, accountType])

  const total = allRecords.length
  const deliveredCount = allRecords.filter(r => r.status === 'Delivered').length
  const cancelledCount = allRecords.filter(r => r.status === 'Cancelled').length
  const failedCount = allRecords.filter(r => r.status === 'Failed').length
  const smeCount = allRecords.filter(r => r.userRole === 'user').length
  const managerCount = allRecords.filter(r => r.userId === 'manager-1').length

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title="Delivery History — Manager View"
          subtitle="Full overview of all SME and manager delivery records across the platform."
        />
      </Box>

      {/* Summary Cards */}
      <Box className="reveal-up delay-1">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <SummaryCard label="Delivered" count={deliveredCount} color="#22c55e" icon={<FaCircleCheck size={16} />} total={total} />
          <SummaryCard label="Cancelled" count={cancelledCount} color="#ef4444" icon={<FaCircleXmark size={16} />} total={total} />
          <SummaryCard label="Failed" count={failedCount} color="#f97316" icon={<FaTriangleExclamation size={16} />} total={total} />
        </Stack>
      </Box>

      {/* Account Breakdown */}
      <Box className="reveal-up delay-1">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Card sx={{ borderRadius: 3, flex: 1 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <FaChartBar color="#6366f1" />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  SME User Records
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#6366f1' }}>{smeCount}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3, flex: 1 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <MdHistory color="#14b8a6" size={16} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Manager Records
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#14b8a6' }}>{managerCount}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3, flex: 1 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <FaClockRotateLeft color="#f59e0b" />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Records
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#f59e0b' }}>{total}</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Table */}
      <Box className="reveal-up delay-1">
        <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2.2, md: 2.8 } }}>
            {/* Filters */}
            <Grid container spacing={1.5} sx={{ mb: 2.2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth size="small"
                  label="Search deliveries"
                  placeholder="Search by parcel ID, address, drone or recipient"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2.5}>
                <TextField
                  fullWidth select size="small"
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="all">All statuses</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={2.5}>
                <TextField
                  fullWidth select size="small"
                  label="Account Type"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <MenuItem value="all">All accounts</MenuItem>
                  <MenuItem value="sme">SME Users</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth size="small"
                  label="Delivery date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mb: 1.5 }}>
              <FaClockRotateLeft color="#14b8a6" />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {filteredRows.length} matching deliveries
              </Typography>
            </Stack>

            <TableContainer>
              <Table size="small" sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Parcel ID</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Account</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Recipient</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Destination Address</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Drone</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Weight</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => {
                    const cfg = statusConfig[row.status]
                    const isSME = row.userRole === 'user'
                    return (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: 700, color: '#14b8a6' }}>{row.id}</TableCell>
                        <TableCell>
                          <Chip
                            label={isSME ? 'SME User' : 'Manager'}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              bgcolor: isSME ? 'rgba(99,102,241,0.12)' : 'rgba(20,184,166,0.12)',
                              color: isSME ? '#6366f1' : '#14b8a6',
                              border: `1px solid ${isSME ? 'rgba(99,102,241,0.3)' : 'rgba(20,184,166,0.3)'}`,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.recipient || '—'}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.drone}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.72rem',
                              bgcolor: 'rgba(20,184,166,0.12)',
                              color: '#14b8a6',
                              border: '1px solid rgba(20,184,166,0.3)',
                            }}
                          />
                        </TableCell>
                        <TableCell>{row.weight || '—'}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Chip
                            icon={<Box sx={{ color: cfg.color, display: 'flex', alignItems: 'center', pl: 0.5 }}>{cfg.icon}</Box>}
                            label={row.status}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              color: cfg.color,
                              backgroundColor: cfg.bg,
                              border: `1px solid ${cfg.border}`,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title={row.note || ''} arrow>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                maxWidth: 140,
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                cursor: 'default',
                              }}
                            >
                              {row.note || '—'}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}

                  {filteredRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary" variant="body2">
                          No matching deliveries found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default ManagerDeliveryHistory
