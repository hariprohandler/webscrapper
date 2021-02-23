// Requiring module 
const assert = require('assert'); 
var sinon = require('sinon');
var MockReq = require('mock-req');
var MockRes = require('mock-res');
var http = require('http');
var api = require('./api.js');

// We can group similar tests inside a describe block 
describe("Web Scrapping", () => { 
  before(() => { 
    console.log( "This part executes once before all tests" ); 
  }); 
  
  after(() => { 
    console.log( "This part executes once after all tests" ); 
  }); 
      
  // We can add nested blocks for different tests 
  describe( "Test1", () => { 
    beforeEach(() => { 
        this.request = sinon.stub(http, 'request');
      console.log( "executes before every test" ); 
    }); 
      
    it("Is returning for URL https://www.npr.org/sections/national/", () => { 
        var params = { url: 'https://www.npr.org/sections/national/' };
        var expected = JSON.stringify(params);
       
        var request = new MockReq({ method: 'POST' });
        var write = sinon.spy(request, 'write');
       
        this.request.returns(request);
       
        api.post(params, function() { });
       
        assert(write.withArgs(expected).calledOnce);
    });
    
    afterEach(function() {
        http.request.restore();
      });
  }); 
});