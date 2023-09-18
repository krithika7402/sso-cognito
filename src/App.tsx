import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorPage, Dashboard, Login } from "./pages";
import { Callback } from "./helper";
import withAuth from "./HOC/withAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={withAuth(Dashboard)} />
        <Route path="/error" Component={ErrorPage} />
        <Route path="/callback" Component={Callback} />
        <Route path="/" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
