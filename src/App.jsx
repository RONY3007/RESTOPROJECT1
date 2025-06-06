
import BookingPage from "./Pages/landingpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentPage from "./Pages/paymentpage";
import HotelLandingPage from "./Pages/hotellanding";

export default function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<BookingPage/>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/landing" element={<HotelLandingPage/>} />
       
      </Routes>
    </Router>
      

    </>
  );
}