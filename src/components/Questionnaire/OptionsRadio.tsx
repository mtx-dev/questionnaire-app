import React from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { QuestionMultilanguageSingleType, QuestionResponseType } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

type Props = {
  value: QuestionResponseType;
  question: QuestionMultilanguageSingleType;
  onResponse: (questionId: string, response: string) => void;
};

const OptionsRadio: React.FC<Props> = ({ question, value, onResponse }) => {
  const { language } = useLanguage();

  return (
      <RadioGroup
        value={value}
        onChange={(e) => onResponse(question.id, e.target.value)}
      >
        {question[language].options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={question["en"].options[index]}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
  );
};

export default OptionsRadio;
