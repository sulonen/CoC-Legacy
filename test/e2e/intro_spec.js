'use strict';

describe('CoC Investigator Generation', () => {
  describe('Intro', function() {
    beforeEach(() => {
      browser.get('http://localhost:8080');
    });
    it('should load index.html and the intro template', function() {
      expect(browser.getTitle())
        .toEqual('Investigator Generation');
      element(by.css('.nav-buttons input'))
        .getAttribute('value').then(function(attr) {
          expect(attr).toBe('OK, Let\'s Start Rolling');
        });
    });
  });
});
