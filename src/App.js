import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './contexts/proyectos/proyectoState';
import TareaState from './contexts/tareas/tareaState';
import AlertaState from './contexts/alertas/alertaState';
import AuthState from './contexts/auth/authState';
import TokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/rutaPrivada';

//Revizar si hay un token activo
const token = localStorage.getItem('token')
if(token){
  TokenAuth(token)
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
