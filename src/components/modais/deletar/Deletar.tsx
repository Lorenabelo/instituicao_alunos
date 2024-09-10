import { useContext } from 'react';
import { AlunoContext } from '../../../contexts/AlunoContext';
import { Aluno } from '../../../contexts/AlunoContext';
import { toast } from 'react-toastify';

interface DeletarAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: Aluno;
}

const DeletarAlunoModal = ({ isOpen, onClose, aluno }: DeletarAlunoModalProps) => {
  const { deletarAluno } = useContext(AlunoContext);

  if (!isOpen) return null;

  const handleConfirmarDelecao = async () => {
    try {
      await deletarAluno(aluno.id);
      toast.success('Aluno deletado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      toast.error('Erro ao deletar o aluno!', {
        position: "top-right",
        autoClose: 5000,
      });
    }
    onClose();
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Deletar Aluno</h2>
        <p className="mb-6">Você tem certeza que deseja deletar o(a) aluno(a) <strong>{aluno.nomeCompleto}</strong>?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmarDelecao}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletarAlunoModal;
