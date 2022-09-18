import { IStreamLogger } from "./stream.type";
import { ChildProcessWithoutNullStreams } from "child_process";

export class StreamHandler {
    constructor(private handler: IStreamLogger) { }

    processOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on('data', (data: any) => {
            this.handler.log(data)
        });

        stream.stderr.on('data', (data: any) => {
            this.handler.error(data)
        })

        stream.on('close', () => {
            this.handler.end()
        })
    }
}
