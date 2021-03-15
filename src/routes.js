import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Kredit from "views/examples/Tables.js";
import Insentif from "views/examples/Tablesnew.js";
import User from "views/examples/User";
// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  {
    path: "/tables",
    name: "Kredit",
    icon: "ni ni-credit-card text-red",
    component: Kredit,
    layout: "/admin",
  },
  {
    path: "/tablesnew",
    name: "Insentif",
    icon: "fa fa-money-bill-alt text-green",
    component: Insentif,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    icon: "ni ni-circle-08 text-orange",
    component: User,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];

export default routes;
