import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}
