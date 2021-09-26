import { 
  Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn  
} from 'typeorm';
import { DCaract } from './d_caract';

@Entity()
export class BImovelCarac {
  @PrimaryColumn()
  d_imovel_cod_imovel: number;
  
  @PrimaryColumn()
  d_caract_cod_caract: number;
}