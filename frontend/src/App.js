import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookingForm from "./pages/BookingForm";
import SummaryPage from "./pages/SummaryPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import InvoicePage from "./pages/InvoicePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Home Page = Booking Form */}
        <Route path="/" element={<BookingForm />} />

        {/* ✅ Booking Summary */}
        <Route path="/summary/:id" element={<SummaryPage />} />

        {/* ✅ Checkout Page */}
        <Route path="/checkout/:id" element={<CheckoutPage />} />

        {/* ✅ Payment Page */}
        <Route path="/payment/:id" element={<PaymentPage />} />

        {/* ✅ Invoice Page */}
        <Route path="/invoice/:id" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
