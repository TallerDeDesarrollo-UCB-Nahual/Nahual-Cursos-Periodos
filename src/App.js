import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Periodos from "./components/Periodos/periodos";
import NuevoPeriodo from "./components/Periodos/crearperiodo";
import EditarPeriodo from "./components/Periodos/editarperiodo";
import ListarNodos from "./components/Nodos/listarNodos";
import { Container, Message, Icon } from "semantic-ui-react";
import ListaDeAlumnesPorCurso from "./components/Alumnes/ListaDeAlumnesPorCurso";
import ListaPreinscriptes from "./components/Preinscriptes/ListaPreinscriptes";
import Encabezado from "./components/Layouts/Encabezado";
import "semantic-ui-less/semantic.less";
import styles from "./styles.module.css";
import PieDePagina from "./components/Layouts/PieDePagina"
function App() {
  return (
    <div>
      <div id="mensaje-exito" className={styles.notificationMessage}>
        <Message icon color="green">
          <Icon name="check" />
          <Message.Content>
            <Message.Header>
              <p id="mensaje-exito-title"></p>
            </Message.Header>
            <p id="mensaje-exito-description"></p>
          </Message.Content>
        </Message>
      </div>
      <div id="mensaje-error" className={styles.notificationMessage}>
        <Message icon color="red">
          <Icon name="times circle outline" />
          <Message.Content>
            <Message.Header>
              <p id="mensaje-error-title"></p>
            </Message.Header>
            <p id="mensaje-error-description"></p>
          </Message.Content>
        </Message>
      </div>
      <Container>
        <Encabezado />
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
              <Route
                exact
                path="/lista-preinscriptes"
                component={ListaPreinscriptes}
              />
              <Route exact path="/alumnes">
                <ListaDeAlumnesPorCurso />
              </Route>
              <Route path="/">
                <ListarNodos />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
      <PieDePagina/>
    </div>
  );
}

export default App;
