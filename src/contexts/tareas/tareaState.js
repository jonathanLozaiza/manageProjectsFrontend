import React, {useReducer} from "react"
//import {v4 as uuid} from "uuid"
import TareaContext from "./tareaContext"
import tareaReducer from "./tareaReducer"
import {TAREAS_PROYECTO,
        AGREGAR_TAREAS,
        ERROR_TAREAS,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        ELIMINAR_SELECCION} from '../../types'
import clienteAxios from '../../config/axios'

const TareaState = (props) => {


    const initialState = {
        tareasProyecto : [],
        error : false,
        tareaseleccionada : null
    }


    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(tareaReducer, initialState);


    //crear las funciones


    //obtener las tareas de un proyecto
    const obtenerTarea = async proyecto => {
        try{

            const resultado = await clienteAxios.get('/api/tareas', {params : {proyecto}})
            //console.log(resultado.data)
            dispatch({
                type:TAREAS_PROYECTO,
                payload:resultado.data
            })
        }catch(error){
            console.log(error)
        }
    }

    //AGREGAR TAREAS
    const agregarTareas = async tarea => {

        try{

            const  resultado = await clienteAxios.post('/api/tareas', tarea)
            //console.log(resultado)
            dispatch({
                type:AGREGAR_TAREAS,
                payload: resultado.data
            })
        }catch(error){
            console.log(error);
        }

    }

    //ERROR al agregar una tarea
    const mostrarError = () => {
        dispatch({
            type : ERROR_TAREAS
        })
    }

    //ELIMINAR TAREA
    const eliminarTarea = async (id) => {
        try{

            await clienteAxios.delete(`/api/tareas/${id}`);

            dispatch({
            type : ELIMINAR_TAREA,
            payload : id
        })
        }catch(error){
            console.log(error)
        }
    }

    //seleccionar tarea actual
    const tareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //actualizar tarea
    const actualizarTarea = async tarea => {
        
        try{

            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            dispatch({
                type : ACTUALIZAR_TAREA,
                payload : resultado.data
            })
        }catch(error){
            console.log(error)
        }
    }

    //LIMPIAR LA TAREA SELECCIONADA
    const limpiarSeleccionado = () => {
        dispatch({
            type : ELIMINAR_SELECCION
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasProyecto : state.tareasProyecto,
                tareaseleccionada : state.tareaseleccionada,
                error : state.error,
                obtenerTarea,
                agregarTareas,
                mostrarError,
                eliminarTarea,
                tareaActual,
                actualizarTarea,
                limpiarSeleccionado 
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )


}

export default TareaState;