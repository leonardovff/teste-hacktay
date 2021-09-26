import { 
  Entity, Column, PrimaryGeneratedColumn  
} from 'typeorm';

@Entity()
export class SnapshotImovelFotos {
  @PrimaryGeneratedColumn()
  cod_imovel_foto: number;

  @Column()
  url: string;
  
  @Column()
  d_imovel_cod_imovel: number;
}