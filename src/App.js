import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Formulario_inscrites from './components/inscripcion/Formulario_inscripcion';
import Navbar from './components/inscripcion/navbar/navbar.js';
import Listar_Modulos from './components/inscripcion/listar_modulos';

function App() {
  return (
    <div>
        <Navbar/>
        <Router>
        <Route path="/" exact component={Listar_Modulos} />
        <Route exact path="/formulario/:nombre" render={ (props) =>(
            <React.Fragment>   
            <Formulario_inscrites {...props} />
            </React.Fragment>
          )}/>
        </Router>

    </div>
  );
}

export default App;
