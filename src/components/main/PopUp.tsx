import { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { fetchCorporation, fetchSystem } from "../../redux/appThunk";
import { Modal } from "./Modal";

interface PopUpProps {
    fractionName: string;
    fractionDescription: string;
    onNameClose: () => void;
    solarSystemId: number;
    corporationId: number;
    popUpVisible: boolean;
}

interface MyCorporationDataObject {
    corpName: string,
    memberCount: number,
    corpDescription: string,
    ceoId: number,
    event: React.MouseEvent<HTMLDivElement>,
}


export const PopUp = ({
        fractionName, 
        fractionDescription, 
        onNameClose, 
        solarSystemId, 
        corporationId,
        popUpVisible,
    }: PopUpProps): ReactElement => {
        const systemsData = useAppSelector((state) => state.systems.data2);
        const corporationsData = useAppSelector((state) => state.corporations.data2);

        const [chosenCorporation, setChosenCorporation] = useState<MyCorporationDataObject | null>(null);
        const [showModal, setShowModal] = useState(false);

        useEffect(() => {
            fetchSystem(solarSystemId);
            fetchCorporation(corporationId);
        }, [solarSystemId, corporationId]);

        const handleOpenModal = (corpName: string, memberCount: number, corpDescription: string, ceoId: number, event: React.MouseEvent<HTMLDivElement>) => {
            setChosenCorporation({corpName, memberCount, corpDescription, ceoId, event});
            setShowModal(true);
            event.stopPropagation();
        }

        const handleModalClose = () => {
            setShowModal(false);
        }
        
        return (
                <section className="relative z-10 border border-white w-80 bg-white ml-0 block w-56 bg-black shadow-xl rounded-lg">
                    <div className="flex justify-center items-center h-12 border-b border-white-600">
                        <h3 className="text-center">{fractionName}</h3>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-sm p-3">{fractionDescription}</p>
                    </div>
                    <div className="flex justify-left items-center">
                        <p className="text-sm p-3">Solar system name: {systemsData.name}</p>
                    </div>
                    <div className="flex justify-left items-center">
                        <div className="text-sm p-3 underline decoration-sky-500 cursor-pointer" onClick={(event) => {
                            handleOpenModal(corporationsData.name, corporationsData.member_count, corporationsData.description, 
                                corporationsData.ceo_id, event)}}>Corporation: {corporationsData.name}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="bg-black rounded-lg text-white w-full m-3"
                            onClick={onNameClose}>Close
                        </button>
                    </div>
                        {showModal && chosenCorporation?.corpName === corporationsData.name && 
                        <Modal
                            corpName={corporationsData.name}
                            memberCount={corporationsData.member_count}
                            corpDescription={corporationsData.description}
                            ceoId={corporationsData.ceo_id} 
                            isOpen={true} 
                            onClose={handleModalClose} 
                    /> }
                </section>
    )
    };