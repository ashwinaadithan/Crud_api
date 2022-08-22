var chai = require('chai')
var assert = chai.assert;
var should = chai.should()
var expect = chai.expect;

var server = require('../app')
let chaiHttp = require('chai-http');
const { append } = require('express/lib/response');
chai.use(chaiHttp)

describe('Task api', function(){
    it('get user', function(done){
        chai.request(server)
        .get('/user')
        .end((err, response)=>{
            expect(response.status).to.be.equal(200)
        })
    })
})