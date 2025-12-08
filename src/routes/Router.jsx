import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/Errors/ErrorPage";
import LoadingPage from "../pages/Loading/LoadingPage";
import Home from "../pages/Home/Home";
import PrivateRouter from "./PrivateRouter";
import VendorRouter from "./VendorRouter";
import AdminRouter from "./AdminRouter";
import Vendor from "../pages/Vendor/Vendor";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import TicketDetails from "../pages/Ticket/TicketDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AddTickets from "../pages/Dashboard/Vendors/AddTickets";
import MyInventory from "../pages/Dashboard/Vendors/MyInventory";
import MyOrders from "../pages/Dashboard/Users/MyOrders";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageOrders from "../pages/Dashboard/Vendors/ManageOrders";
import DashboardLayout from "../layouts/DashboardLayout";
import About from "../pages/About/About";
import AllTicket from "../pages/AllTicket/AllTicket";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <LoadingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/ticket",
        element: <AllTicket />,
      },
      {
        path: "/branches",
        element: <Home />,
      },
      {
        path: "/ticket/:id",
        element: <TicketDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  // auth
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "forget-password",
        Component: ForgetPassword,
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <Statistics />
          </PrivateRouter>
        ),
      },
      // vendors
      {
        path: "add-ticket",
        element: (
          <PrivateRouter>
            <AddTickets />
          </PrivateRouter>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRouter>
            <VendorRouter>
              <MyInventory />
            </VendorRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRouter>
            <VendorRouter>
              <ManageOrders />
            </VendorRouter>
          </PrivateRouter>
        ),
      },
      // admin
      {
        path: "manage-users",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <ManageUsers />
            </AdminRouter>
          </PrivateRouter>
        ),
      },

      // users
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRouter>
            <MyOrders />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
