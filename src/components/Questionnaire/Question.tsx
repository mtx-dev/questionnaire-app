import React from "react";
import { FormControl, FormLabel } from "@mui/material";
import {
  QuestionMultilanguageComparisonResponseType,
  QuestionResponseType,
  QuestionType,
} from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import OptionsRadio from "./OptionsRadio";
import OptionsPairs from "./OptionsPairs";

type Props = {
  step: number;
  question: QuestionType;
  value: QuestionResponseType;
  onResponse: (questionId: string, response: QuestionResponseType) => void;
};

const Question: React.FC<Props> = ({ question, onResponse, value }) => {
  const { language } = useLanguage();

  const renderOptions = () => {
    switch (question.type) {
      case "comparison":
        return (
          <OptionsPairs
            value={value as QuestionMultilanguageComparisonResponseType}
            question={question}
            onResponse={onResponse}
          />
        );
      case "single-choice":
        return (
          <OptionsRadio
            value={value}
            question={question}
            onResponse={onResponse}
          />
        );
      default:
        break;
    }
  };

  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      <FormLabel component="legend">{question[language].question}</FormLabel>
      {renderOptions()}
    </FormControl>
  );
};

export default Question;
