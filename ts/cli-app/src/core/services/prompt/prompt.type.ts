import {Question, QuestionMap} from "inquirer";

export type TPromptQuestionType = keyof Pick<QuestionMap, 'number' | 'input' | 'password'>;
export type TPromptParams = Required<Pick<Question, 'message'> & { type: TPromptQuestionType }>
