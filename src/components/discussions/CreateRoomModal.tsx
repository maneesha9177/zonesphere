import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MessageSquare, Mic, Sparkles } from 'lucide-react';

export const CreateRoomModal: React.FC = () => {
  const { isCreateRoomModalOpen, setIsCreateRoomModalOpen, selectedZone, createDiscussionRoom } = useApp();

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState<any>('Part-Time & Shift Gigs');
  const [description, setDescription] = useState('');
  const [enableVoice, setEnableVoice] = useState(true);
  const [tagsInput, setTagsInput] = useState('Jobs, Shifts, LocalHelp');

  if (!isCreateRoomModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    createDiscussionRoom({
      title,
      topic,
      description: description || `Community space for discussing ${topic} in ${selectedZone.name}.`,
      enableVoice,
      tags: tags.length > 0 ? tags : ['Local', 'Discussion']
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCreateRoomModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          borderBottom: '1px solid #BFDBFE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#2563EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E3A8A' }}>
                Start Discussion Room
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#1D4ED8' }}>
                For {selectedZone.name} community members
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsCreateRoomModalOpen(false)}
            className="btn-outline btn-icon"
            style={{ border: 'none', background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          <div className="input-group">
            <label className="input-label">Room Title *</label>
            <input
              type="text"
              required
              className="input-control"
              placeholder="e.g. Weekend Shift Workers & Carpool"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Topic Category *</label>
            <select
              className="input-control input-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value as any)}
            >
              <option value="Part-Time & Shift Gigs">Part-Time & Shift Gigs</option>
              <option value="Jobs & Career Guidance">Jobs & Career Guidance</option>
              <option value="IT & Technology">IT & Technology</option>
              <option value="College Communities">College Communities</option>
              <option value="Local Business & Offers">Local Business & Offers</option>
              <option value="General Community Help">General Community Help</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Room Description</label>
            <textarea
              rows={3}
              className="input-control"
              placeholder="What should participants discuss here?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Tags (Comma separated)</label>
            <input
              type="text"
              className="input-control"
              placeholder="e.g. PartTime, CafeJobs, WeekendGigs"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={enableVoice}
                onChange={(e) => setEnableVoice(e.target.checked)}
                style={{ accentColor: '#0D9488', width: '16px', height: '16px' }}
              />
              <span>🎙️ Enable Real-Time Voice Lounge for this room</span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsCreateRoomModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ minWidth: '160px' }}
            >
              <span>Create Room</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
