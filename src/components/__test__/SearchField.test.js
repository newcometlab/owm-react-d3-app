import React from 'react';

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  WeatherContext,
  WeatherProvider,
} from '../context/WeatherContext';
import SearchField from '../SearchField';

describe('SearchField', () => {

    afterEach(cleanup);

    test("should show searchfield", async() => {
        const mockSubmit = jest.fn();

        await act(async () => {
            render(
                <WeatherProvider>
                    <SearchField />
                    <WeatherContext.Consumer>{mockSubmit}</WeatherContext.Consumer>
                </WeatherProvider>,
            );
        })

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Tokyo' } });
        fireEvent.click(screen.getByRole('button'));

        expect(mockSubmit).toHaveBeenCalledTimes(3);

    });
});
