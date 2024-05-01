// logger
const logger = {
    info(msg: string): void {
        console.log(msg);
    },
    warn(msg: string): void {
        console.log('\x1B[33m%s\x1b[0m', msg);
    },
    success(msg: string): void {
        console.log('\x1b[32m%s\x1b[0m', msg);
    },
    error(msg: string): void {
        console.error('\x1B[31m%s\x1B[0m', msg);
    }
};

export default logger;
