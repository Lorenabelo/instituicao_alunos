import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormAluno } from "./components/alunos/formalunos/FormAlunos";
import ListarAlunos from "./components/alunos/listaralunos/ListarAlunos";
import { AlunoProvider } from "./contexts/AlunoContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AlunoProvider>
        <main>
          <h1 className="bg-cyan-800 p-10 text-2xl text-white">Instituição de Ensino</h1>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ListarAlunos />} />
              <Route path="/cadastrarAluno" element={<FormAluno />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </main>
      </AlunoProvider>
    </>
  )
}
export default App
