import { lazy, Suspense, type ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/index";
import DevRoutes from "./DevRoute";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("../pages/Auth/Login"));
const RegisterPage = lazy(() => import("../pages/Auth/Register"));
const Chats = lazy(() => import("../pages/Chats"));
const ErrorPage = lazy(() => import("../pages/Error"));
const Profile = lazy(() => import("../pages/Profile"));
const Notification = lazy(() => import("../pages/Sample/Notification"));

interface RouteLoaderProps {
  label?: string;
}

function RouteLoader({ label = "Loading page..." }: RouteLoaderProps) {
  return (
    <div role="status" aria-live="polite" className="route-loader">
      <span>{label}</span>
    </div>
  );
}

function withSuspense(
  element: ReactNode,
  fallback: ReactNode = <RouteLoader />
): ReactNode {
  return <Suspense fallback={fallback}>{element}</Suspense>;
}

export const router: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "register",
        element: withSuspense(<RegisterPage />),
      },
      {
        path: "sample",
        element: <DevRoutes />,
        children: [
          {
            path: "toasts",
            element: withSuspense(<Notification />),
          },
        ],
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: withSuspense(
              <Profile />,
              <RouteLoader label="Loading profile..." />
            ),
          },
        ],
      },
      {
        path: "chat",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: withSuspense(
              <Chats />,
              <RouteLoader label="Loading chats..." />
            ),
          },
        ],
      },
      {
        path: "*",
        element: withSuspense(<ErrorPage />),
      },
    ],
  },
];