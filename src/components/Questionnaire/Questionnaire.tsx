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
import { QuestionResponseType, QuestionsData } from "../../types";
const questions = (questionsData as unknown as QuestionsData).questions;

const Questionnaire: React.FC = () => {

  const [responses, setResponses] = useState<{
    [key: string]: QuestionResponseType;
  }>({});
  const maxSteps = questions.length;

  const [score, setScore] = useState(null);
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
    console.log("User responses:", responses);
    console.log("scoring", scoring.scoring);

    const s = scoring.scoring;
    const res = [];
    Object.keys(responses).forEach((questionId) => {
      const qres = s[questionId]?.[responses[questionId]];
      console.log("s[questionId]", questionId, qres);

      if (qres) res.push(qres);
    });
    Object.keys(responses.comparison_pairs).forEach((pairId) => {
      const qres =
        s.comparison_pairs[pairId]?.[responses.comparison_pairs?.[pairId]];
      console.log("s[questionId]", pairId, qres);

      if (qres) res.push(qres);
    });
    const careerPaths = Object.keys(res[0]);
    const scoreRes = {};
    careerPaths.forEach((path) => {
      scoreRes[path] = 0;
    });
    res.forEach((item) => {
      careerPaths.forEach((path) => {
        scoreRes[path] = scoreRes[path] + item[path];
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
