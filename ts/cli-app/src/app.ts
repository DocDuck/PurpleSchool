import {PromptService} from "./core/services/prompt/prompt.service";

class App {
    public async run() {
        console.log('Cli app is running...')
        const promptService = new PromptService()
        const res = await promptService.input<'number'>({type: 'number', message: 'Enter your number'})
    }
}

const app = new App()
app.run()
