import { supabase } from '../lib/supabase';

export const bidService = {
  // Create a new bid
  async createBid(bidData) {
    try {
      const { data, error } = await supabase
        .from('bids')
        .insert([bidData])
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Get job details
      const { data: job } = await supabase
        .from('jobs')
        .select('id, title, budget_min, budget_max, client_id')
        .eq('id', data.job_id)
        .single();
      
      return { 
        success: true, 
        data: {
          ...data,
          job: job
        }
      };
    } catch (error) {
      console.error('Error creating bid:', error);
      return { success: false, error: error.message };
    }
  },

  // Get bids by freelancer
  async getFreelancerBids(freelancerId) {
    try {
      const { data: bids, error } = await supabase
        .from('bids')
        .select('*')
        .eq('freelancer_id', freelancerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Get job details for each bid
      const bidsWithJobs = await Promise.all(
        (bids || []).map(async (bid) => {
          const { data: job } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', bid.job_id)
            .single();
          
          return {
            ...bid,
            job: job
          };
        })
      );
      
      return { success: true, data: bidsWithJobs };
    } catch (error) {
      console.error('Error fetching freelancer bids:', error);
      return { success: false, error: error.message };
    }
  },

  // Get bids for a specific job
  async getJobBids(jobId) {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching job bids:', error);
      return { success: false, error: error.message };
    }
  },

  // Check if freelancer has already bid on a job
  async checkExistingBid(jobId, freelancerId) {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select('id')
        .eq('job_id', jobId)
        .eq('freelancer_id', freelancerId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, exists: !!data };
    } catch (error) {
      console.error('Error checking existing bid:', error);
      return { success: false, error: error.message };
    }
  },

  // Update bid status
  async updateBidStatus(bidId, status) {
    try {
      const { data, error } = await supabase
        .from('bids')
        .update({ status })
        .eq('id', bidId)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating bid status:', error);
      return { success: false, error: error.message };
    }
  },

  // Update bid
  async updateBid(bidId, updates) {
    try {
      const { data, error } = await supabase
        .from('bids')
        .update(updates)
        .eq('id', bidId)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating bid:', error);
      return { success: false, error: error.message };
    }
  },

  // Subscribe to bids for a job (realtime)
  subscribeToBids(jobId, callback) {
    const subscription = supabase
      .channel(`bids_${jobId}`)
      .on('postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'bids',
          filter: `job_id=eq.${jobId}`
        },
        callback
      )
      .subscribe();

    return subscription;
  }
};
