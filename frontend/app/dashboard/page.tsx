'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }
    fetchLessons(token);
    fetchUser(token);
    fetchProgress(token);
  }, []);

  const fetchLessons = async (token) => {
    console.log('Token:', token);
    try {
      const res = await fetch('http://127.0.0.1:5000/api/lessons/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Could not fetch lessons');
    }
  };

  const fetchUser = async (token) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Could not fetch user');
    }
  };

  const fetchProgress = async (token) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/progress/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProgress(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Could not fetch progress');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <main style={styles.bg}>
      <div style={styles.grid}>
        {[...Array(30)].map((_, i) => <div key={i} style={styles.gridCell} />)}
      </div>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <span style={styles.logoIcon}>{'</>'}</span>
            <span style={styles.logoText}>PyPlay</span>
          </div>
            <button onClick={() => window.location.href = '/profile'} style={styles.logoutBtn}>Profile</button>
            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>

        {/* Welcome */}
        <div style={styles.welcomeCard}>
          <div>
            <p style={styles.welcomeLabel}>Welcome back 👋</p>
            <h1 style={styles.welcomeTitle}>Ready to code today?</h1>
          </div>
          <div style={styles.streakBadge}>
            <span style={styles.streakFire}>🔥</span>
            <span style={styles.streakNum}>{user?.streak ?? 0}</span>
            <span style={styles.streakLabel}>day streak</span>
          </div>
        </div>

        {/* XP Bar */}
        <div style={styles.xpSection}>
          <div style={styles.xpLabelRow}>
            <span style={styles.xpText}>⚡ XP Progress</span>
            <span style={styles.xpText}>{user?.xp ?? 0} / 100 XP</span>
          </div>
          <div style={styles.xpBar}>
            <div style={{ ...styles.xpFill, width: '0%' }} />
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{progress.length}</span>
            <span style={styles.statLabel}>Lessons Done</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>{user?.xp ?? 0}</span>
            <span style={styles.statLabel}>XP Earned</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNum}>🥚</span>
            <span style={styles.statLabel}>Rank</span>
          </div>
        </div>

        {/* Lessons */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📚 Python Lessons</h2>
          {lessons.length === 0 ? (
            <div style={styles.emptyCard}>
              <p style={styles.emptyText}>No lessons yet — seed the database to get started!</p>
              <code style={styles.emptyCode}>python seed.py</code>
            </div>
          ) : (
            <div style={styles.lessonGrid}>
              {lessons.map((lesson, i) => (
                <div key={i} style={styles.lessonCard} onClick={() => window.location.href = `/dashboard/lesson/${lesson.id}`}>
                  <div style={styles.lessonNum}>{i + 1}</div>
                  <div>
                    <p style={styles.lessonTitle}>{lesson.title}</p>
                    <p style={styles.lessonDesc}>{lesson.description}</p>
                  </div>
                  <div style={styles.lessonXp}>
                    {progress.some(p => p.lesson_id === lesson.id) ? '✅' : `+${lesson.xp_reward} XP`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
  bg: {
    minHeight: '100vh',
    background: '#0d0d0f',
    fontFamily: "'Courier New', monospace",
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    opacity: 0.03,
    pointerEvents: 'none',
  },
  gridCell: { border: '1px solid #4ade80' },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: {
    background: '#4ade80',
    color: '#0d0d0f',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '6px 10px',
    borderRadius: '8px',
  },
  logoText: { fontSize: '22px', fontWeight: 'bold', color: '#ffffff' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #2a2d35',
    color: '#6b7280',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    fontSize: '13px',
  },
  welcomeCard: {
    background: '#16181c',
    border: '1px solid #2a2d35',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  welcomeLabel: { color: '#6b7280', fontSize: '13px', margin: '0 0 4px' },
  welcomeTitle: { color: '#ffffff', fontSize: '22px', margin: 0 },
  streakBadge: {
    background: '#1a1f14',
    border: '1px solid #4ade8033',
    borderRadius: '12px',
    padding: '12px 20px',
    textAlign: 'center',
  },
  streakFire: { fontSize: '24px', display: 'block' },
  streakNum: { color: '#4ade80', fontSize: '28px', fontWeight: 'bold', display: 'block' },
  streakLabel: { color: '#6b7280', fontSize: '11px' },
  xpSection: { marginBottom: '1.5rem' },
  xpLabelRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  xpText: { color: '#6b7280', fontSize: '13px' },
  xpBar: {
    height: '6px',
    background: '#2a2d35',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    background: '#4ade80',
    borderRadius: '99px',
    transition: 'width 0.5s ease',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '2rem',
  },
  statCard: {
    background: '#16181c',
    border: '1px solid #2a2d35',
    borderRadius: '12px',
    padding: '1.25rem',
    textAlign: 'center',
  },
  statNum: { color: '#4ade80', fontSize: '28px', fontWeight: 'bold', display: 'block' },
  statLabel: { color: '#6b7280', fontSize: '12px' },
  section: { marginBottom: '2rem' },
  sectionTitle: { color: '#ffffff', fontSize: '18px', marginBottom: '1rem' },
  emptyCard: {
    background: '#16181c',
    border: '1px dashed #2a2d35',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
  },
  emptyText: { color: '#6b7280', fontSize: '14px', marginBottom: '12px' },
  emptyCode: {
    background: '#0d0d0f',
    color: '#4ade80',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
  },
  lessonGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  lessonCard: {
    background: '#16181c',
    border: '1px solid #2a2d35',
    borderRadius: '12px',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
  },
  lessonNum: {
    background: '#4ade8022',
    color: '#4ade80',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  lessonTitle: { color: '#ffffff', fontSize: '15px', margin: '0 0 4px' },
  lessonDesc: { color: '#6b7280', fontSize: '13px', margin: 0 },
  lessonXp: {
    marginLeft: 'auto',
    color: '#4ade80',
    fontSize: '13px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
};