import React, {useReducer} from "react"
import AuthContext from './authContext'
import authReducer from './authReducer'
import clienteAxios from '../../config/axios'
import {REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION} from '../../types/index'
import TokenAuth from '../../config/tokenAuth'


const AuthState = props => {

    const initialState = {
        token : localStorage.getItem('token'),
        autenticado : null,
        usuario : null,
        mensaje : null,
        cargando : true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // registrar usuario
    const registrarUsuario = async datos => {
        try{
            const respuesta = await clienteAxios.post('/api/usuarios', datos) 
            //console.log(respuesta)
            dispatch({
                type : REGISTRO_EXITOSO,
                payload : respuesta.data
            })

            //obtener el usuario
            usuarioAutenticado();
        }catch(error){
            //console.log(error.response.data.msg)
            
            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }

            dispatch({
                type : REGISTRO_ERROR,
                payload : alerta
            })
        }
    }

    //Retorna el Usuario autenticado
    const usuarioAutenticado = async () => {
        //obtenemos el token del localStore
        const token = localStorage.getItem('token')

        if(token){
            TokenAuth(token)
        }

        try{
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log({respuesta})
            dispatch({
                type : OBTENER_USUARIO,
                payload : respuesta.data.usuario
            })
        }catch(error){
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    // cuando el usuario inicia sesion
    const iniciarSesion = async datos => {

        try{
            const respuesta = await clienteAxios.post('/api/auth', datos)
            dispatch({
                type : LOGIN_EXITOSO,
                payload : respuesta.data
            })

            //obtener el usuario
            usuarioAutenticado();

        }catch(error){
            //console.log(error.response.data.msg)
            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload : alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type : CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value = {{
                token : state.token,
                autenticado : state.autenticado,
                usuario : state.usuario,
                mensaje : state.mensaje,
                cargando : state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState