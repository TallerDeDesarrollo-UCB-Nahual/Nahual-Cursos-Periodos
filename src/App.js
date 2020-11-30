import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import Periodos from "./components/Periodos/periodos";
import NuevoPeriodo from "./components/Periodos/crearperiodo";
import EditarPeriodo from "./components/Periodos/editarperiodo";
import ListarNodos from "./components/Nodos/listarNodos";
import { Container } from "semantic-ui-react";
import ListaDeAlumnesPorCurso from "./components/Alumnes/ListaDeAlumnesPorCurso";
import ListaPreinscriptes from './components/Preinscriptes/ListaPreinscriptes';
import 'semantic-ui-less/semantic.less'
=======
import Periodos from "./components/periodos";
import NuevoPeriodo from "./components/crearperiodo";
import EditarPeriodo from "./components/editarperiodo";
import { Container } from "semantic-ui-react";
import ListaDeAlumnesPorCurso from "./components/Alumnes/ListaDeAlumnesPorCurso";
import Encabezado from "./components/Layouts/Encabezado";
>>>>>>> Se agrego la barra de navegacion para cursos

function App() {
  return (
    <Container>
      <Encabezado/>
      <Router>
        <div>
          <Switch>
            <Route exact path="/periodos">
              <Periodos />
            </Route>
            <Route exact path="/nodos">
              <ListarNodos />
            </Route>
            <Route exact path="/formulario-registro-periodo">
              <NuevoPeriodo />
            </Route>
            <Route path="/periodos/:id" children={<EditarPeriodo />} />
            <Route exact path="/lista-preinscriptes" component={ListaPreinscriptes}/>
            <Route exact path="/alumnes">
              <ListaDeAlumnesPorCurso />
            </Route>
            <Route path="/">
              <h3 style={{textAlign:"center"}}>No disponible en este momento</h3>
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
