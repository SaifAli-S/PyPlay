'use client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/'; return; }

    fetch('http://127.0.0.1:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(data => setUser(data));

    fetch('http://127.0.0.1:5000/api/progress/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(data => setProgress(Array.isArray(data) ? data : []));
  }, []);

  if (!user) return <p style={{ color: '#fff', padding: '2rem' }}>Loading...</p>;

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const rank = user.xp >= 500 ? '🏆 Gold' : user.xp >= 200 ? '🥈 Silver' : user.xp >= 50 ? '🥉 Bronze' : '🥚 Beginner';
  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <main style={styles.bg}>
      <div style={styles.container}>
        <button onClick={() => window.location.href = '/dashboard'} style={styles.back}>← Back</button>

        {/* Avatar */}
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>{initials}</div>
          <h1 style={styles.username}>{user.username}</h1>
          <p style={styles.email}>{user.email}</p>
          <div style={styles.rankBadge}>{rank}</div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{user.xp}</span>
            <span style={styles.statLabel}>Total XP</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{progress.length}</span>
            <span style={styles.statLabel}>Lessons Done</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{user.streak}</span>
            <span style={styles.statLabel}>Day Streak 🔥</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{joinDate}</span>
            <span style={styles.statLabel}>Member Since</span>
          </div>
        </div>

        {/* XP Bar */}
        <div style={styles.xpSection}>
          <div style={styles.xpLabelRow}>
            <span style={styles.xpText}>⚡ XP Progress</span>
            <span style={styles.xpText}>{user.xp} XP</span>
          </div>
          <div style={styles.xpBar}>
            <div style={{ ...styles.xpFill, width: `${Math.min((user.xp / 500) * 100, 100)}%` }} />
          </div>
          <p style={styles.xpHint}>500 XP to reach Gold rank</p>
        </div>

        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </main>
  );
}

const styles = {
  bg: { minHeight: '100vh', background: '#0d0d0f', fontFamily: "'Courier New', monospace" },
  container: { maxWidth: '600px', margin: '0 auto', padding: '2rem 1.5rem' },
  back: { background: 'transparent', border: '1px solid #2a2d35', color: '#6b7280', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem', fontFamily: "'Courier New', monospace" },
  avatarSection: { textAlign: 'center', marginBottom: '2rem' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', background: '#4ade80', color: '#0d0d0f', fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' },
  username: { color: '#ffffff', fontSize: '24px', margin: '0 0 4px' },
  email: { color: '#6b7280', fontSize: '14px', margin: '0 0 12px' },
  rankBadge: { display: 'inline-block', background: '#1a1f14', border: '1px solid #4ade8033', color: '#4ade80', padding: '6px 16px', borderRadius: '99px', fontSize: '14px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '2rem' },
  statCard: { background: '#16181c', border: '1px solid #2a2d35', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' },
  statNum: { color: '#4ade80', fontSize: '22px', fontWeight: 'bold', display: 'block', marginBottom: '4px' },
  statLabel: { color: '#6b7280', fontSize: '12px' },
  xpSection: { background: '#16181c', border: '1px solid #2a2d35', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' },
  xpLabelRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  xpText: { color: '#6b7280', fontSize: '13px' },
  xpBar: { height: '8px', background: '#2a2d35', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' },
  xpFill: { height: '100%', background: '#4ade80', borderRadius: '99px', transition: 'width 0.5s ease' },
  xpHint: { color: '#6b7280', fontSize: '12px', margin: 0 },
  logoutBtn: { width: '100%', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontFamily: "'Courier New', monospace", fontSize: '14px' },
};