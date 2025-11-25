import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { CreateShortPage } from "./pages/CreateShortPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/create" element={<CreateShortPage />} />
    </Routes>
  );
}
