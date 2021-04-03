import Index from "views/Index.js";
import Kredit from "views/kredit/Kredit";
// import Insentif from "views/insentif/Insentif";
import User from "views/user/User";
import Cutoff from "views/cutoff/CutOff";
import Unit from "views/unit/Unit";
import Review from "views/review/Review";
import ReviewTotal from "views/reviewtotal/Reviewtotal";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/cutoff",
    name: "Cutoff",
    icon: "ni ni-scissors text-blue",
    component: Cutoff,
    layout: "/admin",
  },
  {
    path: "/unit",
    name: "Pilih Unit",
    icon: "ni ni-map-big text-blue",
    component: Unit,
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
    path: "/reviewtotal",
    name: "Review Total",
    icon: "ni ni-map-big text-blue",
    component: ReviewTotal,
    layout: "/admin",
  },
  {
    path: "/kredit",
    name: "Kredit",
    icon: "ni ni-credit-card text-red",
    component: Kredit,
    layout: "/admin",
  },
  // {
  //   path: "/insentif",
  //   name: "Insentif",
  //   icon: "fa fa-money-bill-alt text-green",
  //   component: Insentif,
  //   layout: "/admin",
  // },
  {
    path: "/user",
    name: "User",
    icon: "ni ni-circle-08 text-orange",
    component: User,
    layout: "/admin",
  },
];

export default routes;
