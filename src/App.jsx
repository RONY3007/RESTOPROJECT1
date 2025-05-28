
import BookingPage from "./Pages/landingpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentPage from "./Pages/paymentpage";

export default function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<BookingPage/>} />
        <Route path="/payment" element={<PaymentPage/>} />
       
      </Routes>
    </Router>
      

    </>
  );
}