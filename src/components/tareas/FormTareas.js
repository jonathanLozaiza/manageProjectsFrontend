import React, {useContext, useState, useEffect} from "react"
import proyectoContext from "../../contexts/proyectos/proyectoContext"
import TareaContext from '../../contexts/tareas/tareaContext'



const FormTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    // obtnemos la funcion agregarTareas del state inicial
    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada, error, obtenerTarea, agregarTareas, mostrarError, actualizarTarea, limpiarSeleccionado} = tareasContext;

    //Effect para tareas
    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre : '',
                estado : false
            })
        }
    },[tareaseleccionada])

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre : '',
        estado : false
    })

    //const {nombre} = tarea;

    if(!proyecto) return null;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // func para el onChange
    const actualizarNombreTarea = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // func para el submit
    const agregarTarea = e => {
        e.preventDefault();

        //validamos los datos
        if(tarea.nombre.trim() === ''){mostrarError(); return null}

        //agregamos la tarea
        //tarea.proyectoId = proyectoActual.id
        //agregarTareas(tarea);

        //si es edicion o si es nueva tarea
        if(tareaseleccionada === null){
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTareas(tarea)
        }else{
            //actualizar tarea existente
            actualizarTarea(tarea);

            //LIMPIAMOS LA TAREA SELECCIONADA
            limpiarSeleccionado();
        }

        //obtenemos y filtramos las tareas
        obtenerTarea(proyectoActual._id)

        //reiniciamos el formulario
        guardarTarea({
            nombre : '',
            estado : false
        })
    }

    return(
        <div className="formulario">
            <form onSubmit={agregarTarea}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value = {tarea.nombre}
                        onChange={actualizarNombreTarea}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form> 
            {error ? <p className="mensaje error">No hay datos</p> : null}
        </div>
    )
}

export default FormTareas;