import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import AlertaContext from "../../contexts/alertas/alertaContext";


const Login = (props) => {


    //extraemos el metodo de iniciarSesion del context authContext
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;
    
    //extraemos state de alerta del Alertacontext
    const alertContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertContext;

    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje,autenticado,props.history])

    //state para los datos de login
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    //extraemos datos del usuario
    const {email, password} = usuario;


    const onChange = (e) => {
        e.preventDefault();
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validamos datos
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return null;
        }

        //pasamos al action
        iniciarSesion({email, password})

    }

    const limpiar = () => {
        mensaje.categoria = ''
        mensaje.msg = ''    
        //console.log(mensaje)
    }

    return (
        <div className="form-usuario">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.mgs} </div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={onSubmit}>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <button type="submit" className="btn btn-primario btn-block">Iniciar Sesión</button>
                    </div>
                </form>

                <div>
                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                        Abrir Nueva Cuenta.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;