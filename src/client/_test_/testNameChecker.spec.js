// Import the js file to test
import "babel-polyfill";
import { checkForName } from "./../js/nameChecker"

describe("Testing check url functionality", () => {
    test("Testing the checkForName() function", () => {
        let url ="http://tika.apache.org/1.3/formats.html&lang=en";
         expect(checkForName(url)).toBe(false);
})});