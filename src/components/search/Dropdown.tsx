import { ReactElement } from "react";

interface DropdownProps {
    showFractions: boolean;
    setShowFractions: (val: boolean) => void;
    setShowSearch: (val: boolean) => void;
    showSearch: boolean;
}
  
export const Dropdown = ({ showFractions, setShowFractions, showSearch, setShowSearch }: DropdownProps): ReactElement => {
    return (
      <div className="border">
        <div className="flex justify-around ">
          <button
            className={`w-full h-8 border-r-2 pl-2 ${showFractions ? '' : 'border-b-2'}`}
            onClick={() => {
              setShowFractions(true);
              setShowSearch(false);
            }}
          >
            Fractions
          </button>
          <button
            className={`w-full h-8 pl-2 ${showSearch ? '' : 'border-b-2'}`}
            onClick={() => {
              setShowSearch(true);
              setShowFractions(false);
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  };
