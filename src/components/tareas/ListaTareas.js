import React, {Fragment, useContext} from "react"
import Tareas from "../tareas/Tareas"
import proyectoContext from '../../contexts/proyectos/proyectoContext'
import TareaContext from '../../contexts/tareas/tareaContext'
import {CSSTransition, TransitionGroup} from "react-transition-group"

const ListaTareas = () => {

    // extrae el proyecto del state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} =  proyectosContext;

    // extrae las tareas del state principal
    const tareasContext = useContext(TareaContext);
    const {tareasProyecto} = tareasContext;

    //si no hay ningún proyecto seleccionado
    if(!proyecto){return <h2>Seleccione un Proyecto</h2>}

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //const tareasProyecto = [];

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ? (<li className="tarea"><p>No Hay Tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tareasProyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tareas 
                                    key={tarea._id}
                                    tarea = {tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar btn-primario"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    )
}

export default ListaTareas;