import { supabase } from '../lib/supabase';

export const checkDatabaseSetup = async () => {
  try {
    // Try to query the jobs table
    const { data, error } = await supabase
      .from('jobs')
      .select('id')
      .limit(1);
    
    if (error) {
      // Check if it's a "table doesn't exist" error
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        return {
          isSetup: false,
          error: 'Database tables not created',
          message: 'Please run the migration SQL in your Supabase dashboard'
        };
      }
      return {
        isSetup: false,
        error: error.message,
        message: 'Database connection error'
      };
    }
    
    return {
      isSetup: true,
      message: 'Database is properly configured'
    };
  } catch (error) {
    return {
      isSetup: false,
      error: error.message,
      message: 'Failed to check database setup'
    };
  }
};

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return {
        connected: false,
        error: error.message
      };
    }
    
    return {
      connected: true,
      hasSession: !!data.session
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
};
