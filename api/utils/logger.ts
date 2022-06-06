/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'
interface ILoggerData {
    [key: string]: any
}
class Logger {
    private logFile: string
    constructor() {
        this.logFile = './logs/info.log'
    }
    info(message: string, data?: ILoggerData | ILoggerData[]) {
        fs.appendFileSync(this.logFile, `[INFO] ${message}\n`)

        if (data) {
            fs.appendFileSync(this.logFile, data.toString())
        }
    }

    error(message: string, data?: ILoggerData | ILoggerData[]) {
        fs.appendFileSync(this.logFile, `\n\n[ERROR] ${message}\n\n`)
        if (data?.length) {
            Object.entries(data).forEach(([key, value]) => {
                fs.appendFileSync(this.logFile, `${key}: ${value}\n`)
            })
        }

        data?.forEach((item: ILoggerData) => {
            Object.entries(item).forEach(([key, value]) => {
                fs.appendFileSync(this.logFile, `${key}: ${value}\n`)
            })
        })
    }
}

export default new Logger()