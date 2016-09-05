var assert = chai.assert;
var expect = chai.expect;

describe('Tracklet', function() {

  var sut;

  beforeEach(function() {
    sut = new Tracklet();
  });

  describe('#bootstrap()', function () {

    it('fails when doNotTrack Flag is set to true', function() {
      navigator.dotNotTrack = '1';
      expect(sut.bootstrap).to.throw(Error);
    });

    it('succeeds if a tracking code is given', function() {
      navigator.dotNotTrack = false;
      expect(sut.bootstrap).to.not.throw(Error);
    });
  });

  describe('#sendClickEvent()', function () {

    it('fails when first parameter is empty or undefined', function() {
      var fn = function() { sut.sendClickEvent('') }
      expect(fn).to.throw(Error);
    });

    it('fails when second parameter is empty or undefined', function() {
      var fn = function() { sut.sendClickEvent('foo', undefined) }
      expect(fn).to.throw(Error);
    });

    it('succeeds when both params are set correctly', function() {
      ET_Event = {};
      ET_Event.eventStart = function(){};
      var fn = function() { sut.sendClickEvent('foo', 'bar') }
      expect(fn).to.not.throw(Error);
    });
  });

  describe('#getCommonTags()', function () {

    it('returns an object containing the right properties', function() {
      var tags = sut.getCommonTags();
      expect(tags).to.be.instanceof(Object);
      expect(tags).to.have.property('browserLanguage');
      expect(tags).to.have.property('browserPlatform');
      expect(tags).to.have.property('userAgent');
      expect(tags).to.have.property('referrer');
    });
  });
});
