import React, {useEffect, useRef} from 'react';

const useDebounce = ({callback, timeout = 800, value, onEmpty}) => {
    const timer = useRef(null);


    useEffect(() => {
        clearTimeout(timer.current)
        if (value) {
            timer.current = setTimeout(() => {
                callback();
            }, timeout)
        } else {
            onEmpty()
        }
    }, [value])
};

export default useDebounce;