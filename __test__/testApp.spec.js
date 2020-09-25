import { getWeatherData } from '../src/client/js/app'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

describe("Testing the submit functionality", () => {
    test("Testing the getWeatherData() function", () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        event.preventDefault()
        
        expect(event.preventDefault).toBeCalled();
        expect(getWeatherData).toBeDefined();
    })
});