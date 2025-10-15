import type { ReactNode } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useUI } from "@/context/UIContext";



export default function Modal({ children }: { children: ReactNode }) {
    const modalRoot = document.getElementById("modal-root");

    const { isModalOpen, closeModal } = useUI();


    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeModal();
        }

        document.addEventListener("keydown", handleEsc);


        return () => document.removeEventListener("keydown", handleEsc);
    }, [closeModal])

    if (!isModalOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-[1200px] relative">
                {children}
            </div>
        </div>,
        modalRoot

    );
}
