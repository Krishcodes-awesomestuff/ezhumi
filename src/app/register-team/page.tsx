'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Users, User, Users2 } from 'lucide-react';

interface Participant {
  name: string;
  email: string;
  phone: string;
  college: string;
}

interface TeamData {
  teamName: string;
  teamLeadName: string;
  teamLeadEmail: string;
  teamLeadPhone: string;
  teamLeadCollege: string;
  teamSize: number;
  participants: Participant[];
}

export default function RegisterTeamPage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<TeamData>({
    teamName: '',
    teamLeadName: '',
    teamLeadEmail: user?.email || '',
    teamLeadPhone: '',
    teamLeadCollege: '',
    teamSize: 1,
    participants: [
      { name: '', email: '', phone: '', college: '' },
      { name: '', email: '', phone: '', college: '' },
      { name: '', email: '', phone: '', college: '' }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof TeamData, value: string | number | Participant[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map((participant, i) => 
        i === index ? { ...participant, [field]: value } : participant
      )
    }));
  };

  const handleTeamSizeChange = (size: number) => {
    setFormData(prev => ({
      ...prev,
      teamSize: size
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare team data
      const teamRecord = {
        team_name: formData.teamName,
        team_lead_name: formData.teamLeadName,
        team_lead_email: formData.teamLeadEmail,
        team_lead_phone: formData.teamLeadPhone,
        team_lead_college: formData.teamLeadCollege,
        team_size: formData.teamSize,
        user_id: user?.id
      };

      // Insert team record
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([teamRecord])
        .select()
        .single();

      if (teamError) throw teamError;

      // Prepare participants data (only for team size > 1)
      if (formData.teamSize > 1) {
        const participantRecords = formData.participants
          .slice(0, formData.teamSize - 1) // Exclude team lead
          .filter(p => p.name.trim() !== '') // Only include filled participants
          .map(participant => ({
            team_id: team.id,
            name: participant.name,
            email: participant.email,
            phone: participant.phone,
            college: participant.college
          }));

        if (participantRecords.length > 0) {
          const { error: participantsError } = await supabase
            .from('participants')
            .insert(participantRecords);

          if (participantsError) throw participantsError;
        }
      }

      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while registering your team';
      setError(errorMessage);
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
              Please sign in to register your team for the hackathon.
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

  // Success state
  if (success) {
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
            <Users2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h2 className="text-2xl font-medium text-white mb-4">Team Registered Successfully!</h2>
            <p className="text-white/70 mb-6">
              Your team &quot;{formData.teamName}&quot; has been registered for the hackathon. 
              You&apos;ll receive confirmation details via email.
            </p>
            <Link 
              href="/"
              className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Back to Home
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
      
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-white">Ezhumi</h1>
          </Link>
          <h2 className="text-3xl font-medium text-white mb-4">Team Registration</h2>
          <p className="text-white/70 text-lg">Register your team for the agriculture hackathon</p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/20 rounded-lg p-8 space-y-8"
        >
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Team Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white flex items-center gap-2">
              <Users2 className="w-5 h-5" />
              Team Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Team Name *
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                placeholder="Enter your team name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Team Size *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleTeamSizeChange(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      formData.teamSize === size
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size} {size === 1 ? 'Member' : 'Members'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Team Lead Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Team Lead Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.teamLeadName}
                  onChange={(e) => handleInputChange('teamLeadName', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.teamLeadEmail}
                  onChange={(e) => handleInputChange('teamLeadEmail', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.teamLeadPhone}
                  onChange={(e) => handleInputChange('teamLeadPhone', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  value={formData.teamLeadCollege}
                  onChange={(e) => handleInputChange('teamLeadCollege', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="Enter college name"
                />
              </div>
            </div>
          </div>

          {/* Participants Information */}
          {formData.teamSize > 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members ({formData.teamSize - 1} {formData.teamSize === 2 ? 'Member' : 'Members'})
              </h3>
              
              {Array.from({ length: formData.teamSize - 1 }, (_, index) => (
                <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
                  <h4 className="text-lg font-medium text-white">Participant {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.participants[index].name}
                        onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.participants[index].email}
                        onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.participants[index].phone}
                        onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        College Name *
                      </label>
                      <input
                        type="text"
                        value={formData.participants[index].college}
                        onChange={(e) => handleParticipantChange(index, 'college', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        placeholder="Enter college name"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering Team...' : 'Register Team'}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
