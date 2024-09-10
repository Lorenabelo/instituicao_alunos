import { useContext, useMemo, useState } from 'react';
import { Aluno, AlunoContext } from '../../../contexts/AlunoContext';
import { Link } from 'react-router-dom';
import EditarAlunoModal from '../../modais/editar/Editar';
import DeletarAlunoModal from '../../modais/deletar/Deletar';
import useDropdown from '../../../hooks/useDropdown';
import Dropdown from '../dropdown/Dropdown';

const ListarAlunos = () => {
  const { alunos } = useContext(AlunoContext);
  const { dropdownOpen, toggleDropdown, dropdownRefs } = useDropdown();
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
  const [isDeletarModalOpen, setIsDeletarModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const alunosFiltrados = useMemo(() => {
    if (!searchTerm) return alunos;
    return alunos.filter((aluno) =>
      aluno.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, alunos]);

  const abrirModalEditar = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setIsEditarModalOpen(true);
  };

  const abrirModalDeletar = (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setIsDeletarModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-8 p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Alunos</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Pesquisar aluno(a)..."
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/cadastrarAluno">
            <button className="bg-cyan-800 text-white px-4 py-2 rounded-md hover:bg-cyan-900">
              Cadastrar Aluno
            </button>
          </Link>
        </div>
      </div>

      {(!alunos || alunos.length === 0) ? (
        <p>{alunos.length === 0 ? 'Não há alunos cadastrados.' : 'Carregando alunos...'}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2 text-center">Idade</th>
              <th className="px-4 py-2 text-center">Nota Semestre 1</th>
              <th className="px-4 py-2 text-center">Nota Semestre 2</th>
              <th className="px-4 py-2 text-center">Média Final</th>
              <th className="px-4 py-2 text-center">Opções</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno) => (
              <tr key={aluno.id} className="border-b">
                <td className="px-4 py-2">{aluno.nomeCompleto}</td>
                <td className="px-4 py-2 text-center">{aluno.idade}</td>
                <td className="px-4 py-2 text-center">{aluno.notaSemestre1}</td>
                <td className="px-4 py-2 text-center">{aluno.notaSemestre2}</td>
                <td className="px-4 py-2 text-center">{aluno.mediaFinal}</td>
                <td className="px-4 py-2 text-center">
                  <div className="relative" ref={(el) => (dropdownRefs.current[aluno.id] = el)}>
                    <button
                      onClick={() => toggleDropdown(aluno.id)}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                    >
                      ⋮
                    </button>
                    {dropdownOpen === aluno.id && (
                      <Dropdown
                        onEdit={() => abrirModalEditar(aluno)}
                        onDelete={() => abrirModalDeletar(aluno)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      {alunoSelecionado && (
        <EditarAlunoModal
          isOpen={isEditarModalOpen}
          onClose={() => setIsEditarModalOpen(false)}
          aluno={alunoSelecionado}
        />
      )}


      {alunoSelecionado && (
        <DeletarAlunoModal
          isOpen={isDeletarModalOpen}
          onClose={() => setIsDeletarModalOpen(false)}
          aluno={alunoSelecionado}
        />
      )}
    </div>
  );
};

export default ListarAlunos;
