import React from 'react';
import SummaryForm from '../components/SummaryForm';

export default function Home({ setSummary }) {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      
      <SummaryForm setSummary={setSummary} />
    </div>
  );
}
