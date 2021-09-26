import { 
  Column,
  Entity, PrimaryGeneratedColumn  
} from 'typeorm';

@Entity()
export class DCaract {
  @PrimaryGeneratedColumn()
  cod_caract: number;
  
  @Column()
  descricao: string;

  @Column()
  valor: string;

  @Column()
  chave: string;
}