import { useUI } from "@/context/UIContext";
import AutocompleteInput from "@/features/maps/components/AutocompleteInput";
import { IoMdArrowBack } from "react-icons/io";

export default function AutocompleteLayout() {

    const { closeModal } = useUI();

    return (
        <>
            <section className="flex items-center">
                <IoMdArrowBack className="absolute left-[10px] cursor-pointer" color="white" fontSize={25} onClick={() => closeModal()} />
                <div className="flex-1 flex justify-center">
                    <AutocompleteInput />
                </div>
            </section>
        </>
    )
}