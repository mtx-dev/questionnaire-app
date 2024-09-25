import React from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid2,
} from "@mui/material";
import { PairType, QuestionMultilanguageComparisonResponseType, QuestionMultilanguageComparisonType, QuestionResponseType } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

type Props = {
  value: QuestionMultilanguageComparisonResponseType;
  question: QuestionMultilanguageComparisonType;
  onResponse: (
    questionId: string,
    response: QuestionResponseType
  ) => void;
};

const OptionsPairs: React.FC<Props> = ({ question, onResponse, value }) => {
  const { language } = useLanguage();
  const handleComparisonChange = (pairId: PairType["id"], option: string) => {
    onResponse(question.id, { ...value, [pairId]: option });
  };

  return question[language].pairs.map((pair) => (
    <RadioGroup
      key={pair.id}
      value={value?.[pair.id] || ""}
      onChange={(e) => handleComparisonChange(pair.id, e.target.value)}
    >
      <Grid2 container spacing={3}>
        <Grid2 size={6}>
          <FormControlLabel value="a" control={<Radio />} label={pair.a} />
        </Grid2>
        <Grid2 size={6}>
          <FormControlLabel value="b" control={<Radio />} label={pair.b} />
        </Grid2>
      </Grid2>
    </RadioGroup>
  ));
};

export default OptionsPairs;
