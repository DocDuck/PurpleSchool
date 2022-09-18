import { IStreamLogger } from "../handlers/stream.type";
import { ChildProcessWithoutNullStreams } from "child_process";
import { ICommand } from "./command.types";

export abstract class CommandExecutor<Input> {
    constructor(private logger: IStreamLogger) {}

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger)
    }

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): ICommand;
    protected abstract spawn(command: ICommand): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;

}