import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/Signin";
import { SignUp } from "./pages/SiginUp";
import { Todo } from "./pages/Todo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
