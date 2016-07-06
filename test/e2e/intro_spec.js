'use strict';

describe('Intro', function() {
  it('should open the intro', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Investigator Generation');
  

  });
});
