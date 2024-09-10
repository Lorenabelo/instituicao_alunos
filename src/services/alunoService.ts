import axios from 'axios';
import { Aluno } from '../contexts/AlunoContext';

const apiUrl = 'https://instituicao-alunos-back.onrender.com/api/alunos';

export const AlunoService = {
  carregarAlunos: async () => {
    try {
      return await axios.get(apiUrl);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  },

  criarAluno: async (aluno: Omit<Aluno, 'id'>) => {
    try {
      return await axios.post(apiUrl, aluno);
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  },

  atualizarAluno: async (id: number, aluno: Omit<Aluno, 'id'>) => {
    try {
      return await axios.put(`${apiUrl}/${id}`, aluno);
    } catch (error) {
      console.error(`Erro ao atualizar o aluno com id ${id}:`, error);
    }
  },

  deletarAluno: async (id: number) => {
    try {
      return await axios.delete(`${apiUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar o aluno com id ${id}:`, error);
    }
  }
};
