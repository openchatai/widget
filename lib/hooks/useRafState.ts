// stolen haha
// https://github.com/streamich/react-use/blob/master/src/useRafState.ts
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { useUnmount } from './useUnmount';


const useRafState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
    const frame = useRef(0);
    const [state, _setState] = useState(initialState);


    const setState = useCallback((value: S | ((prevState: S) => S)) => {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            setState(value);
        });
    }, [])

    useUnmount(() => {
        cancelAnimationFrame(frame.current);
    })

    return [
        state,
        setState
    ]
}


export {
    useRafState
}