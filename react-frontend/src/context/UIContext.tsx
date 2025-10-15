import { createContext, useContext, useState, type ReactNode } from "react";

type UIContextType = {
    isModalOpen: boolean,
    openModal: () => void,
    closeModal: () => void
}


export const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <UIContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </UIContext.Provider>
    );

}

export function useUI() {
    const context = useContext(UIContext);

    if (!context) {
        throw new Error("useUI must be used with in UIProvider");
    }

    return context;
}