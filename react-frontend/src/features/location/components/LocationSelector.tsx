import { IoLocationSharp } from "react-icons/io5";
import Modal from "@/components/Modal";
import MapSelector from "@/features/maps/components/MapSelector";
import { useUI } from "@/context/UIContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { setMap } from "../locationSlice";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function LocationSelector() {

    const { openModal } = useUI();
    const dispatch = useDispatch<AppDispatch>();
    const userLocation = useSelector((state: RootState) => state.location.userLocation);
    const isMediumScreen = useMediaQuery('(min-width: 768px)');
    const maxLocationStringLen = isMediumScreen ? 28 : 40;

    useEffect(() => {
        if (userLocation.lat && userLocation.lng && userLocation.place) {
            dispatch(setMap(userLocation));
        }
    }, [userLocation, dispatch])

    return (
        <>
            <section
                className="w-full order-2 py-5 px-1 text-white border-t-white border-solid border-t text-center md:order-1 md:w-[300px] md:border-none md:grow[1] cursor-pointer"
                onClick={() => openModal()}
            >
                <IoLocationSharp className="inline" size={"24px"} color={"#fff"} />
                <h5 className="inline pt-2 md:text-sm" >{userLocation.place ? (userLocation.place.slice(0, maxLocationStringLen)) + "..." : "Select Location"} </h5>
            </section >

            <Modal>
                <MapSelector />
            </Modal>

        </>
    );
}