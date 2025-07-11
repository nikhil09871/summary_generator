import React from 'react';
import '../styles/Summary.css';

export default function SummaryOutput({ summary, chapter }) {
  if (!summary) return null;

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
         <h2>{chapter}</h2> 

        {summary.story_summary && (
          <>
            
            <p>{summary.story_summary}</p>
          </>
        )}

        {Array.isArray(summary.bullet_points) && summary.bullet_points.length > 0 && (
          <>
            <h3>Key Points</h3>
            <ul>
              {summary.bullet_points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </>
        )}

        {Array.isArray(summary.important_formulas) && summary.important_formulas.length > 0 && (
          <>
            <h3>Important Formulas</h3>
            <ul>
              {summary.important_formulas.map((formula, idx) => (
                <li key={idx}>
                  <strong>{formula.formula_name}</strong>: {formula.formula}
                  <br />
                  <em>{formula.description}</em>
                </li>
              ))}
            </ul>
          </>
        )}

        {Array.isArray(summary.key_theorems) && summary.key_theorems.length > 0 && (
          <>
            <h3>Key Theorems</h3>
            <ul>
              {summary.key_theorems.map((theorem, idx) => (
                <li key={idx}>
                  {typeof theorem === 'string' ? theorem : (
                    <>
                      <strong>{theorem.theorem_name}</strong>
                      <br />
                      <em>{theorem.description}</em>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
