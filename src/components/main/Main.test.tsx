import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Main } from './Main';

describe('<Main />', () => {
  test('the element exists in the document', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const divElement = screen.getByTitle('fraction-name');
    expect(divElement).toBeInTheDocument();
  
  });
});
