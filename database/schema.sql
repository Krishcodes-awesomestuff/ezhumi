-- Supabase Database Schema for Team Registration
-- Run this in your Supabase SQL Editor

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    team_lead_name VARCHAR(255) NOT NULL,
    team_lead_email VARCHAR(255) NOT NULL,
    team_lead_phone VARCHAR(20) NOT NULL,
    team_lead_college VARCHAR(255) NOT NULL,
    team_size INTEGER NOT NULL CHECK (team_size >= 1 AND team_size <= 4),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    college VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_teams_user_id ON teams(user_id);
CREATE INDEX IF NOT EXISTS idx_teams_created_at ON teams(created_at);
CREATE INDEX IF NOT EXISTS idx_participants_team_id ON participants(team_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_participants_updated_at ON participants;
CREATE TRIGGER update_participants_updated_at
    BEFORE UPDATE ON participants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies

-- Enable RLS on teams table
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Users can only view and insert their own teams
CREATE POLICY "Users can view own teams" ON teams
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own teams" ON teams
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own teams" ON teams
    FOR UPDATE USING (auth.uid() = user_id);

-- Enable RLS on participants table
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Users can view and manage participants of their own teams
CREATE POLICY "Users can view own team participants" ON participants
    FOR SELECT USING (
        team_id IN (
            SELECT id FROM teams WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own team participants" ON participants
    FOR INSERT WITH CHECK (
        team_id IN (
            SELECT id FROM teams WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own team participants" ON participants
    FOR UPDATE USING (
        team_id IN (
            SELECT id FROM teams WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own team participants" ON participants
    FOR DELETE USING (
        team_id IN (
            SELECT id FROM teams WHERE user_id = auth.uid()
        )
    );

-- Optional: Create a view for easier querying of complete team data
CREATE OR REPLACE VIEW team_details AS
SELECT 
    t.id,
    t.team_name,
    t.team_lead_name,
    t.team_lead_email,
    t.team_lead_phone,
    t.team_lead_college,
    t.team_size,
    t.user_id,
    t.created_at,
    t.updated_at,
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', p.id,
                'name', p.name,
                'email', p.email,
                'phone', p.phone,
                'college', p.college
            )
        ) FILTER (WHERE p.id IS NOT NULL),
        '[]'::json
    ) AS participants
FROM teams t
LEFT JOIN participants p ON t.id = p.team_id
GROUP BY t.id, t.team_name, t.team_lead_name, t.team_lead_email, 
         t.team_lead_phone, t.team_lead_college, t.team_size, 
         t.user_id, t.created_at, t.updated_at;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON teams TO authenticated;
GRANT ALL ON participants TO authenticated;
GRANT SELECT ON team_details TO authenticated;
