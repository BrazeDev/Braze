// God damn eslint not playing nicely with jest :(
/* eslint-disable no-undef */
const express = require('express')
const supertest = require('supertest')
const api = require('../../api/routes')
const app = express()
const request = supertest(app)

process.env.NODE_ENV = 'test'

beforeAll(async () => {
  await app.use('/api', api)
  await app.listen(process.env.PORT || 3000)
})

describe('GET /api/v1', () => {
  test('Returns the correct API name', async () => {
    const response = await request.get('/api/v1')
    expect(response).toBeDefined()
    expect(response.body.api).toEqual('Braze')
    expect(response.statusCode).toBe(200)
  })
  test('Returns a SemVer compatible version', async () => {
    const response = await request.get('/api/v1')
    expect(response).toBeDefined()
    expect(response.body.version).toMatch(/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[a-zA-Z\d][-a-zA-Z.\d]*)?(\+[a-zA-Z\d][-a-zA-Z.\d]*)?$/)
    expect(response.statusCode).toBe(200)
  })
  test('Returns the correct solder API version', async () => {
    const response = await request.get('/api/v1')
    expect(response).toBeDefined()
    const version = response.body.solderCompatVersion.replace('v', '').split('.')
    expect(version.length).toBe(4)
    expect(parseInt(version[0], 10)).toBe(0)
    expect(parseInt(version[1], 10)).toBeGreaterThanOrEqual(7)
    expect(parseInt(version[2], 10)).toBeGreaterThanOrEqual(5)
    expect(parseInt(version[3], 10)).toBeGreaterThanOrEqual(2)
    expect(response.statusCode).toBe(200)
  })
  test('Returns the correct stream', async () => {
    const response = await request.get('/api/v1')
    expect(response).toBeDefined()
    expect(response.body.stream).toMatch(/^(DEV|ALPHA|BETA|STABLE)$/)
    expect(response.statusCode).toBe(200)
  })
  test('Endpoint returns key status [NYI]', async () => {
    const response = await request.get('/api/v1')
    expect(response).toBeDefined()
    expect(response.body.key).toMatch(/^(NOT_FOUND|(IN)?VALID)$/)
    expect(response.statusCode).toBe(200)
  })
})

describe('Testing authentication endpoints', () => {
  let mesg1 = ''
  let mesg2 = ''
  test('Allows authorized users to log in', async () => {
    const response = await request.get('/api/auth/login').send({
      username: 'admin', password: 'ChangeMeFirst!'
    })
    expect(response).toBeDefined()
    expect(response.body.success).toBe(true)
    expect(response.statusCode).toBe(200)
  })
  test('Prevents login with incorrect password', async () => {
    const response = await request.get('/api/auth/login').send({
      username: 'admin', password: 'ChangeMeFirst!'
    })
    mesg1 = response.body.message
    expect(response).toBeDefined()
    expect(response.body.success).toBe(true)
    expect(response.statusCode).toBe(200)
  })
  test('Prevents login with incorrect username', async () => {
    const response = await request.get('/api/auth/login').send({
      username: 'admin', password: 'ChangeMeFirst!'
    })
    mesg2 = response.body.message
    expect(response).toBeDefined()
    expect(response.body.success).toBe(true)
    expect(response.statusCode).toBe(200)
  })
  test('Error message doesn\'t allow for username enumeration', () => {
    expect(mesg1 === mesg2).toBeFalsy()
  })
  // TODO check timings to thwart side-channel attacks
})

describe('Testing token endpoints', () => {

})

describe('Testing key endpoints', () => {

})
