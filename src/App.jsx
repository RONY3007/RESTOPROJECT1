
import BookingPage from "./Pages/landingpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelLandingPage from "./Pages/hotellanding";
import PaymentPage from "./Pages/paymentpage";

export default function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HotelLandingPage/>} />
        <Route path="/booking/:propertyName" element={<BookingPage/>} />
        <Route path="/payment" element={<PaymentPage/>} />

      </Routes>
    </Router>
      

    </>
  );
}