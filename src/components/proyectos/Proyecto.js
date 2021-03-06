import React, {useContext} from "react"
import proyectoContext from "../../contexts/proyectos/proyectoContext"
import tareaContext from "../../contexts/tareas/tareaContext"


const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {obtenerTarea} = tareasContext;

    // Funcion para agregar el proyecto actual
    const seleccionarProyecto = (id) => {
        proyectoActual(id); //fijar un proyecto actual
        obtenerTarea(id); // filtrar las tareas cuando se de click
    }

    return(
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id)}
            >
               {proyecto.nombre} 
            </button>
        </li>
    )
}

export default Proyecto;