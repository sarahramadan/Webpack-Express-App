// Import the js file to test
import "babel-polyfill";
import { handleSubmit } from "./../js/formHandler"

describe("Testing handle submission functionality", () => {
    test("Testing the handleSubmit() function", () => {
           expect(handleSubmit).toBeDefined();
})});