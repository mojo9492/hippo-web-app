import UserService from '../../services/userService'
import {  mockDeep, mockReset } from 'jest-mock-extended'

jest.mock('../../services/userService', () => ({
    __esModule: true,
    default: mockDeep<UserService>(),
}))

beforeEach(() => {
    mockReset(UserService)
})

afterEach(() => {
    jest.clearAllMocks()
})

const MockUserService = mockDeep<UserService>()
export default MockUserService