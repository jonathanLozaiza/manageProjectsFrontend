import React, { useContext, useEffect } from "react"
import Proyecto from "./Proyecto"
import proyectoContext from "../../contexts/proyectos/proyectoContext"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import AlertaContext from '../../contexts/alertas/alertaContext'

const ListadoProyectos = () => {

    // Obtenemos el state de proyectos desde el context principal
    const proyectosContext = useContext(proyectoContext)
    const {proyectos, mensaje, obtenerProyectos} = proyectosContext;

    //extraemos los state de alertaContext
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    useEffect(()=>{

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje])

    //verificar si proytectos esta vacío
    if(proyectos.length===0) return <p>No hay proyectos, comienza creando uno.</p>;

    return (
        <ul className="listado-proyecto">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.mgs}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key = {proyecto._id}
                        timeout = {200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto = {proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos;