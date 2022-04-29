import Admin from "./pages/Admin";
import Likes from "./pages/Likes";
import Market from "./pages/Market";
import Auth from "./pages/Auth";
import CarPage from "./pages/CarPage";
import Registration from "./pages/Registration";
import Adt from "./pages/Adt";
import {
  ADMIN_ROUTE,
  LIKES_ROUTE,
  MARKET_ROUTE,
  LOGIN_ROUTE,
  ADT_ROUTE,
  REGISTRATION_ROUTE,
  CAR_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: LIKES_ROUTE,
    Component: Likes,
  },
  {
    path: ADT_ROUTE,
    Component: Adt,
  }
];

export const publicRoutes = [
  {
    path: MARKET_ROUTE,
    Component: Market,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: CAR_ROUTE + "/:id",
    Component: CarPage,
  },
];
