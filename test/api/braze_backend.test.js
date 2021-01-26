// God damn eslint not playing nicely with jest :(
/* eslint-disable no-undef */
const express = require('express')
const supertest = require('supertest')
const api = require('../../api/routes')
const app = express()
const request = supertest(app)

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
