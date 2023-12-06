import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fractionsFetch } from "./redux/slicer";


const App = (): ReactElement => {

  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.fractions.data);

  useEffect(() => {
    dispatch(fractionsFetch());
  }, []);
  
  return (
    <div>
      <h1>Data from API:</h1>
      <div>
        {data?.map(({corporation_id, description, name}) => {
          return <div key={corporation_id}>
                    <h1>{corporation_id}</h1>
                    <p>{description}</p>
                    <h3>{name}</h3>
                  </div>
        })}
      </div>
    </div>
  );
}

export default App;