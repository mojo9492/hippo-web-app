import { Patient } from '@prisma/client'
import request from 'supertest'
import app from '../app'


// * integration tests
describe('/api/v1', () => {
    describe('/', () => {
        it('should return 200 and the client', async () => {
            const res = await request(app).get('/')

            expect(res.status).toBe(200)
        })
    })

    describe('auth', () => {
        it('should post a new user', async () => {
            const user = {
                email: 'bean@bjl.com',
                last: 'bean',
                first: 'bean',
                password: 'qrrrlql',
            }

            const res = await request(app)
                .post('/api/v1/register')
                .send(user)

            expect(res.status).toBe(200)
        })
        it('should send tokens back on successful login', async() => {
            const credentials = {
                email: 'bean@bjl.com',
                password: 'qrrrlql'
            }
            const res = await request(app).post('/api/v1/user/login').send(credentials)
    
            expect(res.status).toBe(200)
            expect(res.body).not.toBeNull()
        })
    })

    // todo implement care giver route
    // descbribe('/caregiver, () => {})

    // todo implement post new patient, delete patient 
    describe('patient', () => {
        const patient: Patient = {
            id: 1,
            careGiverId: 1,
            userId: 1,
        }
        it('should add a new patient', async()=> {
            const res = await request(app).post('api/v1/patient').send(patient)

            expect(res.status).toBe(200)

        })

        it('should get patient by id', async () => {
            const res = await request(app).get('/api/v1/patient/1')

            expect(res.status).toBe(200)
            expect(res.body.userId).toBe(patient.userId)
        })
    })

    // todo implement record testing
    // describe('/record', () => {})
})