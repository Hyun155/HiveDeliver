import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  Avatar,
  Stack,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FaRobot } from 'react-icons/fa6';

const quickActionKeys = [
  'deliveryStatus',
  'createOrder',
  'droneAvailability',
  'costEstimation',
  'customerSupport',
  'reportIssue',
  'orderModification',
];

function getBotResponse(userMsg, t) {
  const msg = userMsg.toLowerCase();
  if (msg.includes('where is my parcel') || msg.includes('parcel status') || msg.includes('di mana') || msg.includes('bungkusan')) {
    return t('chatbot.responseParcelStatus');
  }
  if (msg.includes('send a parcel') || msg.includes('create delivery order') || msg.includes('hantar') || msg.includes('pesanan')) {
    return t('chatbot.responseCreateOrder');
  }
  if (msg.includes('drones available') || msg.includes('dron tersedia') || msg.includes('tersedia')) {
    return t('chatbot.responseDroneAvailable');
  }
  if (msg.includes('how much to deliver') || msg.includes('cost') || msg.includes('berapa') || msg.includes('kos')) {
    return t('chatbot.responseCost');
  }
  if (msg.includes('how does drone delivery work') || msg.includes('bagaimana') || msg.includes('kerja')) {
    return t('chatbot.responseHowItWorks');
  }
  if (msg.includes("hasn't arrived") || msg.includes('delayed') || msg.includes('belum sampai') || msg.includes('lewat')) {
    return t('chatbot.responseDelayed');
  }
  if (msg.includes('change the delivery address') || msg.includes('update address') || msg.includes('tukar alamat')) {
    return t('chatbot.responseAddressUpdated');
  }
  if (msg.includes('cancel order') || msg.includes('batal')) {
    return t('chatbot.responseCancelled');
  }
  return t('chatbot.responseDefault');
}

const Chatbot = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { sender: 'bot', text: null, useKey: 'chatbot.greeting' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (msg) => {
    const userMsg = msg !== undefined ? msg : input;
    if (!userMsg.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const response = getBotResponse(userMsg, t);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setLoading(false);
    }, 900);
  };

  const hasOnlyGreeting = messages.length === 1 && messages[0].useKey === 'chatbot.greeting';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        bgcolor: isDark ? 'rgba(12,26,36,0.5)' : 'rgba(240,246,248,0.3)',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: isDark ? 'rgba(20,184,166,0.05)' : 'rgba(15,118,110,0.03)',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: isDark ? 'rgba(20,184,166,0.2)' : 'rgba(15,118,110,0.15)',
            borderRadius: '4px',
            '&:hover': {
              bgcolor: isDark ? 'rgba(20,184,166,0.3)' : 'rgba(15,118,110,0.25)',
            },
          },
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'flex-end',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              animation: 'slideIn 0.3s ease-out',
              '@keyframes slideIn': {
                from: {
                  opacity: 0,
                  transform: msg.sender === 'user' ? 'translateX(20px)' : 'translateX(-20px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateX(0)',
                },
              },
            }}
          >
            {msg.sender === 'bot' && (
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                  flexShrink: 0,
                }}
              >
                <FaRobot size={16} color="#fff" />
              </Avatar>
            )}
            <Paper
              sx={{
                p: 1.5,
                px: 2,
                maxWidth: '70%',
                bgcolor: msg.sender === 'user'
                  ? 'primary.main'
                  : isDark ? 'rgba(20,184,166,0.08)' : 'rgba(240,246,248,0.8)',
                color: msg.sender === 'user' ? '#fff' : 'text.primary',
                borderRadius: msg.sender === 'user'
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                boxShadow: msg.sender === 'user'
                  ? '0 4px 12px rgba(15,118,110,0.25)'
                  : '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  wordBreak: 'break-word',
                }}
              >
                {msg.useKey ? t(msg.useKey) : msg.text}
              </Typography>
            </Paper>
            {msg.sender === 'user' && (
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700 }}>U</Typography>
              </Avatar>
            )}
          </Box>
        ))}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                flexShrink: 0,
              }}
            >
              <FaRobot size={16} color="#fff" />
            </Avatar>
            <Paper
              sx={{
                p: 2,
                bgcolor: isDark ? 'rgba(20,184,166,0.08)' : 'rgba(240,246,248,0.8)',
                borderRadius: '18px 18px 18px 4px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <CircularProgress size={20} sx={{ color: 'primary.main' }} />
              <Typography variant="caption" color="text.secondary">
                {t('chatbot.typing')}
              </Typography>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Quick Actions - Only show on first message */}
      {hasOnlyGreeting && !loading && (
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: `1px solid ${isDark ? 'rgba(20,184,166,0.1)' : 'rgba(15,118,110,0.06)'}`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {quickActionKeys.map((key, idx) => (
            <Tooltip key={idx} title={t(`chatbot.action_${key}`)} arrow>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSend(t(`chatbot.action_${key}_value`))}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: isDark ? 'rgba(20,184,166,0.2)' : 'rgba(15,118,110,0.15)',
                  color: isDark ? 'rgba(20,184,166,0.8)' : '#0f766e',
                  bgcolor: isDark ? 'rgba(20,184,166,0.05)' : 'rgba(20,184,166,0.05)',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(20,184,166,0.12)' : 'rgba(20,184,166,0.08)',
                    borderColor: isDark ? 'rgba(20,184,166,0.3)' : 'rgba(15,118,110,0.25)',
                  },
                }}
              >
                {t(`chatbot.action_${key}`)}
              </Button>
            </Tooltip>
          ))}
        </Box>
      )}

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${isDark ? 'rgba(20,184,166,0.08)' : 'rgba(15,118,110,0.06)'}`,
          bgcolor: isDark ? 'rgba(6,14,20,0.3)' : 'rgba(255,255,255,0.3)',
          display: 'flex',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }}}
          placeholder={t('chatbot.placeholder')}
          disabled={loading}
          multiline
          maxRows={3}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: isDark ? 'rgba(15,32,44,0.8)' : 'rgba(255,255,255,0.8)',
              border: `1px solid ${isDark ? 'rgba(20,184,166,0.12)' : 'rgba(15,118,110,0.12)'}`,
              '&:hover': {
                borderColor: isDark ? 'rgba(20,184,166,0.2)' : 'rgba(15,118,110,0.2)',
              },
              '&.Mui-focused': {
                borderColor: 'primary.main',
                boxShadow: `0 0 0 3px ${isDark ? 'rgba(20,184,166,0.1)' : 'rgba(20,184,166,0.08)'}`,
              },
            },
            '& .MuiOutlinedInput-input': {
              fontSize: '0.95rem',
              '&::placeholder': {
                opacity: 0.6,
              },
            },
          }}
        />
        <Tooltip title={loading ? t('chatbot.typing') : t('chatbot.send')} arrow>
          <IconButton
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            sx={{
              background: loading || !input.trim()
                ? isDark ? 'rgba(20,184,166,0.08)' : 'rgba(15,118,110,0.08)'
                : 'linear-gradient(135deg, #0f766e, #14b8a6)',
              color: loading || !input.trim()
                ? isDark ? 'rgba(20,184,166,0.4)' : 'rgba(15,118,110,0.4)'
                : '#fff',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover:not(:disabled)': {
                background: 'linear-gradient(135deg, #115e59, #0f766e)',
                boxShadow: '0 4px 12px rgba(15,118,110,0.3)',
              },
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Chatbot;
