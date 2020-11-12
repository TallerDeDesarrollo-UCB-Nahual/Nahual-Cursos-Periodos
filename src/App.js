import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Formulario_inscrites from './components/inscripcion/Formulario_inscripcion';
import Navbar from './components/inscripcion/navbar/navbar.js';
import Titulo_Inscripcion from './components/inscripcion/titulo_inscripcion.js';

function App() {
  return (
    <div>
        <Navbar/>
        <Router>
        <Route path="/formulario" exact component={Formulario_inscrites} />
        <Route exact path="/form" render={ (props) =>(
            <React.Fragment>   
            <Titulo_Inscripcion/> 
            <Formulario_inscrites {...props} />
            </React.Fragment>
          )}/>
        </Router>

    </div>
  );
}

export default App;
