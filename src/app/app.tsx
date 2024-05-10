import { Routes, Route, Navigate } from "react-router-dom";

import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import Login from "app/views/login/login";
import ForgotPassword from "./views/login/forgotPassword/ForgotPassword";
import RedefinePassword from "./views/login/redefinePassword/redefinePassword";
import SearchRequests from "./views/searchRequests/searchRequests";

function App() {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/esqueceuSenha" element={<ForgotPassword />} />
      <Route path="/recuperacao-senha" element={<RedefinePassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="pesquisas" element={<SearchRequests />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
