import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import './Chatbot.css';

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

  const [messages, setMessages] = useState([
    { sender: 'bot', text: null, useKey: 'chatbot.greeting' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={`chatbot-container ${isDark ? 'dark' : 'light'}`}>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message chatbot-${msg.sender}`}>
            {msg.useKey ? t(msg.useKey) : msg.text}
          </div>
        ))}
        {loading && <div className="chatbot-message chatbot-bot">{t('chatbot.typing')}</div>}
      </div>
      <div className="chatbot-actions">
        {quickActionKeys.map((key, idx) => (
          <button
            key={idx}
            className="chatbot-action-btn"
            onClick={() => handleSend(t(`chatbot.action_${key}_value`))}
          >
            {t(`chatbot.action_${key}`)}
          </button>
        ))}
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('chatbot.placeholder')}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button onClick={() => handleSend()}>{t('chatbot.send')}</button>
      </div>
    </div>
  );
};

export default Chatbot;
