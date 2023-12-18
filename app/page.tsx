"use client";
import React, { useState, useEffect } from "react";
import Tabela from "./Components/Table/index";
import FloatingText from "./Components/Table/Useless/FloatingGradient";

type Curso = {
  id_curso: string;
  tx_descricao: string;
};

type Disciplina = {
  id_disciplina: string;
  tx_sigla: string;
  tx_descricao: string;
  in_periodo: string;
  in_carga_horaria: string;
  // Defina corretamente os tipos das disciplinas
};

function Home() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [allDisciplinas, setAllDisciplinas] = useState<Disciplina[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurso, setSelectedCurso] = useState<string>("select");
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("");

  const urlCurso =
    "https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/curso";
  const urlDisciplina =
    "https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/disciplinas_por_curso/";

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const resposta = await fetch(urlCurso);
        if (!resposta.ok) {
          throw new Error(`Erro ao Buscar Cursos: ${resposta.statusText}`);
        }
        const cursosData = await resposta.json();
        const cursos = cursosData.data || [];
        setCursos(cursos);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Erro ao buscar cursos: ${error.message}`);
        } else {
          setError(`Erro ao buscar cursos.`);
        }
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch(`${urlDisciplina}${selectedCurso}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar disciplinas: ${response.statusText}`);
        } else {
          const data = await response.json();
          setDisciplinas(data.data || []);
          setAllDisciplinas(data.data || []);
          setError(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(`Erro ao tentar acessar as disciplinas: ${error.message}`);
        } else {
          setError(`Erro ao tentar acessar as disciplinas.`);
        }
      }
    };

    if (selectedCurso !== "select") {
      fetchDisciplinas();
    }
  }, [selectedCurso]);

  const handleSelectCurso = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue !== "select") {
      setSelectedCurso(selectedValue);
      setSelectedPeriodo(""); // Limpa o período selecionado ao trocar de curso
    } else {
      setDisciplinas([]);
      setError(null);
      setSelectedPeriodo("");
    }
  };

  const handleSelectPeriodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedPeriodo(selectedValue);
    // Restaurar as disciplinas originais quando o filtro for desmarcado
    if (selectedValue === "") {
      setDisciplinas(allDisciplinas);
    } else {
      // Filtrar as disciplinas de acordo com o período selecionado
      const filteredDisciplinas = allDisciplinas.filter(
        (disciplina) => disciplina.in_periodo == selectedValue
      );
      setDisciplinas(filteredDisciplinas);
    }
  };

  return (
    <>
      <h1>MESTRE DETALHE: DISCIPLINA X CURSO</h1>
      {error && <p>{error}</p>}
      <section>
        <h2>CURSOS</h2>
        <select
          name="cursos"
          id="cursos"
          onChange={handleSelectCurso}
          value={selectedCurso}
        >
          <option value="select">-- SELECT --</option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso.id_curso}>
              {curso.tx_descricao}
            </option>
          ))}
        </select>
        <h2>PERÍODO</h2>
        <select
          name="periodo"
          id="periodo"
          onChange={handleSelectPeriodo}
          value={selectedPeriodo}
        >
          <option value="">-- TODOS --</option>
          {disciplinas.length > 0 && (
            Array.from(new Set(disciplinas.map((disciplina) => disciplina.in_periodo)))
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map((periodo, index) => (
                <option key={index} value={periodo}>
                  {`${periodo}º Período`}
                </option>
              ))
          )}
        </select>
      </section>
      <Tabela disciplinas={disciplinas} />
      <FloatingText />
    </>
  );
}

export default Home;
