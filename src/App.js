import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Periodos from "./components/periodos";
import NuevoPeriodo from "./components/crearperiodo";
import EditarPeriodo from "./components/editarperiodo";
import ListaPreinscriptes from './components/Preinscriptes/ListaPreinscriptes';
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
            <Route exact path="/lista-preinscriptes" component={ListaPreinscriptes}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
