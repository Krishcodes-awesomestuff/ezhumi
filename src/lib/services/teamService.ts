import { getDatabase } from '../database';
import { Team } from '../entities/Team';
import { Participant } from '../entities/Participant';

export interface TeamData {
  teamName: string;
  teamLeadName: string;
  teamLeadEmail: string;
  teamLeadPhone: string;
  teamLeadCollege: string;
  teamSize: number;
  participants: Array<{
    name: string;
    email: string;
    phone: string;
    college: string;
  }>;
}

export interface TeamWithParticipants extends Team {
  participants: Participant[];
}

export class TeamService {
  static async createTeam(userId: string, teamData: TeamData): Promise<TeamWithParticipants> {
    const db = getDatabase();
    const teamRepository = db.getRepository(Team);
    const participantRepository = db.getRepository(Participant);

    // Create team
    const team = teamRepository.create({
      teamName: teamData.teamName,
      teamLeadName: teamData.teamLeadName,
      teamLeadEmail: teamData.teamLeadEmail,
      teamLeadPhone: teamData.teamLeadPhone,
      teamLeadCollege: teamData.teamLeadCollege,
      teamSize: teamData.teamSize,
      userId: userId
    });

    const savedTeam = await teamRepository.save(team);

    if (teamData.teamSize > 1 && teamData.participants.length > 0) {
      const participantRecords = teamData.participants
        .slice(0, teamData.teamSize - 1) 
        .filter(p => p.name.trim() !== '') 
        .map(participant => participantRepository.create({
          teamId: savedTeam.id,
          name: participant.name,
          email: participant.email,
          phone: participant.phone,
          college: participant.college
        }));

      if (participantRecords.length > 0) {
        await participantRepository.save(participantRecords);
      }
    }

    return this.getTeamWithParticipants(savedTeam.id);
  }

  static async getTeamsByUserId(userId: string): Promise<TeamWithParticipants[]> {
    const db = getDatabase();
    const teamRepository = db.getRepository(Team);

    const teams = await teamRepository.find({
      where: { userId },
      relations: ['participants'],
      order: { createdAt: 'DESC' }
    });

    return teams;
  }

  static async getTeamWithParticipants(teamId: string): Promise<TeamWithParticipants> {
    const db = getDatabase();
    const teamRepository = db.getRepository(Team);

    const team = await teamRepository.findOne({
      where: { id: teamId },
      relations: ['participants']
    });

    if (!team) {
      throw new Error('Team not found');
    }

    return team;
  }

  static async updateTeam(teamId: string, userId: string, teamData: Partial<TeamData>): Promise<TeamWithParticipants> {
    const db = getDatabase();
    const teamRepository = db.getRepository(Team);
    const participantRepository = db.getRepository(Participant);

    const team = await teamRepository.findOne({
      where: { id: teamId, userId }
    });

    if (!team) {
      throw new Error('Team not found or access denied');
    }

    if (teamData.teamName) team.teamName = teamData.teamName;
    if (teamData.teamLeadName) team.teamLeadName = teamData.teamLeadName;
    if (teamData.teamLeadEmail) team.teamLeadEmail = teamData.teamLeadEmail;
    if (teamData.teamLeadPhone) team.teamLeadPhone = teamData.teamLeadPhone;
    if (teamData.teamLeadCollege) team.teamLeadCollege = teamData.teamLeadCollege;
    if (teamData.teamSize) team.teamSize = teamData.teamSize;

    await teamRepository.save(team);

    if (teamData.participants && teamData.teamSize && teamData.teamSize > 1) {
      await participantRepository.delete({ teamId });

      const participantRecords = teamData.participants
        .slice(0, teamData.teamSize - 1)
        .filter(p => p.name.trim() !== '')
        .map(participant => participantRepository.create({
          teamId: team.id,
          name: participant.name,
          email: participant.email,
          phone: participant.phone,
          college: participant.college
        }));

      if (participantRecords.length > 0) {
        await participantRepository.save(participantRecords);
      }
    }

    return this.getTeamWithParticipants(teamId);
  }

  static async deleteTeam(teamId: string, userId: string): Promise<void> {
    const db = getDatabase();
    const teamRepository = db.getRepository(Team);

    const team = await teamRepository.findOne({
      where: { id: teamId, userId }
    });

    if (!team) {
      throw new Error('Team not found or access denied');
    }

    await teamRepository.remove(team);
  }
}
