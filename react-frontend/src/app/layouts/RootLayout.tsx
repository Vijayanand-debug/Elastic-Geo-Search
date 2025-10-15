import { Outlet } from "react-router";
import LocationSelector from "@/features/location/components/LocationSelector";
import SearchComponent from "@/features/elasticSearch/components/SearchComponent";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import SortComponent from "@/features/sort/components/SortComponent";

export function RootLayout() {

    const [searchText, setSearchText] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('relevance');

    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                    },
                }}
            />
            <div className="flex flex-col items-center md:flex-row bg-[#1F2937] shadow-lg shadow-[#1F2937] rounded-[0px_0px_5px_5px]">
                <LocationSelector />
                <SearchComponent
                    onSearchChange={setSearchText}
                />
                <SortComponent
                    onSort={setSortOption}
                />

            </div>
            <section><Outlet context={{ searchText, sortOption }} /></section>
        </>
    )
}