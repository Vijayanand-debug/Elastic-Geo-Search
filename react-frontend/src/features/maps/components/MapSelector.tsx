import AutocompleteLayout from "@/app/layouts/AutocompleteLayout";
import { useUI } from "@/context/UIContext";
import { setMap, setUserLocation } from "@/features/location/locationSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

const containerStyle = {
    width: "100%",
    height: "100vh"

}

const libraries: ("places")[] = ["places"];

export default function MapSelector() {
    const dispatch = useDispatch<AppDispatch>();
    const location = useSelector((state: RootState) => state.location);
    const { closeModal } = useUI();
    const center = { lat: location.map.lat!, lng: location.map.lng!, place: location.map.place! };

    // caching the map loader api call to avoid reloading it on every call
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API,
        libraries
    })

    const mapOptions = {
        cameraControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        zoom: 14,
        maxZoom: 14,
        minZoom: 9
    }

    // preloader for map
    if (!isLoaded) return <p>Loading map... </p>

    const alignMapView = ({ lat, lng }: { lat: number, lng: number }) => {
        // reverse geocoding
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results && results[0]) {
                dispatch(setMap({ lat, lng, place: results[0].formatted_address }));
            } else {
                dispatch(setMap({ lat, lng, place: "DUBLIN CITY CENTRE, IRELAND." }));
            }
        });
    }

    const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        alignMapView({ lat, lng });
    }

    const confirmLocation = () => {
        dispatch(setUserLocation(location.map));
        closeModal();
    }


    return (
        <>
            <section className="fixed top-0 w-full max-w-[1200px] bg-[#1F2937] shadow-lg shadow-[#1F2937] p-5 z-99 rounded-[0px_0px_5px_5px]">
                <AutocompleteLayout />
            </section>

            <GoogleMap
                center={center}
                mapContainerStyle={containerStyle}
                options={mapOptions}
            >
                <Marker
                    position={center}
                    draggable={true}
                    onDragEnd={handleDragEnd}
                />
            </GoogleMap>

            <section className="absolute bottom-2.5 inset-x-2.5 h-[180px] p-[30px] bg-[#1F2937] rounded-[5px] text-white text-center md:inset-x-1/4 md:h-[150px]">
                <div>
                    <span>{center.place}</span>
                </div>
                <button
                    className="block bg-[#fff] p-3 text-[black] rounded-[10px] mt-3 w-full mx-auto md:w-[150px] cursor-pointer"
                    onClick={confirmLocation}
                >
                    Confirm Location
                </button>
            </section>
        </>

    )
}