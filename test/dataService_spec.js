'use strict';

describe('Factory dataService', function() {
  var dataService;

  beforeEach(module('app'));

  beforeEach(inject(function(_dataService_) {
    dataService = _dataService_;
  }));
  
  it('should instantiate a factory', function() {
    dataService.getData(dataService.setData);
    expect(typeof dataService).toBe('object');
    expect(typeof dataService.data).toBe('object'); 
  });

});
