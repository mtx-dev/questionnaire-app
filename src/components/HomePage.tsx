import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const startQuestionnaire = () => {
    navigate(`/questionnaire`);
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={startQuestionnaire}>
        Start Questionnaire
      </Button>
    </Container>
  );
};

export default HomePage;
