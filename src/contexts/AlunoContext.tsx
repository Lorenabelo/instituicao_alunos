import { createContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { AlunoService } from '../services/alunoService';

export interface Aluno {
  id: number;
  nomeCompleto: string;
  idade: number;
  notaSemestre1: number;
  notaSemestre2: number;
  mediaFinal: number;
}

interface AlunoContextData {
  alunos: Aluno[];
  carregarAlunos: () => void;
  criarAluno: (aluno: Omit<Aluno, 'id'>) => void;
  atualizarAluno: (id: number, aluno: Omit<Aluno, 'id'>) => void;
  deletarAluno: (id: number) => void;
}

export const AlunoContext = createContext<AlunoContextData>({} as AlunoContextData);

export function AlunoProvider({ children }: { children: ReactNode }) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const carregarAlunos = useCallback(async () => {
    try {
      const response = await AlunoService.carregarAlunos();
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  }, []);

  useEffect(() => {
    carregarAlunos();
  }, [carregarAlunos]);

  const criarAluno = useCallback(async (aluno: Omit<Aluno, 'id'>) => {
    try {
      await AlunoService.criarAluno(aluno);
      carregarAlunos();
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      throw error;
    }
  }, [carregarAlunos]);

  const atualizarAluno = useCallback(async (id: number, aluno: Omit<Aluno, 'id'>) => {
    try {
      await AlunoService.atualizarAluno(id, aluno);
      carregarAlunos();
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  }, [carregarAlunos]);

  const deletarAluno = useCallback(async (id: number) => {
    try {
      await AlunoService.deletarAluno(id);
      carregarAlunos();
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  }, [carregarAlunos]);

  const value = useMemo(() => ({
    alunos,
    carregarAlunos,
    criarAluno,
    atualizarAluno,
    deletarAluno
  }), [alunos, carregarAlunos, criarAluno, atualizarAluno, deletarAluno]);

  return (
    <AlunoContext.Provider value={value}>
      {children}
    </AlunoContext.Provider>
  );
}
