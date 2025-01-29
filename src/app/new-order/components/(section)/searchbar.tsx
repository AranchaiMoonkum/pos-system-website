import React from 'react';

//icons
import { Search } from 'lucide-react';

const Searchbar = () => {
    return (
        <div className="flex items-center gap-4 border p-1 rounded-lg text-base md:w-1/4 justify-self-end">
            <Search className="text-pebble" />
            <input
                type="text"
                placeholder="Search..."
                className="outline-none bg-transparent placeholder:text-pebble"
            />
        </div>
    )
}

export default Searchbar;
