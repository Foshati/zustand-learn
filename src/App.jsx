import Cart from "./components/Cart";
import Counter from "./components/Counter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="*"
            element={<h2 className="text-red-400"> Not Found 404</h2>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
