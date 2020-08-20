import React, {useEffect, useContext} from "react"
import Sidebar from "../layout/Sidebar"  
import Barra from "../layout/Barra"
import FormTarea from "../tareas/FormTareas"
import ListaTareas from "../tareas/ListaTareas"
import AuthContext from '../../contexts/auth/authContext'

const Proyectos = () => {

    //obtenemos la el usuario autenticado

    const authContext = useContext(AuthContext)
    const {usuarioAutenticado} = authContext

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return(
        <div className="contenedor-app">

            <Sidebar />

            <div className="seccion-principal">
                <Barra />
                <main>

                    <FormTarea />

                    <div className="contenedor-tareas">
                        <ListaTareas />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos;