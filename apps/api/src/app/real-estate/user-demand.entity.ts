import { 
  Entity, Column, PrimaryGeneratedColumn, Index,  
} from 'typeorm';

@Entity()
export class UserDemand {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  userToken: string;

  @Column()
  userName: string;

  @Column()
  demandType: string;

  @Column()
  demandPoductType: string;

  @Column()
  demandMaxValue: number;

  @Column()
  demandState: string;

  @Column()
  demandCity: string;

  @Column()
  demandNeighborhood: string;

  @Column({ default: true })
  isActive: boolean;
}