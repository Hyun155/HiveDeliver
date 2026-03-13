import { useTranslation } from 'react-i18next'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material'
import DeliveryStatusChip from './DeliveryStatusChip.jsx'

function DeliveryTable({ rows }) {
  const { t } = useTranslation()

  return (
    <TableContainer
      component={Paper}
      className="hover-lift"
      sx={{ borderRadius: 3, overflow: 'hidden' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('dashboard.parcelId')}</TableCell>
            <TableCell>{t('dashboard.destination')}</TableCell>
            <TableCell>{t('dashboard.assignedDrone')}</TableCell>
            <TableCell align="right">{t('dashboard.status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.parcelId}
              hover
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(20,184,166,0.03)' },
              }}
            >
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'primary.main', fontSize: '0.82rem' }}
                >
                  {row.parcelId}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {row.destination}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.2,
                    py: 0.3,
                    borderRadius: 2,
                    bgcolor: 'rgba(14,165,233,0.06)',
                    border: '1px solid rgba(14,165,233,0.1)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                    {row.assignedDrone}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <DeliveryStatusChip status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DeliveryTable
