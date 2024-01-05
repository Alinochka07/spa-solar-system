import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Search } from './SearchComponent';

test('Should check for click', () => {
    render(
        <Provider store={store}>
            <Search/>
        </Provider>
    )
    const button = screen.getByRole('button')
   

    expect(screen.queryByRole('button')).toBeValid()

    fireEvent.click(button)
})
    
