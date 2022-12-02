import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import TodoPage from "pages/TodoPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
