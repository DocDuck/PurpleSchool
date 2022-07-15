export interface IStreamHandler {
    log(...args: any[]): void;
    error(...args: any[]): void;
    end(): void;
}
