import { app } from "../services/app";
import request from 'supertest'



test('API HEALTH CHECKS RETURN 200', async () => {
    const res = await request(app).get('/news')
    expect(res.status).toBe(200)

})

test('Railway deployment link health checks', async () => {
    const res = await fetch('https://the-daily-commit-developer-news-api-production.up.railway.app/news')
    expect(res.status).toBe(200)
})

test('Aws deployment link health checks', async () => {
    const res = await fetch('http://3.129.206.233:8000/news')
    expect(res.status).toBe(200)
})
