import { useContext, useState } from 'react';
import { AlunoContext } from '../../../contexts/AlunoContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

export function FormAluno() {
  const { criarAluno } = useContext(AlunoContext);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [errors, setErrors] = useState<{ nome?: string; idade?: string; nota1?: string; nota2?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      await criarAluno({
        nomeCompleto: nome,
        idade: Number(idade),
        notaSemestre1: Number(nota1),
        notaSemestre2: Number(nota2),
        mediaFinal: (Number(nota1) + Number(nota2)) / 2,
      });
  
      toast.success('Aluno cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
      });
  
      navigate('/');
    } catch {
      toast.error('Erro ao cadastrar o aluno. Verifique sua conexão ou tente novamente mais tarde.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };  

  const validateForm = () => {
    const newErrors: { nome?: string; idade?: string; nota1?: string; nota2?: string } = {};
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!idade) newErrors.idade = 'Idade é obrigatória';
    if (!nota1) newErrors.nota1 = 'Nota Semestre 1 é obrigatória';
    if (!nota2) newErrors.nota2 = 'Nota Semestre 2 é obrigatória';
    return newErrors;
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    if (errors.nome) {
      setErrors((prev) => ({ ...prev, nome: undefined }));
    }
  };

  const handleIdadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '') {
      setIdade(value);
      if (errors.idade) {
        setErrors((prev) => ({ ...prev, idade: undefined }));
      }
    }
  };

  const handleNota1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '') {
      setNota1(value);
      if (errors.nota1) {
        setErrors((prev) => ({ ...prev, nota1: undefined }));
      }
    }
  };

  const handleNota2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '') {
      setNota2(value);
      if (errors.nota2) {
        setErrors((prev) => ({ ...prev, nota2: undefined }));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <button onClick={() => navigate('/')} className="flex items-center text-cyan-800 mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-2 text-cyan-800" />
        Voltar
      </button>

      <h2 className="text-2xl font-semibold mb-6">Cadastrar Aluno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={handleNomeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Idade</label>
          <input
            type="text"
            placeholder="Idade"
            value={idade}
            onChange={handleIdadeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.idade && <p className="text-red-500 text-sm">{errors.idade}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nota Semestre 1</label>
          <input
            type="text"
            placeholder="Nota Semestre 1"
            value={nota1}
            onChange={handleNota1Change}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nota1 && <p className="text-red-500 text-sm">{errors.nota1}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nota Semestre 2</label>
          <input
            type="text"
            placeholder="Nota Semestre 2"
            value={nota2}
            onChange={handleNota2Change}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nota2 && <p className="text-red-500 text-sm">{errors.nota2}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
