import inquirer from 'inquirer';
import { TPromptParams, TPromptQuestionType } from "./prompt.type";

export class PromptService {
  public async input<T extends TPromptQuestionType>({type, message}: TPromptParams) {
    const data = await inquirer.prompt<{result: T}>([{
      type,
      name: 'result',
      message
    }]);
    return data.result
  }
}
