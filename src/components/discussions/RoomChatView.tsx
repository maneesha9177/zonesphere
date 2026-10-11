import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import type { DiscussionRoom } from '../../types';
import { 
  ArrowLeft, Send, Mic, AlertTriangle 
} from 'lucide-react';

interface RoomChatViewProps {
  room: DiscussionRoom;
  onClose: () => void;
}

export const RoomChatView: React.FC<RoomChatViewProps> = ({ room, onClose }) => {
  const { 
    messages, 
    sendChatMessage, 
    setIsVoiceActiveModalOpen, 
    setReportTarget 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roomMessages = messages[room.id] || [
    {
      id: `msg-initial`,
      roomId: room.id,
      senderName: 'Zone Guide',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      senderRole: 'Moderator',
      text: `Welcome to "${room.title}". Feel free to share queries, shift updates, or collaborate!`,
      timestamp: 'Today',
      isSelf: false
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(room.id, inputVal);
    setInputVal('');
  };

  return (
    <div className="chat-container">
      
      {/* Chat Header */}
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn-outline btn-icon"
            onClick={onClose}
            style={{ border: 'none', background: '#FFFFFF' }}
            title="Back to all rooms"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                {room.title}
              </h3>
              <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                {room.topic}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {room.zoneName} • {room.activeParticipantsCount} online now
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {room.isVoiceActive && (
            <button
              className="btn btn-teal btn-sm"
              onClick={() => setIsVoiceActiveModalOpen(true)}
              style={{ gap: '6px' }}
            >
              <Mic size={14} />
              <span>Voice Lounge ({room.voiceParticipantsCount})</span>
            </button>
          )}

          <button
            className="btn-outline btn-icon"
            onClick={() => setReportTarget({ type: 'room', id: room.id, title: room.title })}
            title="Report this room to moderators"
            style={{ border: 'none', color: '#94A3B8' }}
          >
            <AlertTriangle size={16} />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="chat-messages-area">
        {roomMessages.map((msg) => {
          return (
            <div 
              key={msg.id} 
              className={`chat-bubble-wrap ${msg.isSelf ? 'self' : ''}`}
            >
              <img
                src={msg.senderAvatar}
                alt={msg.senderName}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  marginBottom: '2px',
                  justifyContent: msg.isSelf ? 'flex-end' : 'flex-start'
                }}>
                  <strong style={{ color: msg.isSelf ? '#7C3AED' : '#1E293B' }}>
                    {msg.senderName}
                  </strong>
                  {msg.senderRole && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: msg.senderRole === 'Verified Employer' ? '#D1FAE5' : msg.senderRole === 'Moderator' ? '#F3E8FF' : '#E2E8F0',
                      color: msg.senderRole === 'Verified Employer' ? '#047857' : msg.senderRole === 'Moderator' ? '#6B21A8' : '#475569'
                    }}>
                      {msg.senderRole}
                    </span>
                  )}
                  <span style={{ color: '#94A3B8' }}>{msg.timestamp}</span>
                </div>

                <div className="chat-bubble">
                  {msg.text}
                </div>

                {/* Emoji Reactions if present */}
                {msg.reactions && (
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <span key={emoji} style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: 'var(--radius-full)',
                        padding: '1px 6px',
                        fontSize: '0.72rem',
                        fontWeight: 600
                      }}>
                        {emoji} {count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="chat-input-row">
        <input
          type="text"
          className="input-control"
          placeholder={`Message in #${room.title}...`}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          style={{ borderRadius: 'var(--radius-full)' }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-icon"
          style={{ borderRadius: '50%', width: '42px', height: '42px', flexShrink: 0 }}
          title="Send message"
        >
          <Send size={16} />
        </button>
      </form>

    </div>
  );
};
