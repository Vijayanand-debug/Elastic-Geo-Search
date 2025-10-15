import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 500) => {

    const [debouncedVal, setDebouncedVal] = useState<string>(value);

    useEffect(() => {
        const timeInterval = setTimeout(() => {
            setDebouncedVal(value);
        }, delay);

        return () => clearTimeout(timeInterval);
    }, [value, delay]);

    return debouncedVal;
}