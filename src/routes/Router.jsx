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

import MyOrders from "../pages/Dashboard/Users/MyOrders";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageOrders from "../pages/Dashboard/Vendors/ManageOrders";
import DashboardLayout from "../layouts/DashboardLayout";
import About from "../pages/About/About";
import AllTicket from "../pages/AllTicket/AllTicket";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import ApproveVendors from "../pages/Dashboard/Admin/ApproveVendors";
import Branch from "../pages/Branch/Branch";
import ApprovedTicket from "../pages/Dashboard/Admin/ApprovedTicket";
import MyAddedTickets from "../pages/Dashboard/Vendors/MyAddedTickets";
import RevenueOverview from "../pages/Dashboard/Vendors/RevenueOverview";
import Advertise from "../pages/Dashboard/Admin/Advertise";
import AdvertiseDetails from "../pages/Ticket/AdvertiseDetails";

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
        path: "/branch",
        element: <Branch />,
      },
      {
        path: "/ticket/:id",
        element: <TicketDetails />,
      },
      {
        path: "/advertise/:id",
        element: <AdvertiseDetails />,
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
        Component: DashboardHome,
      },
      // vendors
      {
        path: "add-tickets",
        element: (
          <VendorRouter>
            <AddTickets />
          </VendorRouter>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <VendorRouter>
            <MyAddedTickets />
          </VendorRouter>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <VendorRouter>
            <ManageOrders />
          </VendorRouter>
        ),
      },
      {
        path: "revenue",
        element: <RevenueOverview />,
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
      {
        path: "approve-vendors",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <ApproveVendors />
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "approve-ticket",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <ApprovedTicket />
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "advertise",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <Advertise />
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
