'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Users, User, Mail, Phone, GraduationCap, Plus, Calendar } from 'lucide-react';

interface Team {
  id: string;
  team_name: string;
  team_lead_name: string;
  team_lead_email: string;
  team_lead_phone: string;
  team_lead_college: string;
  team_size: number;
  created_at: string;
  participants: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    college: string;
  }>;
}

export default function TeamsPage() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchTeams();
    }
  }, [user]);

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('team_details')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeams(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md text-center"
        >
          <div className="p-8 bg-white/5 border border-white/20 rounded-lg">
            <Users className="w-16 h-16 mx-auto mb-4 text-white/70" />
            <h2 className="text-2xl font-medium text-white mb-4">Authentication Required</h2>
            <p className="text-white/70 mb-6">
              Please sign in to view your registered teams.
            </p>
            <Link 
              href="/login"
              className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <h1 className="text-2xl font-bold text-white">Ezhumi</h1>
            </Link>
            <h2 className="text-3xl font-medium text-white mb-2">My Teams</h2>
            <p className="text-white/70">Manage your hackathon team registrations</p>
          </div>
          
          <Link 
            href="/register-team"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Register New Team
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white/70 mt-4">Loading your teams...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && teams.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Users className="w-24 h-24 mx-auto mb-6 text-white/30" />
            <h3 className="text-2xl font-medium text-white mb-4">No Teams Registered</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              You haven't registered any teams yet. Start by creating your first team for the hackathon.
            </p>
            <Link 
              href="/register-team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Register Your First Team
            </Link>
          </motion.div>
        )}

        {/* Teams List */}
        {!loading && teams.length > 0 && (
          <div className="space-y-8">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/20 rounded-lg p-8"
              >
                {/* Team Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">{team.team_name}</h3>
                    <div className="flex items-center gap-4 text-white/70">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{team.team_size} {team.team_size === 1 ? 'Member' : 'Members'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Registered {new Date(team.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Lead */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Team Lead
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Name</p>
                      <p className="text-white font-medium">{team.team_lead_name}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Email</p>
                      <p className="text-white font-medium">{team.team_lead_email}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Phone</p>
                      <p className="text-white font-medium">{team.team_lead_phone}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">College</p>
                      <p className="text-white font-medium">{team.team_lead_college}</p>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                {team.participants && team.participants.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Team Members
                    </h4>
                    <div className="space-y-4">
                      {team.participants.map((participant, pIndex) => (
                        <div key={participant.id} className="p-4 bg-white/5 rounded-lg">
                          <h5 className="text-white font-medium mb-3">Participant {pIndex + 1}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-white/70 text-sm mb-1">Name</p>
                              <p className="text-white font-medium">{participant.name}</p>
                            </div>
                            <div>
                              <p className="text-white/70 text-sm mb-1">Email</p>
                              <p className="text-white font-medium">{participant.email}</p>
                            </div>
                            <div>
                              <p className="text-white/70 text-sm mb-1">Phone</p>
                              <p className="text-white font-medium">{participant.phone}</p>
                            </div>
                            <div>
                              <p className="text-white/70 text-sm mb-1">College</p>
                              <p className="text-white font-medium">{participant.college}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
