import * as React from 'react';
import { State } from '../reducers/rule-of-thumb';


export const useReducerWithMiddleware = (reducer: (state:any, initialState:any) => any, initialState:State, middleware:any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => middleware(state),[state]);
    return [state, dispatch];
}

export default useReducerWithMiddleware;