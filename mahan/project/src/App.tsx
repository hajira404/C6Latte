import React, { useEffect, useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';
import { Leaf } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and set up auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="animate-spin text-emerald-600">
          <Leaf className="w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      {!session ? (
        <div 
          className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100"
          
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-8">
              <Leaf className="w-12 h-12 text-emerald-600" />
              <h1 className="text-4xl font-bold text-emerald-800 ml-3">C6 Latte</h1>
            </div>
            <div className="flex justify-center px-4">
              <AuthForm />
            </div>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;