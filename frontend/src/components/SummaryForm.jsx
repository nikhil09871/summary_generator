import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Summary.css';

export default function SummaryForm({ setSummary }) {
  const [subject, setSubject] = useState('Mathematics');
  const [chapter, setChapter] = useState('');
  const [language, setLanguage] = useState('');
  const [chapters, setChapters] = useState([]);
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const chaptersRes = await api.get('/chapters', { params: { subject, class_name: 'Class 10' } });
        setChapters(chaptersRes.data);
        const languagesRes = await api.get('/languages');
        setLanguages(languagesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [subject]);

  const handleGenerate = async () => {
    try {
      const res = await api.post('/generate-summary', { subject, chapter, language, class_name: 'Class 10' });
      if (res.data && res.data.summary_data) {
        setSummary(res.data.summary_data);
        navigate('/generate-summary', { state: { chapter } });

      } else {
        console.error('Unexpected API format:', res.data);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    
  <>
    {/* Navigation bar at the top */}
    <div className="navbar">
      <div className="nav-left">Summary</div>
      <div className="nav-right">
        <span className="emoji-circle">🌱</span>
      </div>
    </div>

    {/* Main content */}
    <div className="container">
      {/* Subject row */}
      <div className="select-with-span">
        <select className="input-rectangle" value={subject} onChange={e => setSubject(e.target.value)}>
          <option value="Mathematics">Mathematics</option>
        </select>
        <span className="selected-span">Mathematics</span>
      </div>

      {/* Chapter row */}
      <div className="select-with-span">
        <select className="input-rectangle" value={chapter} onChange={e => setChapter(e.target.value)}>
          <option value="">Select Chapter</option>
          {chapters.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
        </select>
        <span className="selected-span">[{chapter || "None"}]</span>
      </div>

      {/* Language row */}
      <div className="select-with-span">
        <select className="input-rectangle" value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          {languages.map((l, idx) => <option key={idx} value={l}>{l}</option>)}
        </select>
        <span className="selected-span">[{language || "None"}]</span>
      </div>

      <button onClick={handleGenerate}>Generate</button>
    </div>
  </>
);
}

