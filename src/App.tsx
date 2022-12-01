import Register from "components/Register";
import Todo from "components/Todo";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
