import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCharacter } from "../../redux/appThunk";
import React from "react";
import { raceFetch } from "../../redux/slicer";

interface ModalProps {
    corpName: string,
    memberCount: number,
    corpDescription: string,
    ceoId: number,
    setShowModal: (val: boolean) => void,
}

interface ModalPageProps {
    isOpen: boolean,
    onClose: () => void,
}


export const Modal = ({
    corpName,
    memberCount,
    corpDescription,
    ceoId,
    isOpen,
    onClose,
    setShowModal
  }: ModalProps & ModalPageProps): ReactElement => {
    const dispatch = useAppDispatch();
    const raceData = useAppSelector((state) => state.races.data);
    
  
    const charactersData = useAppSelector((state) => state.characters.data2);
    const [currentPage, setCurrentPage] = useState(0);
  
    useEffect(() => {
      fetchCharacter(ceoId);
      dispatch(raceFetch());
    }, [ceoId, dispatch]);
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
      setShowModal(true);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    return (
      <div className="fixed z-20 w-full h-full inset-0 bg-black/75">
        {isOpen && (
          <div className="w-5/12 bg-white m-[15%_auto] p-5 border rounded-lg">
            <p className="text-right cursor-pointer" onClick={onClose}>
              X
            </p>
            <div className="border border-slate-200 rounded-md m-2 px-2 py-1">
              {currentPage === 0 && (
                <>
                  <p className="text-sm">
                    <b>Name:</b> {corpName}
                  </p>
                  <p className="text-sm">
                    <b>Member count:</b> {memberCount}
                  </p>
                  <p className="text-sm">
                    <b>Description:</b> {corpDescription}
                  </p>
                  <p
                    className="text-sm underline decoration-sky-500 cursor-pointer"
                    onClick={handleNextPage}
                  >
                    <b>CEO name:</b> {charactersData.name}
                  </p>
                </>
              )}
              {currentPage === 1 && (
                <>
                  <p className="text-sm">
                    <b>Name:</b> {charactersData.name}
                  </p>
                  <p className="text-sm">
                    <b>Birthday:</b> {charactersData.birthday}
                  </p>
                  <p className="text-sm">
                    <b>Race: </b>
                    {raceData.map((race) =>
                      race.race_id === charactersData.race_id ? (
                        <React.Fragment key={race.race_id}>
                          {race.name}
                        </React.Fragment>
                      ) : null
                    )}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-center">
              <p className="text-sm">
                {currentPage === 1 ? 'Back' : 'Next'}
              </p>
              <button
                className={`bg-black text-white text-sm px-3 border rounded-md ml-2 ${
                  currentPage === 0 ? 'hidden' : 'visible'
                }`}
                onClick={handlePrevPage}
              >
                ←
              </button>
              <button
                className={`bg-black text-white text-sm px-3 border rounded-md ml-2 ${
                  currentPage === 1 ? 'hidden' : 'visible'
                }`}
                onClick={handleNextPage}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  

