import { TAREAS_PROYECTO, AGREGAR_TAREAS, ERROR_TAREAS, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA,
         ELIMINAR_SELECCION} from "../../types";


export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto : action.payload
            }

        case AGREGAR_TAREAS:
            return {
                ...state,
                tareasProyecto : [action.payload, ...state.tareasProyecto],
                error : false
            }

        case ERROR_TAREAS:
            return {
                ...state,
                error : true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
            }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada : action.payload
            }

        case ELIMINAR_SELECCION:
            return {
                ...state,
                tareaseleccionada : null
            }
        default:
            return state;
    }
}