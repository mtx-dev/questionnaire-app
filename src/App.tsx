import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelection from "./components/Language/LanguageSelection";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import { LanguageProvider } from "./context/LanguageContext";
import HomePage from "./components/HomePage";

function App() {
  return (
    <LanguageProvider>
      <LanguageSelection />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
