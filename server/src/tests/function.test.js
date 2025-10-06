const { expect } = require('chai');
const { mapstringToValues } = require('./../utils/functions');

describe('Testing utils', () => {
  describe('Testing mapstringToValues', () => {
    it('Should return true: boolean> when "true": string', () => {
      const result = mapstringToValues('true');
      const expected = true;
      expect(result).to.equal(expected);
    });
    it('Should return false: boolean> when "false": string', () => {
      const result = mapstringToValues('false');
      const expected = false;
      expect(result).to.equal(expected);
    });
    it('Should return null: object> when "null": string', () => {
      const result = mapstringToValues('null');
      const expected = null;
      expect(result).to.equal(expected);
    });
    it('Should return undefined: undefined> when "undefined": string', () => {
      const result = mapstringToValues('undefined');
      const expected = undefined;
      expect(result).to.equal(expected);
    });
    it('Should return NaN: number> when "NaN": string', () => {
      const result = mapstringToValues('NaN');
      //const expected = NaN;
      expect(result).to.be.NaN;
    });
  });

});
