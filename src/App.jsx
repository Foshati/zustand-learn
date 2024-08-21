import Cart from "./components/Cart";
import Counter from "./components/Counter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
