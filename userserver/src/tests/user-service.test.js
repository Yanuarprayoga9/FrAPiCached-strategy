
import request from 'supertest'
import { expect, test,describe } from 'vitest'
import api from "../index.js"



describe('Index Route', () =>{
    test("Responds with 200 status code", async() =>{
        const response = await request(api).get('/')
        expect(response.status).toBe(200)
    })

    test("Responds with json content", async() =>{
        const response = await request(api).get('/')
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test("Returns with \'welcome home\' message", async() =>{
        const response = await request(api).get('/')
        expect(response.body.message).toMatch(/welcome /i)
    })
})