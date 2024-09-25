export type Language = "en" | "et" | "ru";

export interface QuestionBaseType {
  question: string;  
}

export interface QuestionSingleType extends QuestionBaseType {
  options: string[];
}
export interface QuestionComparisonType extends QuestionBaseType {
  pairs: PairType[]
}

export interface PairType {
  id: string;
  a: string;
  b: string;
}

export type Entity = {
  id: string;
}

export interface QuestionMultilanguageSingleType extends Entity {
  type: "single-choice";
  en: QuestionSingleType;
  et: QuestionSingleType;
  ru: QuestionSingleType;
}

export interface QuestionMultilanguageComparisonType extends Entity {
  type: "comparison";
  en: QuestionComparisonType;
  et: QuestionComparisonType;
  ru: QuestionComparisonType;
}

export type QuestionType = QuestionMultilanguageSingleType | QuestionMultilanguageComparisonType

export  interface QuestionsData {
  questions: QuestionType[];
}

export type QuestionMultilanguageComparisonResponseType = { [key: string]: string };
export type QuestionResponseType = string | QuestionMultilanguageComparisonResponseType