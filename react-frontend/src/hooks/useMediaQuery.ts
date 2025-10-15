import { useState, useEffect } from "react";



export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {

        if (typeof window === 'undefined') {
            return;
        }

        const screen = window.matchMedia(query);

        const listeningFunction = () => {
            setMatches(screen.matches);
        }

        listeningFunction();

        screen.addEventListener('change', listeningFunction);

        return () => screen.removeEventListener('change', listeningFunction);


    }, [query]);



    return matches;

}