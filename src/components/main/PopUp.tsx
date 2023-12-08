import { ReactElement, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { fetchSystem } from "../../redux/appThunk";

interface PopUpProps {
    fractionName: string;
    fractionDescription: string;
    onNameClose: () => void;
    solarSystemId: number;
}


export const PopUp = ({
        fractionName, 
        fractionDescription, 
        onNameClose, 
        solarSystemId, 
    }: PopUpProps): ReactElement => {
        const systemsData = useAppSelector((state) => state.systems.systemData);

        useEffect(() => {
            fetchSystem(solarSystemId);
          }, [solarSystemId]);

        return (
            <section className="absolute z-10 border border-white w-56 bg-white ml-0 block w-56 bg-black shadow-xl rounded-lg">
                <div className="flex justify-center items-center h-12 border-b border-white-600">
                    <h3 className="text-center">{fractionName}</h3>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-sm p-3">{fractionDescription}</p>
                </div>
                <div className="flex justify-left items-center">
                    <p className="text-sm p-3">Solar system name: {systemsData.name}</p>
                </div>

                <div className="flex justify-center items-center">
                    <button
                        className="bg-black rounded-lg text-white w-full m-3"
                        onClick={onNameClose}
                        >
                        Close
                    </button>
                </div>
            </section>
    )
    };