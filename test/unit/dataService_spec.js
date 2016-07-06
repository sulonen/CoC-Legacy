'use strict';

describe('Factory dataService', function() {
  var dataService;
  var testData;

  beforeEach(module('app'));

  beforeEach(inject(function(_dataService_) {
    dataService = _dataService_;
  }));

  it('should instantiate a factory', function() {
    expect(typeof dataService).toBe('object');
    expect(typeof dataService.data).toBe('object');
    expect(typeof dataService.getData).toBe('function');
  });
});
