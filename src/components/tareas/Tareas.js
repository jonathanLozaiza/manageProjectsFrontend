import React, { useContext } from "react"
import proyectoContext from '../../contexts/proyectos/proyectoContext'
import TareaContext from '../../contexts/tareas/tareaContext'

const Tareas = ({tarea}) => {

    //extraemos el proyecto del state principal del context
    const proyectosContext = useContext(proyectoContext)
    const {proyecto} = proyectosContext;

    //extraemos la func eliminarTarea del state principal del context
    const tareasContext = useContext(TareaContext)
    const {eliminarTarea, obtenerTarea, actualizarTarea, tareaActual} = tareasContext;

    const [proyectoActual] = proyecto;

    //function para eliminar una tarea
    const eliminarTareaActual = id => {
        eliminarTarea(id);
        obtenerTarea(proyectoActual._id)
    }

    //cambiar estado de Incompleto a Completo o viceversa
    const actualizarEstado = tarea => {
        
        if(tarea.estado){
            tarea.estado = false;
        }else{tarea.estado = true}

        actualizarTarea(tarea);
        obtenerTarea(proyectoActual._id)
    }

    //seleccionar tarea
    const seleccionarTarea = tarea => {
        tareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => actualizarEstado(tarea)}
                        >
                            Completo
                        </button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => actualizarEstado(tarea)}
                        >
                            Incompleto
                        </button>
                    )

                }
            </div>

            <div className="acciones">

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => eliminarTareaActual(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    )
}

export default Tareas;