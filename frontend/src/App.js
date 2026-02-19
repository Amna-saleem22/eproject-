// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Pages
// import Home from "./components/Home"; // create a HomePage.jsx with your landing/home content
// import BookingForm from "./pages/BookingForm";
// import SummaryPage from "./pages/SummaryPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import PaymentPage from "./pages/PaymentPage";
// import InvoicePage from "./pages/InvoicePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage";
// import UpdateBookingPage from "./pages/UpdateBookingPage";
// import FeedbackPage from "./pages/FeedbackPage";
// // Components
// import About from "./components/About"; // create an About.jsx with your about content
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Room from "./components/Room"; // create a Room.jsx with your room content
// import Contact from "./components/Contact"; // create a Contact.jsx with your contact content
// // Protected Route
// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }

// export default function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* ================= PUBLIC ================= */}
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
// <Route path="/rooms" element={<Room />} />
//         <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
//         <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
// <Route path="/about" element={<About />} />
//         {/* ================= DASHBOARD ================= */}
//         <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

//         {/* ================= BOOKING ================= */}
//         <Route path="/booking" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
//         <Route path="/summary/:id" element={<ProtectedRoute><SummaryPage /></ProtectedRoute>} />
//         <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
//         <Route path="/payment/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
//         <Route path="/invoice/:id" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />

//         {/* ================= UPDATE BOOKING ================= */}
//         <Route path="/update-booking/:id" element={<ProtectedRoute><UpdateBookingPage /></ProtectedRoute>} />

//         {/* ================= FEEDBACK ================= */}
//         <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />

//         {/* ================= DEFAULT ================= */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./components/Home";
import BookingForm from "./pages/BookingForm";
import SummaryPage from "./pages/SummaryPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import InvoicePage from "./pages/InvoicePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UpdateBookingPage from "./pages/UpdateBookingPage";
import FeedbackPage from "./pages/FeedbackPage";
// Components
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Room from "./components/Room";
import Contact from "./components/Contact";

// Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />

        {/* ================= DASHBOARD ================= */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage>
              <BookingForm />
              <FeedbackPage />
            </DashboardPage>
          </ProtectedRoute>
        } />

        {/* ================= BOOKING ================= */}
        <Route path="/booking" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
        <Route path="/summary/:id" element={<ProtectedRoute><SummaryPage /></ProtectedRoute>} />
        <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/payment/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/invoice/:id" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />

        {/* ================= UPDATE BOOKING ================= */}
        <Route path="/update-booking/:id" element={<ProtectedRoute><UpdateBookingPage /></ProtectedRoute>} />

        {/* ================= FEEDBACK ================= */}
        <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />

        {/* ================= DEFAULT ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}