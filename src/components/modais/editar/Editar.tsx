import { useContext, useEffect, useState } from 'react';
import { AlunoContext } from '../../../contexts/AlunoContext';
import { Aluno } from '../../../contexts/AlunoContext';
import { toast } from 'react-toastify';

interface EditarAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: Aluno;
}

const EditarAlunoModal = ({ isOpen, onClose, aluno }: EditarAlunoModalProps) => {
  const { atualizarAluno } = useContext(AlunoContext);

  const [nomeCompleto, setNomeCompleto] = useState(aluno.nomeCompleto);
  const [idade, setIdade] = useState<string | number>(aluno.idade);
  const [notaSemestre1, setNotaSemestre1] = useState<string | number>(aluno.notaSemestre1);
  const [notaSemestre2, setNotaSemestre2] = useState<string | number>(aluno.notaSemestre2);

  const [errors, setErrors] = useState<{ nomeCompleto?: string; idade?: string; notaSemestre1?: string; notaSemestre2?: string }>({});

  useEffect(() => {
    setNomeCompleto(aluno.nomeCompleto);
    setIdade(aluno.idade);
    setNotaSemestre1(aluno.notaSemestre1);
    setNotaSemestre2(aluno.notaSemestre2);
  }, [aluno, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const validationErrors: { nomeCompleto?: string; idade?: string; notaSemestre1?: string; notaSemestre2?: string } = {};

    if (!nomeCompleto) validationErrors.nomeCompleto = 'Nome completo é obrigatório';
    if (!idade) validationErrors.idade = 'Idade é obrigatória';
    if (!notaSemestre1) validationErrors.notaSemestre1 = 'Nota do Semestre 1 é obrigatória';
    if (!notaSemestre2) validationErrors.notaSemestre2 = 'Nota do Semestre 2 é obrigatória';

    return validationErrors;
  };

  const handleSalvar = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const alunoAtualizado = {
      nomeCompleto,
      idade: idade !== "" ? Number(idade) : 0,
      notaSemestre1: notaSemestre1 !== "" ? Number(notaSemestre1) : 0,
      notaSemestre2: notaSemestre2 !== "" ? Number(notaSemestre2) : 0,
      mediaFinal: (Number(notaSemestre1) + Number(notaSemestre2)) / 2,
    };

    try {
      atualizarAluno(aluno.id, alunoAtualizado);
      toast.success('Aluno atualizado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
      });
      onClose();
    } catch {
      toast.error('Erro ao atualizar o aluno!', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleCancelar = () => {
    setNomeCompleto(aluno.nomeCompleto);
    setIdade(aluno.idade);
    setNotaSemestre1(aluno.notaSemestre1);
    setNotaSemestre2(aluno.notaSemestre2);
    onClose();
  };

  const handleNomeCompletoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeCompleto(e.target.value);
    if (errors.nomeCompleto) {
      setErrors((prev) => ({ ...prev, nomeCompleto: undefined }));
    }
  };

  const handleIdadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdade(value === "" ? "" : Number(value));
    if (errors.idade) {
      setErrors((prev) => ({ ...prev, idade: undefined }));
    }
  };

  const handleNotaSemestre1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotaSemestre1(value === "" ? "" : Number(value));
    if (errors.notaSemestre1) {
      setErrors((prev) => ({ ...prev, notaSemestre1: undefined }));
    }
  };

  const handleNotaSemestre2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotaSemestre2(value === "" ? "" : Number(value));
    if (errors.notaSemestre2) {
      setErrors((prev) => ({ ...prev, notaSemestre2: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Editar Aluno</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nome Completo</label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={handleNomeCompletoChange}
              placeholder="Nome Completo"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nomeCompleto && <p className="text-red-500 text-sm">{errors.nomeCompleto}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Idade</label>
            <input
              type="number"
              value={idade === 0 ? "" : idade}
              onChange={handleIdadeChange}
              placeholder="Idade"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.idade && <p className="text-red-500 text-sm">{errors.idade}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nota Semestre 1</label>
            <input
              type="number"
              value={notaSemestre1 === 0 ? "" : notaSemestre1}
              onChange={handleNotaSemestre1Change}
              placeholder="Nota Semestre 1"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.notaSemestre1 && <p className="text-red-500 text-sm">{errors.notaSemestre1}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nota Semestre 2</label>
            <input
              type="number"
              value={notaSemestre2 === 0 ? "" : notaSemestre2}
              onChange={handleNotaSemestre2Change}
              placeholder="Nota Semestre 2"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.notaSemestre2 && <p className="text-red-500 text-sm">{errors.notaSemestre2}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancelar}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSalvar}
              className="bg-cyan-800 text-white px-4 py-2 rounded-md hover:bg-cyan-900"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAlunoModal;
