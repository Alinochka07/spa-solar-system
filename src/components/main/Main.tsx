import { MouseEvent, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fractionsFetch } from "../../redux/slicer";
import { PopUp } from "./PopUp";

interface MyFractionDataObject {
    fractionDescription: string,
    solar_system_id: number,
    corporation_id: number,
}


export const Main = (): ReactElement => {
    const dispatch = useAppDispatch();
    const fractionData = useAppSelector((state) => state.fractions.data);

    const [popUpVisible, setPopUpVisible] = useState(false);
    const [selectedFraction, setSelectedFraction] = useState<MyFractionDataObject | null>(null);
    

    useEffect(() => {
        dispatch(fractionsFetch());
    }, [dispatch]);

    const handleFractionClick = (fractionDescription: string, solar_system_id: number, corporation_id: number, event: MouseEvent<HTMLElement>) => {
        setSelectedFraction({ fractionDescription, solar_system_id, corporation_id });
        setPopUpVisible(true);
        event.stopPropagation();
    }

    return (
        <main className="bg-slate-600 flex">
          <div className="flex flex-wrap justify-center w-full mt-2.5" title="fraction-name">
            {fractionData && 
              fractionData.map(({ corporation_id, name, description, solar_system_id}) => {
              return (
                <div
                  key={`${corporation_id}${name}`}
                  className="relative inline-block w-80 h-28 bg-black shadow-xl 
                    m-3 rounded-lg"
                  onClick={(event) => {
                    handleFractionClick(description, solar_system_id, corporation_id, event);
      
                }}
                >
                  <div className="flex justify-center w-80 h-28 items-center cursor-pointer">
                    <h3 className="text-white text-center">{name}</h3>
                  </div>
                  
                  { popUpVisible &&
                      selectedFraction?.fractionDescription === description &&
                      selectedFraction?.solar_system_id === solar_system_id &&
                      selectedFraction?.corporation_id === corporation_id && 
                      (
                    <PopUp
                        fractionName={name}
                        fractionDescription={description}
                        solarSystemId={solar_system_id}   
                        corporationId={corporation_id} 
                        popUpVisible={popUpVisible}  
                        setPopUpVisible={setPopUpVisible}         
                        />
                  )}
                </div>
              );
            })}
          </div>
        </main>
      );
};