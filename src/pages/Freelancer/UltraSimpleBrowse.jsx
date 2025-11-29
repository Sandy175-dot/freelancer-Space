import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function UltraSimpleBrowse() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [proposal, setProposal] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      console.log('Loading jobs...');
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .limit(20);

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      console.log('Jobs loaded:', data?.length);
      setJobs(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitBid() {
    if (!bidAmount || !proposal) {
      alert('Please fill all fields');
      return;
    }

    if (proposal.length < 50) {
      alert('Proposal must be at least 50 characters');
      return;
    }

    try {
      const { error } = await supabase
        .from('bids')
        .insert({
          job_id: currentJob.id,
          freelancer_id: user.id,
          bid_amount: parseFloat(bidAmount),
          proposal: proposal
        });

      if (error) {
        alert('Error: ' + error.message);
        return;
      }

      alert('Bid submitted successfully!');
      setShowModal(false);
      setBidAmount('');
      setProposal('');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <h2>Error: {error}</h2>
        <button onClick={loadJobs} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Ultra Simple Browse Jobs</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Found {jobs.length} jobs | User: {user?.email || 'Not logged in'}
      </p>

      {jobs.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
          <p>No jobs found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }}
            >
              <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>{job.title}</h3>
              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                {job.description?.substring(0, 200)}...
              </p>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '14px' }}>
                <div>
                  <strong>Budget:</strong> ${job.budget_min?.toLocaleString()} - ${job.budget_max?.toLocaleString()}
                </div>
                <div>
                  <strong>Category:</strong> {job.category}
                </div>
                {job.duration && (
                  <div>
                    <strong>Duration:</strong> {job.duration}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  console.log('Button clicked for:', job.title);
                  setCurrentJob(job);
                  setShowModal(true);
                }}
                style={{
                  background: '#7c3aed',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => e.target.style.background = '#6d28d9'}
                onMouseOut={(e) => e.target.style.background = '#7c3aed'}
              >
                View Details & Place Bid
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && currentJob && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '20px' }}>{currentJob.title}</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>{currentJob.description}</p>

            <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
              <div style={{ marginBottom: '10px' }}>
                <strong>Budget:</strong> ${currentJob.budget_min?.toLocaleString()} - ${currentJob.budget_max?.toLocaleString()}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Category:</strong> {currentJob.category}
              </div>
              {currentJob.duration && (
                <div>
                  <strong>Duration:</strong> {currentJob.duration}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Your Bid Amount ($)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid amount"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Your Proposal (minimum 50 characters)
              </label>
              <textarea
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Explain why you're the best fit for this job..."
                rows="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                {proposal.length} / 50 characters minimum
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ddd',
                  background: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitBid}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  background: '#7c3aed',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
