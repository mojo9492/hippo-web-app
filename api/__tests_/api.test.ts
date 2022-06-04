import { Caregiver, Patient, PatientRecord } from '@prisma/client'
import request from 'supertest'
import app from '../app'
import AuthController from '../controllers/authController'

// * integration tests
describe('/api/v1', () => {
    let tokens: ReturnType<typeof AuthController.generateTokens>
    beforeAll(async () => {
        tokens = await testLogin()
    })
    describe('/', () => {
        it('should return 200 and the client', async () => {
            const res = await request(app).get('/')

            expect(res.status).toBe(200)
        })
    })

    describe('auth', () => {
        const registerEndpoint = '/api/v1/register'
        const loginEndpoint = '/api/v1/user/login'
        const newUser = {
            email: 'allie@boberjoberlabs.com',
            last: 'gorl',
            first: 'allie',
            password: 'gurr',
        }
        it('should post a new user', async () => {

            const res = await request(app)
                .post(registerEndpoint)
                .send(newUser)

            expect(res.status).toBe(200)
        })

        it('should send tokens back on successful login', async () => {
            const credentials = {
                email: 'xena@boberjoberlabs.com',
                password: 'prettygorl'
            }
            const res = await request(app).post(loginEndpoint).send(credentials)

            expect(res.status).toBe(200)
            expect(res.body).not.toBeNull()
        })

        it('should not allow duplicate users', async () => {
            const res = await request(app)
                .post(registerEndpoint)
                .send(newUser)

            expect(res.status).toBe(400)
        })
    })

    describe('caregiver', () => {
        const testedEndpoint = '/api/v1/caregiver'
        let testCaregiver: Caregiver
        it('should reject requests that are not authorized', async () => {
            const res = await request(app).get(testedEndpoint)

            expect(res.status).toBe(401)
        })

        it('should allow post requests for new caregivers', async () => {
            const caregiver = {
                userId: 2
            }

            const res = await request(app)
                .post(testedEndpoint)
                .set('Authorization', tokens.accessToken)
                .send(caregiver)

            expect(res.status).toBe(200)
            const receivedCaregiver = res.body as Caregiver
            expect(receivedCaregiver.userId).toEqual(caregiver.userId)
            testCaregiver = receivedCaregiver
        })

        it('should get by id', async () => {
            const caregiver = {
                userId: 1
            }

            const res = await request(app)
                .get(`${testedEndpoint}/${caregiver.userId}`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedCaregiver = res.body as Caregiver
            expect(receivedCaregiver.userId).toEqual(caregiver.userId)
        })
        // ! fails
        xit('should allow patch requests for existing caregivers', async () => {
            const updatedCaregiver = {
                userId: 1,
            }

            const res = await request(app)
                .patch(`${testedEndpoint}/${testCaregiver.id}/update`)
                .send(updatedCaregiver)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedCaregiver = res.body as Caregiver
            expect(receivedCaregiver.userId).toEqual(updatedCaregiver.userId)
            testCaregiver = receivedCaregiver            
        })

        it('should allow delete requests for existing caregivers', async () => {
            const res = await request(app)
                .delete(`${testedEndpoint}/${testCaregiver.id}/delete`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(204)
        })
    })

    describe('patient', () => {
        const testedEndpoint = '/api/v1/patient'
        const patient = { // * registering himself(caregiver) as a patient
            userId: 1,
            caregiverId: 1
        }

        it('should reject requests that are not authorized', async () => {
            const res = await request(app).get('/api/v1/caregiver')

            expect(res.status).toBe(401)
        })

        it('should allow post requests for new patients', async () => {
            const res = await request(app).post(testedEndpoint)
                .send(patient)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedPatient = res.body as Patient
            expect(receivedPatient.userId).toEqual(patient.userId)
        })

        it('should get patient by userId', async () => {
            const res = await request(app)
                .get(`${testedEndpoint}/user/${patient.userId}`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)
            const receivedPatient = res.body as Patient
            expect(receivedPatient.userId).toBe(patient.userId)
        })
        // todo implement updating patient
        xit('should allow patch requests', async () => {
            const updatePatient = { ...patient, caregiverId: 2 }
            const res = await request(app)
                .patch(`${testedEndpoint}/${patient.userId}/update`)
                .send({ patient: updatePatient })
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedPatient = res.body as Patient
            expect(receivedPatient.caregiverId).toEqual(updatePatient.caregiverId)
        })

        it('should allow delete requests', async () => {
            const res = await request(app)
                .delete(`${testedEndpoint}/3`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)
        })
    })

    describe('record', () => {
        const testedEndpoint = '/api/v1/record'
        const record = {
            authorId: 1,
            patientId: 3,
            date: new Date(2022, 0, 2),
            bloodPressure: '120/87',
        }

        let testRecord: PatientRecord

        it('should reject requests that are not authorized', async () => {
            const res = await request(app).get('/api/v1/caregiver')

            expect(res.status).toBe(401)
        })

        it('should allow post requests for new records', async () => {

            const res = await request(app)
                .post(testedEndpoint)
                .send(record)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedRecord = res.body as PatientRecord
            expect(receivedRecord.authorId).toEqual(record.authorId)
            expect(receivedRecord.patientId).toEqual(record.patientId)
            testRecord = receivedRecord
        })

        it('should get records by author id', async () => {
            const res = await request(app)
                .get(`${testedEndpoint}/author/${record.authorId}`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedRecordsByAuthor = res.body as PatientRecord[]
            expect(receivedRecordsByAuthor.length).toBeGreaterThan(0)
        })

        it('should get records by patient id', async () => {
            const res = await request(app)
                .get(`${testedEndpoint}/patient/${record.patientId}`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedRecordsByPatient = res.body as PatientRecord[]
            expect(receivedRecordsByPatient.length).toBeGreaterThan(0)
        })

        it('should allow patch requests', async () => {
            const updatedRecord = { ...record, bloodPressure: '120/80' }
            const res = await request(app)
                .patch(`${testedEndpoint}/${testRecord.id}/update`)
                .send(updatedRecord)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)

            const receivedRecord = res.body as PatientRecord
            expect(receivedRecord.bloodPressure).toEqual(updatedRecord.bloodPressure)
        })

        it('should allow delete requests', async () => {
            const res = await request(app)
                .delete(`${testedEndpoint}/${testRecord.id}/delete`)
                .set('Authorization', tokens.accessToken)

            expect(res.status).toBe(200)
        })
    })
})

const testLogin = async () => {
    const credentials = {
        email: 'jobi@boberjoberlabs.com',
        password: 'ball'
    }

    const res = await request(app)
        .post('/api/v1/user/login')
        .send(credentials)
    expect(res.status).toBe(200)

    return res.body.tokens as ReturnType<typeof AuthController.generateTokens>
}