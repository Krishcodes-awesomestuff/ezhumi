import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  teamName!: string;

  @Column({ type: 'varchar' })
  teamLeadName!: string;

  @Column({ type: 'varchar' })
  teamLeadEmail!: string;

  @Column({ type: 'varchar' })
  teamLeadPhone!: string;

  @Column({ type: 'varchar' })
  teamLeadCollege!: string;

  @Column({ type: 'int' })
  teamSize!: number;

  @Column({ type: 'varchar', name: 'user_id' })
  userId!: string;

  @ManyToOne('User', 'teams', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  @OneToMany('Participant', 'team', { cascade: true })
  participants!: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
