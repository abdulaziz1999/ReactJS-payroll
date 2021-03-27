import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Kredit from "views/kredit/Kredit";
import Insentif from "views/insentif/Insentif";
import User from "views/user/User";
import Review from "views/review/Review";
import Cutoff from "views/cutoff/CutOff";
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
    path: "/cutoff",
    name: "Cutoff",
    icon: "ni ni-scissors text-blue",
    component: Cutoff,
    layout: "/admin",
  },
  {
    path: "/review",
    name: "Review",
    icon: "ni ni-map-big text-blue",
    component: Review,
    layout: "/admin",
  },
  {
    path: "/kredit",
    name: "Kredit",
    icon: "ni ni-credit-card text-red",
    component: Kredit,
    layout: "/admin",
  },
  {
    path: "/insentif",
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
