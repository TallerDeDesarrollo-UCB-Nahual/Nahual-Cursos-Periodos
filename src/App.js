import logo from './logo.svg';
import './App.css';
import ListaCursos from './componentes/curso/lista-curso/ListaCursos'
import Navbar from './componentes/compartidos/Navbar';

function App() {
  return (
  	<div>
  	<Navbar/>
    <ListaCursos/>
    </div>
  );
}

export default App;
