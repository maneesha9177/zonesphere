import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ShieldCheck, ShieldAlert, FileText, CheckCircle2, 
  XCircle, Clock, RotateCcw, Trash2 
} from 'lucide-react';
import type { VerificationStatus } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const { 
    isAdminDashboardOpen, 
    setIsAdminDashboardOpen, 
    businesses, 
    jobs, 
    reports, 
    auditLogs, 
    adminVerifyBusiness, 
    adminResolveReport,
    renewJobListing,
    showToast 
  } = useApp();

  const [adminTab, setAdminTab] = useState<'businesses' | 'jobs' | 'reports' | 'audit'>('businesses');

  if (!isAdminDashboardOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsAdminDashboardOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '1050px', width: '95%', height: '88vh', display: 'flex', flexDirection: 'column' }}
      >
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #1E4E6D 0%, #28658A 100%)',
          color: '#FFFFFF',
          borderBottom: '1px solid #3D7EAA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--sky-blue)', color: 'var(--deep-blue-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF' }}>
                  ZONE SPHERE Admin & Safety Command Center
                </h3>
                <span className="badge badge-pink" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  Confidential Staff View
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#EAF7FF' }}>
                Business KYC Verification, Job TTL Lifecycle & Anti-Fraud Moderation
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAdminDashboardOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#EAF7FF', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Sub Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 24px',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          <button
            className={`btn ${adminTab === 'businesses' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setAdminTab('businesses')}
          >
            <ShieldCheck size={14} />
            <span>Business KYC Queue ({businesses.length})</span>
          </button>

          <button
            className={`btn ${adminTab === 'jobs' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setAdminTab('jobs')}
          >
            <Clock size={14} />
            <span>Job TTL Manager ({jobs.length})</span>
          </button>

          <button
            className={`btn ${adminTab === 'reports' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setAdminTab('reports')}
          >
            <ShieldAlert size={14} />
            <span>Safety Reports ({reports.length})</span>
          </button>

          <button
            className={`btn ${adminTab === 'audit' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setAdminTab('audit')}
          >
            <FileText size={14} />
            <span>Audit Trail Log</span>
          </button>
        </div>

        {/* Scrollable Main Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* TAB 1: BUSINESS KYC REVIEW */}
          {adminTab === 'businesses' && (
            <div>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Business Verification Submissions</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Inspect official registration documents and authorize verified badges
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Business Enterprise</th>
                      <th>Category & Locality</th>
                      <th>Tax / Reg ID</th>
                      <th>Proof Document</th>
                      <th>Status</th>
                      <th>Review Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map(biz => (
                      <tr key={biz.id}>
                        <td>
                          <div style={{ fontWeight: 800, color: '#1E1B4B' }}>{biz.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{biz.officialEmail} • {biz.officialPhone}</div>
                        </td>
                        <td>
                          <div>{biz.category}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>📍 {biz.locality}</div>
                        </td>
                        <td>
                          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                            {biz.registrationType}
                          </span>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                            {biz.registrationNumber}
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.75rem', gap: '4px' }}
                            onClick={() => {
                              showToast(`📄 Inspecting verified document "${biz.documentName || 'Proof'}"`, 'info');
                            }}
                          >
                            <FileText size={12} />
                            <span>{biz.documentName || 'View PDF'}</span>
                          </button>
                        </td>
                        <td>
                          <span className={`badge ${
                            biz.verificationStatus === 'Approved' ? 'badge-verified' :
                            biz.verificationStatus === 'Rejected' ? 'badge-urgent' : 'badge-closing'
                          }`} style={{ fontSize: '0.75rem' }}>
                            {biz.verificationStatus}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {biz.verificationStatus !== 'Approved' && (
                              <button
                                className="btn btn-teal btn-sm"
                                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                onClick={() => adminVerifyBusiness(biz.id, 'Approved', 'Verified against official state registry.')}
                              >
                                <CheckCircle2 size={13} />
                                <span>Approve</span>
                              </button>
                            )}
                            {biz.verificationStatus !== 'Rejected' && (
                              <button
                                className="btn btn-outline btn-sm"
                                style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#E11D48' }}
                                onClick={() => adminVerifyBusiness(biz.id, 'Rejected', 'Document invalid or blurred.')}
                              >
                                <XCircle size={13} />
                                <span>Reject</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: JOB TTL & LIFECYCLE MANAGER */}
          {adminTab === 'jobs' && (
            <div>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Job Listing Lifecycle & TTL Status</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Server-side time-to-live enforcement prevents stale vacancies
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Job Role & Business</th>
                      <th>Category</th>
                      <th>Pay Rate</th>
                      <th>TTL Expiry</th>
                      <th>Status</th>
                      <th>Lifecycle Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td>
                          <div style={{ fontWeight: 800, color: '#1E1B4B' }}>{job.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{job.businessName} ({job.locality})</div>
                        </td>
                        <td>{job.category}</td>
                        <td style={{ fontWeight: 700, color: '#0D9488' }}>
                          {job.payCurrency}{job.payAmount.toLocaleString()} / {job.payPeriod}
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                            {new Date(job.expiresAt).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                            {job.status === 'Closing Soon' ? '⏰ Expiring in <48h' : 'Active'}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            job.status === 'Active' ? 'badge-purple' : 'badge-closing'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.75rem', gap: '4px' }}
                            onClick={() => renewJobListing(job.id, 14)}
                          >
                            <RotateCcw size={12} />
                            <span>Renew (+14 Days)</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SAFETY & MODERATION QUEUE */}
          {adminTab === 'reports' && (
            <div>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Safety & Content Reports Queue</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  User-reported listings, wage discrepancies, and scam alerts
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reports.map(rep => (
                  <div
                    key={rep.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #FECDD3',
                      borderRadius: 'var(--radius-lg)',
                      padding: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge badge-urgent" style={{ fontSize: '0.7rem' }}>
                          Flagged: {rep.contentType.toUpperCase()}
                        </span>
                        <strong style={{ fontSize: '1rem', color: '#9F1239' }}>
                          {rep.contentTitle}
                        </strong>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                        Reason: {rep.reason}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        "{rep.additionalDetails}" • Reported by {rep.reportedBy}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-teal btn-sm"
                        onClick={() => adminResolveReport(rep.id, 'Dismissed - Valid', 'Investigated and cleared as compliant.')}
                      >
                        <CheckCircle2 size={14} />
                        <span>Dismiss (Valid)</span>
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ background: '#E11D48', color: 'white' }}
                        onClick={() => adminResolveReport(rep.id, 'Resolved - Removed', 'Listing deactivated due to policy violation.')}
                      >
                        <Trash2 size={14} />
                        <span>Remove Content</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT LOG TRAIL */}
          {adminTab === 'audit' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>
                Platform Security & Administrative Audit Trail
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {auditLogs.map(log => (
                  <div
                    key={log.id}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-purple" style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
                          {log.action}
                        </span>
                        <strong style={{ color: '#0F172A' }}>{log.actor}</strong>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {log.details}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
