import { useCallback, useEffect, useState, useRef } from "react";
import axios, { type AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Product, ProductsAPIResponse } from "@/types/types";
import { useInView } from "react-intersection-observer";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useOutletContext } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import toast from 'react-hot-toast';

export default function HomeLayout() {

    const userLocation = useSelector((state: RootState) => state.location.userLocation);

    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<Boolean>(true);

    const [isInitialLoading, setIsInitialLoading] = useState<Boolean>(true);
    const [isMoreLoading, setIsMoreLoading] = useState<Boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const isInitialMount = useRef(true);

    const { searchText, sortOption } = useOutletContext<{ searchText: string; sortOption: string }>();
    const debouncedSearchText = useDebounce(searchText);

    const fetchProducts = useCallback(async (currentPage: number, isNewSearch: boolean, searchTerm = '', sortOption: string, caller: string) => {

        isNewSearch ? setIsInitialLoading(true) : setIsMoreLoading(true);
        setError(null);

        try {
            const API_URL = `${import.meta.env.VITE_API_BASE_URL}/search`;
            const response: AxiosResponse<ProductsAPIResponse> = await axios.get(API_URL, {
                params: {
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                    distance: "100km",
                    page: currentPage,
                    searchTerm: searchTerm,
                    sort: sortOption
                }
            });
            const { results, hasMore, currentRecords, totalHits } = response.data;

            setProducts(prev => [...prev, ...results]);
            setHasMore(hasMore);
            setPage(currentPage + 1);

            if (!isNewSearch && caller === 'scroll') {
                toast.success(`Showing ${currentRecords} of ${totalHits}`, { duration: 2000 });
            }

            if (caller === 'search' || caller === "initial") {
                toast.success(`Found ${totalHits} Records`, { duration: 2000 });
            }

        } catch (error) {
            console.error("Failed to fetch products: ", error);
            setError("Could not load products, please try again later!");
        } finally {
            setIsInitialLoading(false);
            setIsMoreLoading(false);
        }

    }, [userLocation]);

    // initial loading
    useEffect(() => {
        if (userLocation.lat && userLocation.lng && userLocation.place) {
            // first time loading, reset previous params and data
            setProducts([]);
            setPage(1);
            setHasMore(true);
            fetchProducts(1, true, debouncedSearchText, sortOption, 'initial');
        }
    }, [userLocation, sortOption, fetchProducts]);

    // infinite scrolling
    useEffect(() => {
        if (inView && hasMore && !isInitialLoading && !isMoreLoading && !error) {
            fetchProducts(page, false, debouncedSearchText, sortOption, 'scroll');
        }

    }, [inView, hasMore, isInitialLoading, isMoreLoading, page, fetchProducts, error, debouncedSearchText, sortOption]);

    // handling search
    useEffect(() => {

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        setProducts([]);
        setPage(1);
        setHasMore(true);
        setError(null);
        fetchProducts(1, true, debouncedSearchText, sortOption, 'search');
    }, [debouncedSearchText, userLocation, fetchProducts]);

    return (
        <>
            <section className="mt-10 flex flex-wrap">
                {isInitialLoading ? (
                    Array.from({ length: 30 }).map((_, index) => <ProductSkeleton key={index} />)
                ) : error ? (
                    <div className="w-full p-5 bg-white">
                        <p className="text-xl text-center text-red-400">{error}</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map((product, index) =>
                        <div key={index} className="w-1/2 md:w-1/6 hover:shadow-lg hover:scale-[1.02]">
                            <div
                                className="h-[250px] m-1 p-4 bg-[#273548] rounded-2xl shadow-md border border-white/5 flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-[#273548]">
                                <div>
                                    <h1 className="text-[#f87171] text-lg font-semibold tracking-wide">{product.brand.toUpperCase()}</h1>
                                    <p className="capitalize text-gray-300 text-sm mt-1">{product.name}</p>
                                </div>



                                <div className="space-y-2">
                                    <div className="flex items-center justify-between bg-orange-500/10 text-orange-300 px-3 py-1.5 rounded-lg text-xs font-medium">
                                        <span>Price</span>
                                        <span>€{product.price}</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-medium">
                                        <span>Relevance Score</span>
                                        <span>{product.score}</span>
                                    </div>

                                    <div
                                        className={`flex items-center justify-between bg-teal-500/10 text-teal-300 px-3 py-1.5 rounded-lg text-xs font-medium
                                         ${parseFloat(product.distance) > 20 && 'border border-[red]'}
                                        `}>
                                        <span>Dist. (Rad)</span>
                                        <span>{product.distance}</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-medium">
                                        <span>From</span>
                                        <span className="capitalize">{product.city.slice(0, 10)}</span>
                                    </div>
                                </div>
                            </div>



                        </div>
                    )
                ) : (
                    <div className="w-full bg-[#273548] p-5">
                        <p className="text-[30px] font-[bold] text-center text-white">No products found for this location. Please try a search within Ireland.</p>
                    </div>
                )}
            </section>
            <div className="w-full text-center p-8">
                {isMoreLoading && <p className="text-white">Loading...</p>}

                {hasMore && !isMoreLoading && (
                    <div ref={ref} style={{ height: '50px' }} />
                )}

                {!hasMore && products.length > 0 && (
                    <p className="text-gray-500">You've reached the end of the results.</p>
                )}
            </div>
        </>
    );
}