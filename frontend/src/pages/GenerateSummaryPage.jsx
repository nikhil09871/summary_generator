import React from 'react';
import { useLocation } from 'react-router-dom';
import SummaryOutput from '../components/SummaryOutput';

export default function GenerateSummaryPage({ summary }) {
  const location = useLocation();
  const chapter = location.state?.chapter || 'Summary';  // fallback if undefined

  return (
    <div>
      <SummaryOutput summary={summary} chapter={chapter} />
    </div>
  );
}
