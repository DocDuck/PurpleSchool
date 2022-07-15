import {IStreamHandler} from "../../core/handlers/stream.type";

export class ConsoleLogger implements IStreamHandler {
    private static logger: ConsoleLogger;
    public static getInstance() {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger
    }

    end(): void {
        console.log('Done!')
    }

    error(...args: any[]): void {
        console.error(...args)
    }

    log(...args: any[]): void {
        console.log(...args)
    }
}
