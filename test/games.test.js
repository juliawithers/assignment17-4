
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app')

// supertest(app)
//     .get('/apps')
//     .expect(200,'Hello Express!')

describe('app.js', ()=>{
    // sort by rating or app, if not provided, don't sort
    // passing
    it('should sort by the sort variable rating', ()=>{
        return supertest(app)
            .get('/apps')
            .query({sort: 'rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                    let sorted = true;
                    let i = 0;
                    // iterate once less than the length of the array
                    // because we're comparing 2 items in the array at a time
                    while (i < res.body.length - 1) {
                    // compare app at `i` with next app at `i + 1`
                    const appsAtI = res.body[i];
                    const appsAtIPlus1 = res.body[i + 1];
                    // if the next app is less than the app at i,
                    if (appsAtIPlus1.Rating > appsAtI.Rating) {
                        // the apps were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++;
                    }
                    expect(sorted).to.be.true;
            });
    });

    // passing
    it('should sort by the sort variable app', ()=>{
        return supertest(app)
            .get('/apps')
            .query({sort: 'app'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                    let sorted = true;
                    let i = 0;
                    // iterate once less than the length of the array
                    // because we're comparing 2 items in the array at a time
                    while (i < res.body.length - 1) {
                    // compare book at `i` with next book at `i + 1`
                    const appsAtI = res.body[i];
                    const appsAtIPlus1 = res.body[i + 1];
                    // if the next book is less than the book at i,
                    if (appsAtIPlus1.Apps < appsAtI.Apps) {
                        // the books were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++;
                    }
                    expect(sorted).to.be.true;
            });
    });

    // passing
    it('should return error 400 if sort is incorrect', ()=>{
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400)
    });

    // passing
    it('provided no sort or genre param, full book list is rendered', ()=>{
        return supertest(app)
        .get('/apps')
        .query({sort: "", genre: ""})
        .expect(200)
    })

    it('should filter by the genre variable if provided', ()=>{
        return supertest(app)
            .get('/apps')
            .query({genre: 'action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                    let filtered = true;
                    let i = 0;
                    // iterate once less than the length of the array
                    // because we're comparing 2 items in the array at a time
                    while (i < res.body.length - 1) {
                    // compare book at `i` with next book at `i + 1`
                    const appsAtI = res.body[i];
                    const appsAtIPlus1 = res.body[i + 1];
                    // if the next book is less than the book at i,
                    if (appsAtIPlus1.rating < appsAtI.rating) {
                        // the books were not sorted correctly
                        filtered = false;
                        break; // exit the loop
                    }
                    i++;
                    }
                    expect(filtered).to.be.true;
            });

    })

    it('should throw errors when genre is incorrect',()=>{
        return supertest(app)
            .get('/apps')
            .query({genre: 'MISTAKE'})
            .expect(400)
    })
})
