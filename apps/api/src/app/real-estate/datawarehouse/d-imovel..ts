import { 
  Entity, Column, PrimaryGeneratedColumn  
} from 'typeorm';

@Entity()
export class DImovel {
  @PrimaryGeneratedColumn()
  cod_imovel: number;

  @Column()
  tipo_imovel: string;
  
  @Column()
  descricao_resumida: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  estado: string;

  @Column()
  preco_aluguel_atual: number;

  @Column()
  preco_venda_atual: number;

  @Column()
  preco_iptu_atual: number;

  @Column()
  preco_condominio_atual: number;

  @Column()
  para_vender: number;

  @Column()
  para_alugar: number;
}