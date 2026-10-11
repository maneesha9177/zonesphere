import React, { useRef, useState } from 'react';
import { 
  Download, Sparkles, ShieldCheck, MapPin, 
  QrCode, Palette 
} from 'lucide-react';
import type { JobListing } from '../../types';

interface JobPosterGeneratorProps {
  jobData: Partial<JobListing>;
  onThemeChange?: (theme: string) => void;
  onCustomBadgeChange?: (badge: string) => void;
  readOnly?: boolean;
}

export const JobPosterGenerator: React.FC<JobPosterGeneratorProps> = ({
  jobData,
  onThemeChange,
  onCustomBadgeChange,
  readOnly = false
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>(jobData.posterTheme || 'purple');
  const [customBadge, setCustomBadge] = useState<string>(jobData.posterCustomBadge || '⚡ IMMEDIATE HIRING');

  const posterRef = useRef<HTMLDivElement>(null);

  const THEMES = [
    { id: 'purple', name: 'Electric Purple', bg: 'linear-gradient(145deg, #2E1065 0%, #581C87 45%, #7C3AED 100%)', border: '#C084FC', text: '#FAF5FF', accent: '#F59E0B' },
    { id: 'teal', name: 'Ocean Teal', bg: 'linear-gradient(145deg, #042F2E 0%, #115E59 45%, #0D9488 100%)', border: '#5EEAD4', text: '#F0FDFA', accent: '#38BDF8' },
    { id: 'amber', name: 'Sunset Amber', bg: 'linear-gradient(145deg, #451A03 0%, #7C2D12 45%, #EA580C 100%)', border: '#FDBA74', text: '#FFFBEB', accent: '#FDE047' },
    { id: 'dark', name: 'Midnight Modern', bg: 'linear-gradient(145deg, #020617 0%, #0F172A 50%, #1E293B 100%)', border: '#64748B', text: '#F8FAFC', accent: '#A855F7' }
  ];

  const currentTheme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    if (onThemeChange) onThemeChange(themeId);
  };

  const handleBadgeSelect = (badge: string) => {
    setCustomBadge(badge);
    if (onCustomBadgeChange) onCustomBadgeChange(badge);
  };

  // Canvas-based download generator
  const downloadPosterImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw Gradient Background
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    if (selectedTheme === 'teal') {
      gradient.addColorStop(0, '#042F2E');
      gradient.addColorStop(0.5, '#115E59');
      gradient.addColorStop(1, '#0D9488');
    } else if (selectedTheme === 'amber') {
      gradient.addColorStop(0, '#451A03');
      gradient.addColorStop(0.5, '#7C2D12');
      gradient.addColorStop(1, '#EA580C');
    } else if (selectedTheme === 'dark') {
      gradient.addColorStop(0, '#020617');
      gradient.addColorStop(0.5, '#0F172A');
      gradient.addColorStop(1, '#1E293B');
    } else {
      gradient.addColorStop(0, '#2E1065');
      gradient.addColorStop(0.5, '#581C87');
      gradient.addColorStop(1, '#7C3AED');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // Decorative Circle Orbs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(950, 150, 300, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 1200, 250, 0, Math.PI * 2);
    ctx.fill();

    // Top Header Banner
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ZONE SPHERE • VERIFIED OPPORTUNITY', 80, 100);

    // Custom Badge
    ctx.fillStyle = currentTheme.accent;
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(customBadge, 80, 170);

    // Employer Name
    ctx.fillStyle = '#E9D5FF';
    ctx.font = 'bold 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(jobData.businessName || 'Verified Employer Enterprise', 80, 240);

    // Role Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 64px "Outfit", sans-serif';
    const roleTitle = jobData.title || 'Senior Open Vacancy';
    ctx.fillText(roleTitle, 80, 340);

    // Locality & Category
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`📍 ${jobData.locality || 'Metro Central'} • ${jobData.category || 'Retail & Non-IT'}`, 80, 410);

    // Salary Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.roundRect(80, 480, 920, 180, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('OFFERED PAY RATE', 120, 540);

    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 68px "Outfit", sans-serif';
    const payText = `${jobData.payCurrency || '₹'}${jobData.payAmount?.toLocaleString() || '20,000'} / ${jobData.payPeriod?.toLowerCase() || 'month'}`;
    ctx.fillText(payText, 120, 620);

    // Vacancies & Shift
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`⏰ ${jobData.shiftTiming || 'Day Shift 9 AM - 6 PM'}`, 80, 740);
    ctx.fillText(`👥 ${jobData.vacancies || 1} Vacancies Available • ${jobData.employmentType || 'Full-Time'}`, 80, 800);
    ctx.fillText(`🎓 ${jobData.requiredEducation || '10th / 12th Pass'} • ${jobData.experienceRequired || 'Freshers Welcome'}`, 80, 860);

    // Requirements & Skills
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '30px "Plus Jakarta Sans", sans-serif';
    const skillsText = (jobData.requiredSkills || ['Customer Support', 'Punctuality']).join(' • ');
    ctx.fillText(`Skills: ${skillsText}`, 80, 940);

    // Footer with QR Code Placeholder & Tagline
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.roundRect(80, 1030, 920, 220, 24);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('APPLY INSTANTLY ON ZONE SPHERE APP', 120, 1110);
    ctx.font = '28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText('Scan QR or search vacancy ID on Zone Sphere web platform', 120, 1170);

    // Trigger download
    const link = document.createElement('a');
    link.download = `ZoneSphere_Poster_${(jobData.title || 'Job').replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Controls Bar (if not readonly) */}
      {!readOnly && (
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Theme Palette */}
          <div>
            <label className="input-label" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Palette size={15} color="#7C3AED" />
              <span>Choose Poster Color Palette:</span>
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeSelect(theme.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: selectedTheme === theme.id ? `2px solid ${theme.border}` : '1px solid var(--border-subtle)',
                    background: theme.bg,
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    boxShadow: selectedTheme === theme.id ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Highlight Badges */}
          <div>
            <label className="input-label" style={{ fontSize: '0.8rem' }}>
              Select Visual Highlight Tag:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                '⚡ IMMEDIATE HIRING',
                '🎓 FRESHERS WELCOME',
                '💵 DAILY WAGE CASHOUT',
                '🌙 NIGHT ALLOWANCE + CAB',
                '⭐ WEEKEND SHIFT ONLY'
              ].map(badge => (
                <button
                  key={badge}
                  type="button"
                  onClick={() => handleBadgeSelect(badge)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-md)',
                    border: customBadge === badge ? '1.5px solid #7C3AED' : '1px solid var(--border-subtle)',
                    background: customBadge === badge ? '#EDE9FE' : '#F8FAFC',
                    color: customBadge === badge ? '#6B21A8' : '#475569',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Live Visual Poster Preview */}
      <div 
        ref={posterRef}
        className="poster-preview-card"
        style={{
          background: currentTheme.bg,
          border: `2px solid ${currentTheme.border}`
        }}
      >
        {/* Top Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.05em' }}>
              <Sparkles size={16} color={currentTheme.accent} />
              <span>ZONE SPHERE OFFICIAL POSTER</span>
            </div>
            {jobData.businessVerified && (
              <span className="badge badge-verified" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                <ShieldCheck size={12} />
                Verified Business
              </span>
            )}
          </div>

          <div style={{
            display: 'inline-block',
            background: currentTheme.accent,
            color: '#000000',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            marginBottom: '10px'
          }}>
            {customBadge}
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E9D5FF' }}>
            {jobData.businessName || 'Grand Horizon Enterprises'}
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, margin: '6px 0 10px' }}>
            {jobData.title || 'Senior Store Cashier & Billing Assistant'}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#DDD6FE' }}>
            <MapPin size={14} color="#5EEAD4" />
            <span>{jobData.locality || 'Metro Central Hub'} • {jobData.category || 'Retail & Shops'}</span>
          </div>
        </div>

        {/* Middle Pay & Shift Highlight */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 18px',
          margin: '14px 0'
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#CBD5E1' }}>
            OFFERED PAY RATE
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FDE047', fontFamily: 'var(--font-heading)' }}>
            {jobData.payCurrency || '₹'}{jobData.payAmount?.toLocaleString() || '22,000'}{' '}
            <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>
              per {jobData.payPeriod?.toLowerCase() || 'monthly'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '6px', color: '#FAF5FF', fontWeight: 600 }}>
            <span>⏰ {jobData.shiftTiming?.split('/')[0] || 'Day Shift'}</span>
            <span>👥 {jobData.vacancies || 1} Vacancies</span>
          </div>
        </div>

        {/* Requirements & Education */}
        <div style={{ fontSize: '0.8rem', color: '#E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div>🎓 <strong>Education:</strong> {jobData.requiredEducation || '10th / 12th Pass'}</div>
          <div>💼 <strong>Experience:</strong> {jobData.experienceRequired || 'Freshers welcome'}</div>
          <div>✨ <strong>Skills:</strong> {(jobData.requiredSkills || ['Customer Support', 'Punctuality']).slice(0, 3).join(', ')}</div>
        </div>

        {/* Poster Bottom Card with QR Code */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.45)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFFFFF' }}>
              APPLY VIA ZONE SPHERE
            </div>
            <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>
              Your Zone • Your Opportunities
            </div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '4px', borderRadius: '6px', color: '#000000' }}>
            <QrCode size={30} />
          </div>
        </div>

      </div>

      {/* Download Action */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={downloadPosterImage}
          style={{ gap: '8px' }}
        >
          <Download size={18} />
          <span>Download High-Res Poster (PNG)</span>
        </button>
      </div>

    </div>
  );
};
