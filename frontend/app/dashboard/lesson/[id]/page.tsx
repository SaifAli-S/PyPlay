'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/'; return; }

    fetch(`http://127.0.0.1:5000/api/lessons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(data => setLesson(data));

    fetch(`http://127.0.0.1:5000/api/lessons/${id}/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(data => {
      if (Array.isArray(data)) setQuestions(data);
    });

    fetch('http://127.0.0.1:5000/api/progress/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()).then(data => {
      if (Array.isArray(data) && data.some(p => p.lesson_id === parseInt(id))) {
        setCompleted(true);
      }
    });
  }, [id]);

  const handleAnswer = async (questionId, option) => {
    if (answers[questionId]) return;
    const token = localStorage.getItem('token');
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    const res = await fetch(`http://127.0.0.1:5000/api/lessons/${id}/check`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: questionId, answer: option }),
    });
    const data = await res.json();
    setResults(prev => ({ ...prev, [questionId]: data.correct ? 'correct' : 'wrong' }));
  };

  const handleComplete = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://127.0.0.1:5000/api/progress/complete', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_id: parseInt(id) }),
    });
    const data = await res.json();
    if (res.ok) { setCompleted(true); setXpEarned(data.xp_earned); }
  };

  if (!lesson) return <p style={{ color: '#fff', padding: '2rem' }}>Loading...</p>;

  const sections = lesson.content.split('\n\n');

  return (
    <main style={styles.bg}>
      <div style={styles.container}>
        <button onClick={() => window.location.href = '/dashboard'} style={styles.back}>← Back</button>
        
        <div style={styles.lessonHeader}>
          <span style={styles.xpBadge}>+{lesson.xp_reward} XP</span>
          <h1 style={styles.title}>{lesson.title}</h1>
          <p style={styles.desc}>{lesson.description}</p>
        </div>

        {/* Content Sections */}
        {sections.map((section, i) => {
          const isCode = section.includes('Output:') || section.startsWith('Example') || section.includes('print(') || section.includes('=');
          return (
            <div key={i} style={isCode ? styles.codeBox : styles.theoryBox}>
              {isCode
                ? <pre style={styles.code}>{section}</pre>
                : <p style={styles.theory}>{section}</p>
              }
            </div>
          );
        })}

        {/* Quiz */}
        {questions.length > 0 && (
          <div style={styles.quizSection}>
            <h2 style={styles.quizTitle}>🧠 Quiz Time!</h2>
            {questions.map((q, qi) => (
              <div key={q.id} style={styles.quizBox}>
                <p style={styles.quizQ}>{qi + 1}. {q.question}</p>
                <div style={styles.options}>
                  {[['a', q.option_a], ['b', q.option_b], ['c', q.option_c], ['d', q.option_d]].map(([key, text]) => {
                    const selected = answers[q.id] === key;
                    const result = results[q.id];
                    let border = '1px solid #2a2d35';
                    let bg = '#0d0d0f';
                    if (selected) {
                      bg = result === 'correct' ? '#1a3a1a' : '#3a1a1a';
                      border = result === 'correct' ? '1px solid #4ade80' : '1px solid #ef4444';
                    }
                    return (
                      <button key={key} onClick={() => handleAnswer(q.id, key)}
                        style={{ ...styles.optionBtn, background: bg, border }}>
                        <span style={styles.optionKey}>{key.toUpperCase()}.</span> {text}
                      </button>
                    );
                  })}
                </div>
                {results[q.id] === 'correct' && <p style={styles.correct}>✅ Correct!</p>}
                {results[q.id] === 'wrong' && <p style={styles.wrong}>❌ Wrong! Try again.</p>}
              </div>
            ))}
          </div>
        )}

        {/* Complete Button */}
        <div style={{ marginTop: '2rem' }}>
          {completed ? (
            <div style={styles.successBox}>🎉 Lesson Complete! {xpEarned ? `+${xpEarned} XP earned!` : 'Already completed.'}</div>
          ) : (
            <button onClick={handleComplete} style={styles.completeBtn}>
              ✅ Mark Complete — +{lesson.xp_reward} XP
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
  bg: { minHeight: '100vh', background: '#0d0d0f', fontFamily: "'Courier New', monospace" },
  container: { maxWidth: '750px', margin: '0 auto', padding: '2rem 1.5rem' },
  back: { background: 'transparent', border: '1px solid #2a2d35', color: '#6b7280', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2rem', fontFamily: "'Courier New', monospace" },
  lessonHeader: { marginBottom: '2rem' },
  xpBadge: { background: '#1a1f14', border: '1px solid #4ade8033', color: '#4ade80', padding: '4px 12px', borderRadius: '99px', fontSize: '12px' },
  title: { color: '#ffffff', fontSize: '26px', margin: '12px 0 8px' },
  desc: { color: '#6b7280', fontSize: '14px', margin: 0 },
  theoryBox: { background: '#16181c', border: '1px solid #2a2d35', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' },
  theory: { color: '#d1d5db', fontSize: '15px', lineHeight: '1.7', margin: 0 },
  codeBox: { background: '#111318', border: '1px solid #2a2d35', borderLeft: '3px solid #4ade80', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' },
  code: { color: '#4ade80', fontSize: '14px', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' },
  quizSection: { marginTop: '2rem' },
  quizTitle: { color: '#ffffff', fontSize: '20px', marginBottom: '1rem' },
  quizBox: { background: '#16181c', border: '1px solid #2a2d35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' },
  quizQ: { color: '#ffffff', fontSize: '15px', marginBottom: '1rem' },
  options: { display: 'flex', flexDirection: 'column', gap: '8px' },
  optionBtn: { padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', color: '#ffffff', fontSize: '14px', textAlign: 'left', fontFamily: "'Courier New', monospace', transition: 'all 0.2s'" },
  optionKey: { color: '#4ade80', fontWeight: 'bold', marginRight: '8px' },
  correct: { color: '#4ade80', marginTop: '12px', fontWeight: 'bold' },
  wrong: { color: '#ef4444', marginTop: '12px', fontWeight: 'bold' },
  completeBtn: { width: '100%', background: '#4ade80', color: '#0d0d0f', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', fontFamily: "'Courier New', monospace" },
  successBox: { background: '#1a1f14', border: '1px solid #4ade80', borderRadius: '12px', padding: '1.5rem', color: '#4ade80', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' },
};