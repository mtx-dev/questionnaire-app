import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid2,
  Box,
  LinearProgress,
} from "@mui/material";
import questionsData from "../../../MultilingualCareerQuestionnaire.json"; // Load questions data
import scoring from "../../../UpdatedMVPScoringSystem.json";
import Question from "./Question";
import { QuestionMultilanguageComparisonResponseType, QuestionResponseType, QuestionsData } from "../../types";

const questions = (questionsData as unknown as QuestionsData).questions;

type ScoreType = {
  data_analyst: number;
  software_developer: number;
  project_manager: number;
  ux_ui_designer: number;
};

const Questionnaire: React.FC = () => {
  const [responses, setResponses] = useState<{
    [key: string]: QuestionResponseType;
  }>({});
  const maxSteps = questions.length;

  const [score, setScore] = useState<[string, number][] | null>(null);
  const [step, setStep] = useState<number>(0);
  const handleResponseChange = (
    questionId: string,
    response: QuestionResponseType
  ) => {
    setResponses({ ...responses, [questionId]: response });
  };
  const handleChangeNextStep = () => {
    if (step < maxSteps - 1) setStep(step + 1);
  };
  const handleChangePrevStep = () => {
    if (step > 0) setStep(step - 1);
  };
  const calculateScore = () => {

    const scoringData = scoring.scoring;
    const res: ScoreType[] = [];
    Object.keys(responses).forEach((questionId) => {
      const answerVariants = scoringData[questionId as keyof typeof scoringData];
      const key = responses[questionId] as string;
      const qres = answerVariants?.[key as keyof typeof answerVariants] as ScoreType;
      if (qres) res.push(qres);
    });
    Object.keys(responses.comparison_pairs).forEach((pairId) => {
      const answerVariants = scoringData.comparison_pairs[pairId as keyof typeof scoringData.comparison_pairs];
      const key = (responses.comparison_pairs as QuestionMultilanguageComparisonResponseType)[pairId];
      const qres = answerVariants?.[key as keyof typeof answerVariants];

      if (qres) res.push(qres as ScoreType);
    });
    const careerPaths = Object.keys(res[0]);
    const scoreRes: ScoreType = {
      data_analyst: 0,
      software_developer: 0,
      project_manager: 0,
      ux_ui_designer: 0,
    };

    res.forEach((item) => {
      careerPaths.forEach((path) => {
        scoreRes[path as keyof ScoreType] =
          scoreRes[path as keyof ScoreType] + item[path as keyof ScoreType];
      });
    });
    const sortedResults = Object.entries(scoreRes).sort((a, b) => b[1] - a[1]);
    setScore(sortedResults); // Placeholder for scoring logic
  };

  return (
    <Container>
      <Box sx={{ width: "100%", height: "2rem" }}>
        <LinearProgress
          variant="determinate"
          value={(step / (maxSteps - 1)) * 100}
        />
      </Box>
      <Typography variant="h5" gutterBottom>
        Question {step + 1}
      </Typography>

      <Question
        step={step}
        question={questions[step]}
        value={responses[questions[step].id]}
        onResponse={handleResponseChange}
      />

      <Grid2 container spacing={2}>
        {step > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePrevStep}
          >
            Prev
          </Button>
        )}

        {step != maxSteps - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeNextStep}
          >
            Next
          </Button>
        )}

        {step === maxSteps - 1 && (
          <Button variant="contained" color="primary" onClick={calculateScore}>
            Submit
          </Button>
        )}
      </Grid2>

      {score !== null && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Results:
          </Typography>
          {score?.map((item) => (
            <Typography sx={{ marginTop: 2 }}>
              {`${item[0]} - ${item[1]}`}
            </Typography>
          ))}
        </>
      )}
    </Container>
  );
};

export default Questionnaire;
