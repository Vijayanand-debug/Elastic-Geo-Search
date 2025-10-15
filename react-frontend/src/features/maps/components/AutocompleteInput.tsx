import { setMap } from "@/features/location/locationSlice";
import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function AutocompleteInput() {

    const dispatch = useDispatch();
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    }

    const handlePlaceChanged = () => {
        if (!autocompleteRef.current) return;
        const foundLocation = autocompleteRef.current.getPlace();

        if (foundLocation.geometry && foundLocation.geometry.location) {
            const lat = foundLocation.geometry.location.lat();
            const lng = foundLocation.geometry.location.lng();
            const place = foundLocation.formatted_address || foundLocation.name || "";

            dispatch(setMap({ lat, lng, place }));
        }
    }

    return (
        <>
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                <input
                    type="search"
                    className="block p-2.5 w-[300px] z-20 text-sm text-gray-900 bg-[white] rounded-[8px] dark:placeholder-gray-700 dark:text-gray-700 md:w-[700px]"
                    placeholder="Enter a city or town in Ireland..."
                />
            </Autocomplete>
        </>
    )

}