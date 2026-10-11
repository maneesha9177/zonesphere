import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Mic, MicOff, Volume2, VolumeX, PhoneOff, 
  Users, Radio, Sparkles, ShieldCheck 
} from 'lucide-react';

export const VoiceRoomModal: React.FC = () => {
  const { isVoiceActiveModalOpen, setIsVoiceActiveModalOpen, activeRoomModal, showToast } = useApp();

  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState<number>(0);

  if (!isVoiceActiveModalOpen || !activeRoomModal) return null;

  const PARTICIPANTS = [
    { name: 'You (Speaker)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', speaking: !isMuted },
    { name: 'Karthik Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', speaking: true },
    { name: 'Priya Union', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80', speaking: false },
    { name: 'Ravi Moderator', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80', speaking: false }
  ];

  const handleLeaveVoice = () => {
    setIsVoiceActiveModalOpen(false);
    showToast('📞 Left the voice room lounge.', 'info');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showToast(!isMuted ? '🎙️ Microphone muted' : '🎙️ Microphone active', 'info');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsVoiceActiveModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', background: '#0F172A', border: '1px solid #334155' }}>
        
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Radio size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2DD4BF', textTransform: 'uppercase' }}>
                  Live Voice Lounge
                </span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }}></span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                {activeRoomModal.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsVoiceActiveModalOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Voice Lounge Room Body */}
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          
          {/* Audio Visualizer Waves */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>WebRTC Audio Stream:</span>
            <div className="audio-bars">
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
            </div>
          </div>

          {/* Participants Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '18px',
            maxWidth: '380px',
            margin: '0 auto 28px'
          }}>
            {PARTICIPANTS.map((user, idx) => (
              <div
                key={user.name}
                style={{
                  background: '#1E293B',
                  border: user.speaking ? '2px solid #14B8A6' : '1px solid #334155',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: user.speaking ? '0 0 20px rgba(20, 184, 166, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: user.speaking ? '3px solid #2DD4BF' : '2px solid #475569'
                    }}
                  />
                  {user.speaking && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: '#14B8A6',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <Mic size={11} />
                    </div>
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: user.speaking ? '#2DD4BF' : '#64748B', fontWeight: 600 }}>
                  {user.speaking ? 'Speaking...' : 'Listening'}
                </div>
              </div>
            ))}
          </div>

          {/* Voice Controls Deck */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            background: '#1E293B',
            borderRadius: 'var(--radius-full)',
            padding: '10px 24px',
            width: 'fit-content',
            margin: '0 auto'
          }}>
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: 'none',
                background: isMuted ? '#EF4444' : '#334155',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* Deafen Button */}
            <button
              onClick={() => setIsDeafened(!isDeafened)}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: 'none',
                background: isDeafened ? '#F59E0B' : '#334155',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isDeafened ? 'Undeafen audio' : 'Deafen audio'}
            >
              {isDeafened ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Leave Call Button */}
            <button
              onClick={handleLeaveVoice}
              style={{
                padding: '0 20px',
                height: '46px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: '#E11D48',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              <PhoneOff size={18} />
              <span>Leave Room</span>
            </button>
          </div>

          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '16px' }}>
            Low latency end-to-end encrypted audio room demo.
          </div>

        </div>

      </div>
    </div>
  );
};
