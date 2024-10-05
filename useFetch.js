import React, { useEffect, useState } from 'react'

const localCache = { };

export const useFetch = ( url ) => {
  
    const initialState = {
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    }

    const [state, setState] = useState( initialState );

    useEffect(() => {

        getFetch();

    }, [ url ]);

    const setLoadingState = () => {

        setState( initialState );

    }

    const getFetch = async() => {

        if(localCache[url]){
             
            console.log('Usando caché');

            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });

            return;
        }

        setLoadingState();

        const resp = await fetch( url );

        await new Promise( resolve => setTimeout(resolve, 500));

        if(!resp.ok){

            setState({
                data: null,
                isLoading: true,
                hasError: false,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });

            return;

        }

        const data = await resp.json();

        setState( {
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        });

        //Manejo del caché
        localCache[url] = data;

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }

}
