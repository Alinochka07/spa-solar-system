import { Search } from "../search/SearchComponent";

export const Header = () => {
    return (
        <header>
            <div className="flex flex-wrap content-center justify-between items-center px-[2%] bg-black h-20 w-screen">
                <img src="https://esi.evetech.net/ui/ccp.png" width={90} alt="logo"/>
                <Search/>
            </div>
            
        </header>
    );
};

