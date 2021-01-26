// God damn eslint not playing nicely with jest :(
/* eslint-disable no-undef */
const express = require('express')
const supertest = require('supertest')
const rs = require('randomstring')
const api = require('../../api/routes')
const app = express()
const request = supertest(app)

beforeAll(async () => {
  await app.use('/api', api)
  await app.listen(process.env.PORT || 3000)
})

describe('GET /api/', () => {
  test('Returns the correct API name', async () => {
    const response = await request.get('/api')
    expect(response).toBeDefined()
    expect(response.body.api).toEqual('Braze')
    expect(response.statusCode).toBe(200)
  })
  test('Returns a SemVer compatible version', async () => {
    const response = await request.get('/api')
    expect(response).toBeDefined()
    expect(response.body.version).toMatch(/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[a-zA-Z\d][-a-zA-Z.\d]*)?(\+[a-zA-Z\d][-a-zA-Z.\d]*)?$/)
    expect(response.statusCode).toBe(200)
  })
  test('Returns a valid stream', async () => {
    const response = await request.get('/api')
    expect(response).toBeDefined()
    expect(response.body.stream).toMatch(/^(DEV|ALPHA|BETA|STABLE)$/)
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /api/verify/:key', () => {
  test('Throws an error on missing key', async () => {
    const response = await request.get('/api/verify')
    expect(response).toBeDefined()
    expect(Object.keys(response.body)[0]).toEqual('error')
    expect(Object.keys(response.body).length).toBe(1)
    expect(response.body.error).toEqual('No API key provided.')
  })
  test('Accepts random data as dev key #1', async () => {
    const response = await request.get(`/api/verify/${rs.generate(8)}`)
    expect(response).toBeDefined()
    expect(response.body.valid).toEqual('Key validated.')
    expect(response.body.name).toEqual('DEVELOPMENT TEST KEY')
    expect(response.body.created_at).toEqual('The beginning of time')
  })
  test('Accepts random data as dev key #2', async () => {
    const response = await request.get(`/api/verify/${rs.generate(8)}`)
    expect(response).toBeDefined()
    expect(response.body.valid).toEqual('Key validated.')
    expect(response.body.name).toEqual('DEVELOPMENT TEST KEY')
    expect(response.body.created_at).toEqual('The beginning of time')
  })
  test('Throws an error on invalid key', async () => {
    const response = await request.get(`/api/verify/JESTTESTKEYPLEASEDONTUSE${rs.generate(8)}`).set('override-devkey', 'YES')
    expect(response).toBeDefined()
    expect(Object.keys(response.body)[0]).toEqual('error')
    expect(Object.keys(response.body).length).toBe(1)
    expect(response.body.error).toEqual('Invalid key provided.')
  })
})
