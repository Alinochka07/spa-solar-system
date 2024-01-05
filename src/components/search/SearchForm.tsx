import { ReactElement } from 'react';
import { searchTypeOptions } from './searchTypes';
import { SearchResultsTable } from './SearchResultsTable';

interface SearchFormProps {
    searchType: string;
    setSearchType: (val: string) => void;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    handleSearch: () => void;
    errorMessage: string | null;
    searchResults: any[];
    validateSearch: boolean;
    isLoading: boolean;
    newAlliancesData: any[];
    newConstellationsData: any[];
}

export const SearchForm = ({
    searchType,
    setSearchType,
    searchQuery,
    setSearchQuery,
    handleSearch,
    errorMessage,
    searchResults,
    validateSearch,
    isLoading,
    newAlliancesData,
    newConstellationsData
}: SearchFormProps): ReactElement => {

    return (
        <div className="search w-full h-52 overflow-auto mb-2 pt-3">
            <div className="flex">
                <div className="flex h-7 justify-center w-full">
                    <select value={searchType} 
                            id='search-type'
                            name='search-type'
                            className={`h-7 w-36 border text-sm 
                            ${errorMessage && searchType === '' && (searchQuery !== '' || searchQuery.length >= 3) && 'border-red-500'}`}
                            onChange={(event) => setSearchType(event.target.value)}>
                        {searchTypeOptions.map(({ key, value, text }) => (
                            <option key={key} value={value}>
                                {text}
                            </option>
                        ))}
                    </select>
                    <div className="h-7 flex w-full justify-center">
                        <form className="flex w-full" autoComplete="off">
                            <input placeholder={`${searchType === 'alliances' || searchType === 'constellations' ? 'Enter id' : 'Search...'}`} 
                                    type='text'
                                    id='search'
                                    name='search'
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    className={`w-full h-full px-2 border ${errorMessage && (searchQuery === '' || searchQuery.length < 3) && 'error border-red-500'}`}
                                    value={searchQuery}/>
                            <button onClick={handleSearch} type="button" 
                                className="border border-black px-3 w-24 bg-black text-white">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            {errorMessage &&
                <div>
                    <p className="error text-xs text-red-600 pl-1">
                        {(searchQuery === '' || searchQuery.length < 3) && 'Minimum number of characters of search query is 3'}
                    </p>
                    <p className="error text-xs text-red-600 pl-1">
                        {searchType === '' && ((searchQuery === '' || searchQuery.length < 3) || (searchQuery !== '' || searchQuery.length >= 3)) && errorMessage}
                    </p>
                </div>
            }
            
            <div className='flex justify-center'>
                <SearchResultsTable 
                      searchResults={searchResults}
                      searchType={searchType}
                      isLoading={isLoading}
                      newAlliancesData={newAlliancesData}
                      newConstellationsData={newConstellationsData}
                      searchQuery={searchQuery}
                      validateSearch={validateSearch}
                      />
                
            </div>
        </div>
  );
};
