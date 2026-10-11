import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { DiscussionRoom } from '../../types';
import { 
  MessageSquare, Mic, Users, Plus, Pin, 
  Sparkles, Volume2, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { RoomChatView } from './RoomChatView';
import { VoiceRoomModal } from './VoiceRoomModal';

export const DiscussionRoomsList: React.FC = () => {
  const { 
    rooms, 
    selectedZone, 
    activeRoomModal, 
    setActiveRoomModal, 
    setIsVoiceActiveModalOpen, 
    setIsCreateRoomModalOpen 
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [showAllRooms, setShowAllRooms] = useState<boolean>(false);

  const TOPICS = [
    'All',
    'Part-Time & Shift Gigs',
    'Jobs & Career Guidance',
    'IT & Technology',
    'College Communities',
    'Local Business & Offers',
    'General Community Help'
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesZone = showAllRooms || room.zoneId === selectedZone.id;
    const matchesTopic = selectedTopic === 'All' || room.topic === selectedTopic;
    return matchesZone && matchesTopic;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Community Discussion Rooms</h2>
              <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                {filteredRooms.length} Live Rooms
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Real-time text chat and voice lounges in <strong>{selectedZone.name}</strong>. Connect with locals, peers, and employers.
            </p>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsCreateRoomModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            <span>Create Room</span>
          </button>
        </div>

        {/* Topic Pills */}
        <div className="category-pills-wrap" style={{ marginBottom: 0 }}>
          {TOPICS.map(topic => (
            <button
              key={topic}
              className={`category-pill ${selectedTopic === topic ? 'active' : ''}`}
              style={selectedTopic === topic ? { background: 'var(--blue-gradient)' } : {}}
              onClick={() => setSelectedTopic(topic)}
            >
              <span>{topic}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Chat View or Rooms Grid */}
      {activeRoomModal ? (
        <RoomChatView room={activeRoomModal} onClose={() => setActiveRoomModal(null)} />
      ) : (
        <div className="grid-responsive-2">
          {filteredRooms.map(room => (
            <div
              key={room.id}
              className="card"
              onClick={() => setActiveRoomModal(room)}
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
                    {room.topic}
                  </span>
                  {room.isPinned && (
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                      <Pin size={10} />
                      Pinned
                    </span>
                  )}
                </div>

                {room.isVoiceActive && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#CCFBF1',
                    color: '#0D9488',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    <Mic size={13} />
                    <span>Voice On ({room.voiceParticipantsCount})</span>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {room.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px', flex: 1 }}>
                {room.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {room.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.72rem', color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Users size={15} color="#7C3AED" />
                  <span><strong>{room.activeParticipantsCount}</strong> participants</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {room.isVoiceActive && (
                    <button
                      className="btn btn-teal btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveRoomModal(room);
                        setIsVoiceActiveModalOpen(true);
                      }}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      <Volume2 size={13} />
                      <span>Join Call</span>
                    </button>
                  )}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveRoomModal(room)}
                  >
                    <span>Enter Chat</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Voice Modal Overlay */}
      <VoiceRoomModal />

    </div>
  );
};
