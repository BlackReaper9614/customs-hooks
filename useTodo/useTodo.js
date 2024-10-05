import { todoReducer } from "../08-useReducer/todoReducer";
import { useReducer, useEffect } from "react";

export const useTodo = () => {

    const init = () => {

        return JSON.parse( localStorage.getItem('todos')) || [];
    
    }

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        
        localStorage.setItem('todos', JSON.stringify( todos ));

    }, [todos])//Nombre de la variable sobre la que se aplicara el efecto si se detectan cambios

    const handleNewTodo = ( todo ) => {

        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch(action);

    }

    const handleDeleteTodo = (id) => {

        const action = {
            type: '[TODO] Remove Todo',
            payload: id,
        }

        dispatch(action);

    }

    const handleToggleTodo = (id) => {

        const action = {
            type: '[TODO] Toggle Todo',
            payload: id,
        }

        dispatch(action);

    }

    return {

        todos,
        handleNewTodo,
        handleToggleTodo,
        handleDeleteTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done == true).length
    }

}