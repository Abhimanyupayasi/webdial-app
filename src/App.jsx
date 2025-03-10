import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Verify from "./Components/Forms/Verify";
import MagicLogin from "./pages/Register";
import LoginPage from "./Components/Forms/Login";
import Dashboard from "./Components/Dashboard";
import AuthLayout from "./Components/Layouts/AuthLayout";
import AdminLayout from "./Components/Layouts/AdminLayout";

import ServiceForm from "./Components/admin/CreateService";
import ServiceList from "./Components/admin/FetchServices";
import Home from "./pages/HomePage";
import ServiceDeleteList from "./Components/DeleteServices";
import Redirect from "./Components/Redirect";
import OrderPage from "./Components/products/OrderPage";
import OrderSuccess from "./Components/products/OrderSuccess";
import ViewOrders from "./Components/admin/ViewOrders";
import ViewSingleOrder from "./Components/admin/ViewSingleOrder";
import AdminNotification from "./Components/admin/AdminNotification";
import Footer from "./Components/Footer";
import FetchUserOrders from "./Components/users/FetchUserOrders";
import UserNotification from "./Components/users/UserNotification";
import UserProfile from "./Components/users/UserProfile";
import EditProfile from "./Components/users/EditProfile";
import FreelancingRequest from "./freelancing/FreelancingRequest";
// import ViewSingleOrder from "./Components/admin/ViewSingleOrder";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<MagicLogin />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home/>} />
         <Route path="/services" element={<FreelancingRequest/>} />
        {/*<Route path="/team" element={<Redirect url={`https://www.webdial.in/our-team/`}/>} />
        <Route path="/contact" element={<Redirect url={`https://www.webdial.in/contact-us/`}/>} />
        <Route path="/company" element={<Redirect url={`https://www.webdial.in/projects/`}/>} /> */}
        <Route path="/marketplace" element={<ServiceList/>}/>
        <Route path="/freelancing" element={<FreelancingRequest/>}/>
        
        <Route path="/" element={<Home/>} />

        {/* Protected Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<FetchUserOrders/>} />
          <Route path="/notifications" element={<UserNotification/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/order/:productId" element={<OrderPage />} />
          <Route path="/order-success/:productId" element={<OrderSuccess />} />
        </Route>

        {/* Admin Route*/}
       <Route element={<AdminLayout/>}>
          
          <Route path='/admin/create-service' element={<ServiceForm/>}/>
          <Route path='/admin/service-view' element={<ServiceList/>}/>
          <Route path='/admin/notification' element={<AdminNotification/>}/>
          <Route path='/admin/service-delete' element={<ServiceDeleteList/>}/>
          <Route path="/admin/view-orders" element={<ViewOrders/>} />
          <Route path="/admin/view-orders/:orderId" element={<ViewSingleOrder/>} />
       </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
