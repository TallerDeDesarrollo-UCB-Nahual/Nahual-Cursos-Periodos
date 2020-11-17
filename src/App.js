import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Periodos from "./components/periodos";
import NuevoPeriodo from "./components/crearperiodo";
import EditarPeriodo from "./components/editarperiodo";
import Formulario_inscrites from './components/inscripcion/Formulario_inscripcion';
import Navbar from './components/inscripcion/navbar/navbar.js';
import Listar_Modulos from './components/inscripcion/listar_modulos';
import ListaPreinscriptes from './components/Preinscriptes/ListaPreinscriptes';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-less/semantic.less'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/periodos">
            <Periodos />
          </Route>
          <Route exact path="/formulario-registro-periodo">
            <NuevoPeriodo />
          </Route>
          <Route path="/periodos/:id" children={<EditarPeriodo />} />
          <Container>
            <Route path="/" exact component={Listar_Modulos} />
            <Route exact path="/formulario" render={ (props) =>(
                <React.Fragment>   
                <Formulario_inscrites {...props} />
                </React.Fragment>
              )}/>
            <Route exact path="/lista-preinscriptes" render={ (props) =>(
                <React.Fragment>
                  <ListaPreinscriptes/>
                </React.Fragment>
            )}/>
          </Container>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
