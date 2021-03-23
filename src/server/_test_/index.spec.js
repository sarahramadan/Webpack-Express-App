const request = require('supertest');
import "babel-polyfill";
const express = require('express');

const app = express();

describe('POST /meaningcloud-api', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/meaningcloud-api')
      .send({url: 'http://tika.apache.org/1.3/formats.html'})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});