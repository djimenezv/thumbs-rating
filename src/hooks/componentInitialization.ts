import * as React from 'react';
import { LOAD } from "../actions/ruleOfThumbs";
import { LOCAL_STORAGE_KEY } from "../constants/localStorage";
import { initialState, reducer } from "../reducers/rule-of-thumb";
import useReducerWithMiddleware from "./reducerWithMiddleware";
import useSaveState from "./saveState";
import {data} from '../assets/data.json';
import { getStoredValue } from '../helpers/storageHelper';

export const useInitComponent = () => {

    const localStorageState = getStoredValue(LOCAL_STORAGE_KEY);
    const [saveStateMiddleware] = useSaveState(LOCAL_STORAGE_KEY);
    const [state, dispatch] = useReducerWithMiddleware(reducer, initialState, saveStateMiddleware);
    React.useEffect(() => {
        const stateStorage = localStorageState ? JSON.parse(localStorageState) : '';
        const currentState = stateStorage.items && stateStorage.items.length 
                                            ? addStatePropertiesToState(stateStorage.items) 
                                            : addStatePropertiesToState(data);
        dispatch(LOAD(currentState));
    },[]);
    return [state, dispatch];

}

const addStatePropertiesToState = (state:any) => {
    return state && state.length
        ? state.map((item:any, i: number) => ({
                ...item,
                vote : null,
                id: i
            }))
        :[];
}