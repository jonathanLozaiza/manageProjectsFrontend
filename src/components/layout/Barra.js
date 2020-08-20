import React, {useContext, useEffect} from "react"
import AuthContext from '../../contexts/auth/authContext'

const Barra = () => {

    const authContext = useContext(AuthContext)
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])

    return (
        <header className="app-header">
            {usuario ? 
            <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
            :
            null
            }
            
            <button
                className="btn btn-while cerrar-sesion"
                onClick={()=>cerrarSesion()}
            >
                Cerrar Sesión
            </button>
        </header>
    )
}

export default Barra;