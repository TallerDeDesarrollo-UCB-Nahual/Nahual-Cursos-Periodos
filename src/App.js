import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Formulario_inscrites from './components/inscripcion/Formulario_inscripcion';
import Navbar from './components/inscripcion/navbar/navbar.js';
import Titulo_Inscripcion from './components/inscripcion/titulo_inscripcion.js';
import Listar_Modulos from './components/inscripcion/listar_modulos';
import CrearCurso from './components/cursos/crear_curso';
import ListarPeriodos from './components/periodos/ListarPeriodos';

function App() {
  return (
    <div>
        <Navbar/>
        <Router>
        <Route path="/" exact component={Listar_Modulos} />
        <Route exact path="/formulario/:nombre" render={ (props) =>(
            <React.Fragment>   
            <Titulo_Inscripcion/> 
            <Formulario_inscrites {...props} />
            </React.Fragment>
          )}/>
        <Route path="/crearCurso" exact component={CrearCurso} />
        <Route path="/listarPeriodos" exact component={ListarPeriodos} />
        </Router>

    </div>
  );
}

export default App;
