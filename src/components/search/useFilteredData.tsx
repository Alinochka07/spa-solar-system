import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useMemo } from "react";

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

export const useFilteredData = (data: TypeData[] | [], searchQuery: string) => {
    return useMemo(() => {
        if (!Array.isArray(data)) {
            return [];
        }

        return data.filter((item: TypeData) => {
            const idString = item.meta.toString();
            return idString.includes(searchQuery) || item.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [data, searchQuery]);
};