import React, {Fragment, useState, useContext} from "react"
import proyectoContext from "../../contexts/proyectos/proyectoContext";

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    // state para el proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre : ''
    })

    const {nombre} = proyecto;

    // function for save info of the projects
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //function for get info to principal component
    const onSubmitProyecto = e => {
        e.preventDefault();

        //comprobar que los campos no esten vacios
        if(nombre.trim() === ''){ mostrarError(); return null;}

        //agregamos el proyecto
        agregarProyecto(proyecto)

        // resetear Proyecto
        guardarProyecto({
            nombre : ''
        })
    }

    //mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-primario btn-block" onClick={onClickFormulario}>
                Nuevo Proyecto
            </button>
        
            {formulario ? 
                <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />

                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
            </form>
            : null    
            }

            {errorformulario ? <p className="mensaje error">No hay datos</p> : null}
        </Fragment>
    )
}

export default NuevoProyecto;