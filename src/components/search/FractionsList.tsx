import { ReactElement, useState } from 'react';

interface FractionsListProps {
    fractionData: { 
        faction_id: string; 
        name: string 
    }[];
}

const sortByName = [
    {value: 'A - Z'},
    {value: 'Z - A'},
];

export const FractionsList = ({ fractionData }: FractionsListProps): ReactElement => {
    const [sortType, setSortedType] = useState('A - Z');

    const nameAscending = [...fractionData].sort((a, b) =>
    a.name > b.name ? 1 : -1,
    );

    const nameDescending = [...fractionData].sort((a, b) => 
    a.name > b.name ? -1 : 1,
    )

    return (
        <div className="fractions w-full h-52 overflow-auto mb-2 pt-3">
            <select className='h-7 w-36 border text-sm' defaultValue="A - Z" onChange={(event) => setSortedType(event.target.value)}>
                {sortByName.map(sort => {
                    return <option key={sort.value} value={sort.value}>{sort.value}</option>
                })}
            </select>
            <ul className="mt-3">
                {sortType === 'A - Z' && nameAscending.map(({ faction_id, name }) => {
                return (
                    <li key={faction_id} className="p-1 border border-t-0">
                    {name}
                    </li>
                );
                })}
                {sortType === 'Z - A' && nameDescending.map(({ faction_id, name }) => {
                return (
                    <li key={faction_id} className="p-1 border border-t-0">
                    {name}
                    </li>
                );
                })}
            </ul>
        </div>
    );
};
