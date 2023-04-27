import { createContext, useContext,useState } from 'react';

export const SearchContext = createContext({
    suggestions: [],
    setSuggestions: () => {},
    query:"",
    setQuery:()=>{},
    showSearchInput:false,
    setShowSearchInput:()=>{}
});

export const useSearch = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState([]);
    const [showSearchInput, setShowSearchInput] = useState(false)
    return (
        <SearchContext.Provider
            value={{ suggestions, setSuggestions,query,setQuery,showSearchInput,setShowSearchInput }}
        >
            {children}
        </SearchContext.Provider>
    )
}