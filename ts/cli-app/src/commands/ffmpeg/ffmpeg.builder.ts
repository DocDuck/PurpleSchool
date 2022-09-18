import { ICommand } from "../../core/executors/command.types";

type Args = ICommand['arguments'];

export class FfmpegBuilder {
    private inputPath: string | undefined;
    private outputPath: string | undefined;
    private options: Map<string, string> = new Map();

    constructor() {
        this.options.set('-c:v', 'libx264'); // Неизменные настройки кодеков
    }

    setInputPath(iptPth: string): FfmpegBuilder {
        this.inputPath = iptPth;
        return this;
    }

    setOutputPath(optPth: string): FfmpegBuilder {
        this.outputPath = optPth;
        return this;
    }

    setVideoSize(width: number, height: number): FfmpegBuilder {
        this.options.set('-s', `${width}x${height}`)
        return this;
    }

    getCommandArgs(): Args {
        if (!this.inputPath || !this.outputPath) {
            throw new Error('Не указан входящий/исходящий путь до видеофайла')
        }

        const args: Args = [`-i ${this.inputPath}`] // Первым параметром идет путь до исходного видоса
        this.options.forEach((key, value) => {
            args.push(key);
            args.push(value);
        });
        args.push(this.outputPath); // Последним параметром всегда путь, куда положим обработанный видос
        return args;
    }



}