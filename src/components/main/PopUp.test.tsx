import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { PopUp } from './PopUp';

describe('<Main />', () => {
  test('the text is in the document', () => {
    render(
      <Provider store={store}>
        <PopUp fractionName={''} fractionDescription={''} solarSystemId={0} corporationId={0} popUpVisible={false} setPopUpVisible={function (val: boolean): void {
          throw new Error('Function not implemented.');
        } }/>
      </Provider>
    );

    const myText = screen.getByText(/Solar system name/);
    expect(myText).toBeInTheDocument();
  
  });
});
