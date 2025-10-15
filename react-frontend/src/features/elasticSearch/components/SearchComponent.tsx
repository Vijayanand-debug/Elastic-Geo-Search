import { useState } from "react";

export default function SearchComponent({ onSearchChange }: { onSearchChange: React.Dispatch<React.SetStateAction<string>>; }) {

    const [showAlert, setShowAlert] = useState<Boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    }


    const handleFocus = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    }

    return (
        <>
            <section className="order-1 p-5 w-full md:order-2 md:max-w-[700px] md:ml-[2%]">
                <div className="flex">
                    <div className="relative w-full">
                        <input
                            type="search"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[white] rounded-[8px] dark:placeholder-gray-700 dark:text-gray-700"
                            placeholder="search for Nimbus, Shenron, Drones, Dublin ..."
                        />
                    </div>
                </div>
                {
                    (showAlert) && (
                        <div className="w-full md:max-w-[700px] bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-2xl p-3 mt-3 shadow-md">
                            <h5 className="text-center text-slate-100 font-semibold tracking-wide">
                                This search feature uses Debouncing
                            </h5>
                        </div>
                    )
                }

            </section>



        </>
    );

}