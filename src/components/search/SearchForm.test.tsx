import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const mockSetSearchType = jest.fn();
const mockSetSearchQuery = jest.fn();
const mockHandleSearch = jest.fn();


const sampleProps = {
  searchType: 'alliances',
  setSearchType: mockSetSearchType,
  searchQuery: '',
  setSearchQuery: mockSetSearchQuery,
  handleSearch: mockHandleSearch,
  errorMessage: null,
  searchResults: [],
  validateSearch: false,
  isLoading: false,
  newAlliancesData: [],
  newConstellationsData: [],
};

describe('SearchForm component', () => {
  test('renders correctly with initial props', () => {
    render(
        <Provider store={store}>
            <SearchForm {...sampleProps} />
        </Provider>);

    expect(screen.getByPlaceholderText('Enter id')).toBeInTheDocument();

    expect(screen.getByText('Search')).toBeInTheDocument();
  });


});

    