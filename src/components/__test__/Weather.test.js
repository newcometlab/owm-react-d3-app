import { render } from '@testing-library/react';

import { WeatherContext } from '../context/WeatherContext';
import Weather from '../Weather';

const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <WeatherContext.Provider {...providerProps}>{ui}</WeatherContext.Provider>,
        renderOptions
    )
}

describe('Weather', () => {
    it("should show weather data", async() => {
        const providerProps = {
            value: {
                forecast: {
                    city: {
                        name: 'Tokyo'
                    },
                    list: [{
                        weather: [{
                            main: 'Clear'
                        }],
                        main: {
                            temp: 3
                        }
                    }]
                }
            }
        }

        const { getByText } = customRender(
            <WeatherContext.Consumer>
                {(value) => <Weather forecast={value} />}
            </WeatherContext.Consumer>,
            { providerProps }
        );

        expect(getByText('Clear').textContent).toBeTruthy();
    });
});
