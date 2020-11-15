import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Periodos from "./components/periodos";
import NuevoPeriodo from "./components/crearperiodo";
import EditarPeriodo from "./components/editarperiodo";

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
          <Route path="/">no estas permitido</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
