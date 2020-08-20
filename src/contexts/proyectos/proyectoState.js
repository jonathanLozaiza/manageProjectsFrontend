import React, {useReducer} from "react"
//import {v4 as uuid} from "uuid"; 
import proyectoContext from "./proyectoContext"
import proyectoReducer from "./proyectoReducer"
import {FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS, 
        AGREGAR_PROYECTO, 
        ERROR_PROYECTO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR} from "../../types"
import clienteAxios from "../../config/axios";

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario : false,
        proyecto : null,
        mensaje : null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type : FORMULARIO_PROYECTO
        })
    }

    //obtner los proyectos
    const obtenerProyectos = async () => {
        try{

            const resultado = await clienteAxios.get('/api/proyectos')
            //console.log(resultado)
            dispatch({
                type : OBTENER_PROYECTOS,
                payload : resultado.data
            })
        }catch(error){

            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
        
    }

    //agregar un nuevo proyecto
    const agregarProyecto = async (proyecto) => {

       try{

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            //console.log(resultado)

            //insertar el proyecto en el state
            dispatch({
                type : AGREGAR_PROYECTO,
                payload : resultado.data
            })
       }catch(error){

        const alerta = {
            msg : 'Hubo un error',
            categoria : 'alerta-error'
        }

        dispatch({
            type : PROYECTO_ERROR,
            payload : alerta
        })
    }
    }

    // mostrar error
    const mostrarError = () => {
        dispatch({
            type : ERROR_PROYECTO
        })
    }

    // proyecto actual cuando el usuario de clic en un proyecto
    const proyectoActual = proyectoId => {
        dispatch({
            type : PROYECTO_ACTUAL,
            payload : proyectoId
        })
    }

    // eliminar proyecto al pulsar el boton de eliminar
    const eliminarProyecto = async proyectoId => {
        try{

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)

            dispatch({
                type : ELIMINAR_PROYECTO,
                payload : proyectoId
            })
        }catch(error){

            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type : PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos : state.proyectos,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                proyecto : state.proyecto,
                mensaje : state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
