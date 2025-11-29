import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import BidModal from '../../components/Jobs/BidModal';

const SimpleBrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      console.log('[SimpleBrowseJobs] Loading jobs...');
      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (queryError) {
        console.error('[SimpleBrowseJobs] Query error:', queryError);
        throw queryError;
      }

      console.log('[SimpleBrowseJobs] Loaded jobs:', data?.length || 0);
      setJobs(data || []);
      setLoading(false);
    } catch (err) {
      console.error('[SimpleBrowseJobs] Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-red-100 border border-red-400 rounded-lg p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Jobs</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadJobs}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Browse Jobs (Simple Version)</h1>
        
        <p className="mb-4 text-gray-600">
          Found {jobs.length} jobs
        </p>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No jobs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Budget:</span>
                    <span className="font-semibold">
                      ${job.budget_min?.toLocaleString()} - ${job.budget_max?.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-semibold capitalize">{job.category}</span>
                  </div>
                  
                  {job.duration && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold">{job.duration}</span>
                    </div>
                  )}
                  
                  {job.experience_level && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Level:</span>
                      <span className="font-semibold capitalize">{job.experience_level}</span>
                    </div>
                  )}
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[SimpleBrowseJobs] Button clicked for job:', job.title);
                    console.log('[SimpleBrowseJobs] Job data:', job);
                    setSelectedJob(job);
                    setShowBidModal(true);
                    console.log('[SimpleBrowseJobs] Modal should open now');
                  }}
                  className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  View Details & Bid
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bid Modal */}
      {console.log('[SimpleBrowseJobs] Render - selectedJob:', selectedJob?.title, 'showBidModal:', showBidModal)}
      <BidModal
        isOpen={showBidModal}
        onClose={() => {
          console.log('[SimpleBrowseJobs] Modal closing');
          setShowBidModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        onSuccess={() => {
          console.log('[SimpleBrowseJobs] Bid success');
          setShowBidModal(false);
          setSelectedJob(null);
          loadJobs();
          alert('Bid submitted successfully!');
        }}
      />
    </div>
  );
};

export default SimpleBrowseJobs;
