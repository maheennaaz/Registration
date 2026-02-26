import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, ShieldCheck, Mail } from 'lucide-react';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ width: '90vw', maxWidth: '800px', margin: '2rem auto' }} className="animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
                        Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Security Protocol: Active</p>
                </div>
                <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }} onClick={logout}>
                    <LogOut size={18} /> Sign Out
                </button>
            </header>

            <div className="glass-card" style={{ maxWidth: 'none', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', display: 'flex' }}>
                        <User size={40} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>Welcome, {user?.username || 'Authenticated User'}</h2>
                        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Member since Feb 2026</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                    <div style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                            <ShieldCheck size={18} />
                            <span style={{ fontWeight: 600 }}>Account Status</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', margin: 0 }}>Verified & Secured</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                            <Mail size={18} />
                            <span style={{ fontWeight: 600 }}>Email Address</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', margin: 0, wordBreak: 'break-all' }}>{user?.email || 'Not available'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
