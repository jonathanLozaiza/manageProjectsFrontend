import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import AlertaContext from '../../contexts/alertas/alertaContext'
import AuthContext from '../../contexts/auth/authContext'


const NuevaCuenta = (props) => {

    //extraemos state de alerta del Alertacontext
    const alertContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertContext;

    //extraemos la funcion registrarUsuario del authContext
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    //en caso de que el usuario se haya registrato o autenticado o sea un registro duplicado
    useEffect(()=> {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


    //state para los datos de login
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    //extraemos datos del usuario
    const {nombre, email, password, confirmar} = usuario;


    const onChange = (e) => {
        e.preventDefault();
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validar que no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return null;
        }

        //password minimo de seis caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de minimo 6 caracteres', 'alerta-error');
            return
        }

        //los dos password son iguales
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return
        }

        //pasar al action
        registrarUsuario({
            nombre,
            email,
            password
        })

    }

    return (
        <div className="form-usuario">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.mgs}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Registrar</h1>
                <form onSubmit={onSubmit}>

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repetir Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <button type="submit" className="btn btn-primario btn-block">Registrar</button>
                    </div>
                </form>

                <div>
                    <Link to={'/'} className="enlace-cuenta">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NuevaCuenta;