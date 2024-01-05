import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { alliancesByIdFetch, alliancesFetch, constellationsByIdFetch, constellationsFetch, fractionsFetch } from '../../redux/slicer';
import { searchTypeOptions } from './searchTypes';
import { Dropdown } from './Dropdown';
import { FractionsList } from './FractionsList';
import { SearchForm } from './SearchForm';

type TypeData = {
    meta?: any;
    faction_id: number;
    name: string;
    payload: {
        constellation_id?: number;
        id: number | ReactElement<any, string | JSXElementConstructor<any>> | 
                Iterable<ReactNode> | ReactPortal | null | undefined;
        name?: string | ReactElement<any, string | JSXElementConstructor<any>> | 
                Iterable<ReactNode> | ReactPortal | null | undefined;
    };
};

export const Search = (): ReactElement => {
    const dispatch = useAppDispatch();
    const allianceData = useAppSelector((state) => state.alliances.data);
    const constellationData = useAppSelector((state) => state.constellations.data);
    const fractionData = useAppSelector((state) => state.fractions.data);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any | []>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showFractions, setShowFractions] = useState(true);
    const [searchType, setSearchType] = useState(searchTypeOptions[0].value);
    const [filteredTypes, setFilteredTypes] = useState<number>(0);
    const [lastFetchedId, setLastFetchedId] = useState<any>(null);
    const [newAlliancesData, setNewAlliancesData] = useState<any | []>([]);
    const [newConstellationsData, setNewConstellationsData] = useState<any | []>([]);
    const [validateSearch, setValidateSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        dispatch(fractionsFetch());
        dispatch(alliancesFetch());
        dispatch(constellationsFetch());
    }, [dispatch, filteredTypes, isLoading]);

    
    const handleSearch = () => {
        setIsLoading(true);
        setSearchResults([]);
        setErrorMessage(null);
        setValidateSearch(true);

        try {
            let results: TypeData[] = [];

            if (searchType === 'alliances') {
                if (Array.isArray(allianceData)) {
                    const filteredAllianceData = allianceData.filter((allianceId) => {
                        const allianceIdString = allianceId.toString();
                        return allianceIdString.includes(searchQuery);
                    });
                    if (filteredAllianceData.length > 0) {
                        const firstAlliance = filteredAllianceData[0];
                        setFilteredTypes(firstAlliance);
        
                        if (firstAlliance !== lastFetchedId) {
                            Promise.all(
                                filteredAllianceData.map(item => dispatch(alliancesByIdFetch(item)))
                            )
                                .then(allData => {
                                    setNewAlliancesData(allData);
                                    setLastFetchedId(firstAlliance);
                                })
                                .catch(error => {
                                    console.error('Error fetching alliance data:', error);
                                });
                        };
                        setSearchResults(filteredAllianceData);
                        setIsLoading(false);
                    };
                }
            } else if (searchType === 'constellations') {
                if (Array.isArray(constellationData)) {
                    const filteredConstellationData = constellationData.filter((constellationId) => {
                        const constellationIdString = constellationId.toString();
                        return constellationIdString.includes(searchQuery);
                    });
            
                    if (filteredConstellationData.length > 0) {
                        const firstConstellation = filteredConstellationData[0];
                        setFilteredTypes(firstConstellation);
            
                        if (firstConstellation !== lastFetchedId) {
                            Promise.all(
                                filteredConstellationData.map(item => dispatch(constellationsByIdFetch(item)))
                            )
                            .then(allData => {
                                setNewConstellationsData(allData);
                                setLastFetchedId(firstConstellation);
                            })
                            .catch(error => {
                                console.error('Error fetching constellation data:', error);
                            });
                        }
                    }
                    setSearchResults(filteredConstellationData);
                    setIsLoading(false);
                }
                

            } else if (searchType === 'fractions') {
                const filteredFractionData = fractionData.filter((fraction: { name: string; faction_id: number; }) => {
                    return (fraction.name.toLowerCase().includes(searchQuery) || fraction.faction_id.toString().includes(searchQuery));
                });
                results = filteredFractionData;
            }
            setSearchResults(results);

        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="search">
            <div className="flex justify-center w-[13rem] h-8 bg-white border rounded-lg">
                <button onClick={() => setShowDropdown(true)} className="right-[2%]">
                    Search fractions
                </button>
            </div>
            {showDropdown && (
                <div className="absolute z-20 text-sm w-[30rem] right-[2%] p-2 h-[18.5rem] border rounded-lg bg-white">
                    <div className="flex justify-end">
                        <p
                        className="cursor-pointer text-right bg-black px-1.5 border rounded-md text-white text-xs"
                        onClick={() => setShowDropdown(false)}
                        >
                        X
                        </p>
                    </div>
                    <Dropdown 
                        showFractions={showFractions} 
                        showSearch={showSearch} 
                        setShowFractions={setShowFractions} 
                        setShowSearch={setShowSearch} />
                    <div>
                        {showFractions && <FractionsList fractionData={fractionData} />}
                        {showSearch && (
                            <SearchForm
                                searchType={searchType}
                                setSearchType={setSearchType}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                handleSearch={handleSearch}
                                errorMessage={errorMessage}
                                searchResults={searchResults}
                                validateSearch={validateSearch}
                                isLoading={isLoading}
                                newAlliancesData={newAlliancesData}
                                newConstellationsData={newConstellationsData}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
