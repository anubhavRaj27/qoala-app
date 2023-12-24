import './App.css';
import MainPage from './scenes/MainPage/MainPage';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Results from './scenes/ResultsPage/Results';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='results' element={<Results />} />
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
