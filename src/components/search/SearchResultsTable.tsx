import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";

type TypeData = {
    faction_id: number;
    name: string;
    meta?: any;
    payload: {
        constellation_id?: number;
        id: number | ReactElement<any, string | JSXElementConstructor<any>> | 
                Iterable<ReactNode> | ReactPortal | null | undefined;
        name?: string | ReactElement<any, string | JSXElementConstructor<any>> | 
                Iterable<ReactNode> | ReactPortal | null | undefined;
    };
};

interface SearchResultsTableProps {
    searchType: any | [];
    searchResults: TypeData[];
    isLoading: boolean;
    newAlliancesData: any[];
    newConstellationsData: any[];
    searchQuery: string;
    validateSearch: boolean;
}

export const SearchResultsTable = ({ 
        searchType, 
        searchResults, 
        isLoading,
        newAlliancesData,
        newConstellationsData,
        searchQuery,
        validateSearch
    }: SearchResultsTableProps): ReactElement => {

        console.log(newAlliancesData)
    
    return (
        <div>
            <p className="mt-1">
            {(searchResults.length > 0 || newAlliancesData.length > 0 || newConstellationsData.length > 0) && searchType !== '' ? 'Found:' : ''}
                </p>
                {isLoading ?
                    <div>Loading data...</div>
                :
                <table className="table-fixed border-spacing-2 border-collapse border border-slate-300 w-[25rem]">
                    <thead>
                        <tr>
                            <th className="border border-slate-300">ID</th>
                            <th className="border border-slate-300">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {searchType === 'alliances' && 
                        newAlliancesData.map((alliance: TypeData, index: React.Key | null | undefined) => (
                            <tr key={index}>
                                <td className="border border-slate-300 text-center">{alliance.meta.arg ?? ''}</td>
                                <td className="border border-slate-300 text-center">{alliance.payload.name}</td>
                            </tr>
                        ))
                    }

                    {searchType === 'constellations' && newConstellationsData.map((constellation: TypeData, index: React.Key | null | undefined) => (
                        <tr key={index}>
                            <td className="border border-slate-300 text-center">{constellation.payload.constellation_id ?? ''}</td>
                            <td className="border border-slate-300 text-center">{constellation.payload.name}</td>
                        </tr>
                    ))}

                    {searchType === 'fractions' && searchResults.map((fraction: TypeData, index) => (
                        <tr key={index}>
                            <td className="border border-slate-300 text-center">{fraction.faction_id}</td>
                            <td className="border border-slate-300 text-center">{fraction.name}</td>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
            }
            
        </div>
    );
};


// (searchResults && searchResults.length > 0) &&