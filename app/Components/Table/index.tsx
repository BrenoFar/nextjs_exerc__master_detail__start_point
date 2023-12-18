import './table.css';

type Disciplina = {
  id_disciplina: string;
  tx_sigla: string;
  tx_descricao: string;
  in_periodo: string;
  in_carga_horaria: string;
  // Defina corretamente os tipos das disciplinas
};

type TabelaProps = {
  disciplinas: Disciplina[];
};

export default function Tabela({ disciplinas }: TabelaProps) {    
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sigla</th>
                    <th>Descrição</th>
                    <th>Período</th>
                    <th>Carga Horária</th>
                </tr>
            </thead>
            <tbody>
                {disciplinas.map((disciplina: Disciplina, index: number) => (
                    <tr key={index}>
                        <td>{disciplina.id_disciplina}</td>
                        <td>{disciplina.tx_sigla}</td>
                        <td>{disciplina.tx_descricao}</td>
                        <td>{disciplina.in_periodo}</td>
                        <td>{disciplina.in_carga_horaria}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
