import React from "react";
import { Routes, Route } from "react-router-dom";

import StudentListPage from "./pages/StudentListPage";
import AddNewStudent from "./pages/AddNewStudent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentListPage />} />
      <Route path="/add-student" element={<AddNewStudent />} />
    </Routes>
  );
};

export default App;