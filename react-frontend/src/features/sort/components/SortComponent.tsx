export default function SortComponent({ onSort }: { onSort: React.Dispatch<React.SetStateAction<string>> }) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSort(e.currentTarget.value);
    }

    return (
        <>
            <div className="order-3 w-full border-t-white border-solid border-t  md:border-none md:w-[300px] md:mr-3">
                <select
                    className="w-full p-3 bg-[#273548] text-white text-center rounded-lg border border-white/10 md:order-3 md:border-none cursor-pointer"
                    onChange={e => handleChange(e)}
                >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="distance_asc">Distance: Nearest First</option>
                    <option value="distance_desc">Distance: Farthest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>
        </>
    )
}