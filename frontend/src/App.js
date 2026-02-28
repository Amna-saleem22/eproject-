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



// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Pages
// import Home from "./components/Home";
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
// import About from "./components/About";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Room from "./components/Room";
// import Contact from "./components/Contact";
// // NEW
// import AdminDashboard from "./pages/AdminDashboard";
// import StaffDashboard from "./pages/StaffDashboard";
// // Protected Route
// function ProtectedRoute({ children, allowedRole }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" replace />;

//   if (allowedRole && role !== allowedRole)
//     return <Navigate to="/" replace />;

//   return children;
// }

// export default function App() {
//   const token = localStorage.getItem("token");
//  const role = localStorage.getItem("role");

//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* ================= PUBLIC ================= */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/rooms" element={<Room />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route
//           path="/login"
//           element={
//             token ? (
//               role === "admin" ? (
//                 <Navigate to="/admin" />
//               ) : role === "staff" ? (
//                 <Navigate to="/staff" />
//               ) : (
//                 <Navigate to="/dashboard" />
//               )
//             ) : (
//               <LoginPage />
//             )
//           }
//         />
//         <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />

//         {/* ================= DASHBOARD ================= */}
//         <Route path="/dashboard" element={
//           <ProtectedRoute allowedRole="guest">
//             <DashboardPage>
//               <BookingForm />
//               <FeedbackPage />
//             </DashboardPage>
//           </ProtectedRoute>
//         } />

//          {/* STAFF */}
//         <Route
//           path="/staff"
//           element={
//             <ProtectedRoute allowedRole="staff">
//               <StaffDashboard />
//             </ProtectedRoute>
//           }
//         />


//         {/* ADMIN */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRole="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

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

// Role Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import Adminstat from "./pages/Adminstat";
import StaffDashboard from "./pages/StaffDashboard";
import AdminFeedback from "./pages/AdminFeedback";
import AdminRegisteredUsers from "./pages/AdminRegisteredUsers";
import AdminCreateStaff from "./pages/AdminCreateStaff";
import AdminStafflist from "./pages/AdminStafflist";
import AdminRooms from "./pages/AdminRooms";

// ================= PROTECTED ROUTE =================
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role does not match
  if (allowedRole && role !== allowedRole) {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "staff") return <Navigate to="/staff" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            token ? (
              role === "admin" ? (
                <Navigate to="/admin" />
              ) : role === "staff" ? (
                <Navigate to="/staff" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <LoginPage />
            )
          }
        />

        {/* ================= REGISTER (Guest Only) ================= */}
        <Route
          path="/register"
          element={
            token ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          }
        />

        {/* ================= GUEST DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="guest">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ================= STAFF DASHBOARD ================= */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminfeedback"
           element={
            <ProtectedRoute allowedRole="admin">
              <AdminFeedback />
            </ProtectedRoute>
          }
        />
        <Route/>
         <Route
          path="/adminusers"
           element={
            <ProtectedRoute allowedRole="admin">
              <AdminRegisteredUsers />
            </ProtectedRoute>
          }
        />
        <Route/>
 <Route/>
         <Route
          path="/adminstat"
           element={
            <ProtectedRoute allowedRole="admin">
              <Adminstat />
            </ProtectedRoute>
          }
        />
         <Route/>
         <Route
          path="/adminrooms"
           element={
            <ProtectedRoute allowedRole="admin">
              <AdminRooms />
            </ProtectedRoute>
          }
        />
        <Route/>
        
        <Route/>
         <Route
          path="/admincreatestaff"
           element={
            <ProtectedRoute allowedRole="admin">
              <AdminCreateStaff />
            </ProtectedRoute>
          }
        />
        <Route/>
         <Route/>
         <Route
          path="/adminstafflist"
           element={
            <ProtectedRoute allowedRole="admin">
              <AdminStafflist />
            </ProtectedRoute>
          }
        />
        <Route/>


        {/* ================= BOOKING FLOW ================= */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary/:id"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute>
              <InvoicePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-booking/:id"
          element={
            <ProtectedRoute>
              <UpdateBookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />

        {/* ================= DEFAULT ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}