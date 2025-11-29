import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const TestBrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .limit(10);

      if (error) throw error;
      setJobs(data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  const handleViewDetails = (job) => {
    console.log('Button clicked!', job.title);
    alert(`Viewing details for: ${job.title}\n\nBudget: $${job.budget_min} - $${job.budget_max}\nCategory: ${job.category}`);
    setSelectedJob(job);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Browse Jobs - Simple Version</h1>
        
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="font-semibold">Debug Info:</p>
          <p>Jobs loaded: {jobs.length}</p>
          <p>Selected job: {selectedJob ? selectedJob.title : 'None'}</p>
        </div>

        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-gray-600 mt-2">{job.description?.substring(0, 150)}...</p>
                </div>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {job.category}
                </span>
              </div>

              <div className="flex gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Budget: </span>
                  <span className="font-semibold">
                    ${job.budget_min?.toLocaleString()} - ${job.budget_max?.toLocaleString()}
                  </span>
                </div>
                {job.duration && (
                  <div>
                    <span className="text-gray-500">Duration: </span>
                    <span className="font-semibold">{job.duration}</span>
                  </div>
                )}
              </div>

              {/* Test Button 1: Simple onclick */}
              <button
                onClick={() => handleViewDetails(job)}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                🔍 View Details (Test Button {index + 1})
              </button>

              {/* Test Button 2: With console log */}
              <button
                onClick={() => {
                  console.log('Direct button click!', job.title);
                  alert('Button works! Job: ' + job.title);
                }}
                className="w-full mt-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                ✅ Test Click (Should show alert)
              </button>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
              <p className="mb-4">{selectedJob.description}</p>
              
              <div className="space-y-2 mb-6">
                <p><strong>Budget:</strong> ${selectedJob.budget_min} - ${selectedJob.budget_max}</p>
                <p><strong>Category:</strong> {selectedJob.category}</p>
                {selectedJob.duration && <p><strong>Duration:</strong> {selectedJob.duration}</p>}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Your Bid Amount ($)</label>
                  <input
                    type="number"
                    placeholder="Enter your bid"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Your Proposal</label>
                  <textarea
                    placeholder="Write your proposal here..."
                    rows="5"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Bid submitted for: ' + selectedJob.title);
                      setSelectedJob(null);
                    }}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                  >
                    Submit Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestBrowseJobs;
