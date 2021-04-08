import Index from "views/Index.js";
import Kredit from "views/kredit/Kredit";
import Insentif from "views/insentif/Insentif";
import User from "views/user/User";
import Cutoff from "views/cutoff/CutOff";
import Unit from "views/unit/Unit";
import Review from "views/review/Review";
import ReviewTotal from "views/reviewtotal/Reviewtotal";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/cutoff",
    name: "Cutoff - 1",
    icon: "ni ni-scissors text-blue",
    component: Cutoff,
    layout: "/admin",
  },
  {
    path: "/unit",
    name: "Pilih Unit - 2",
    icon: "ni ni-building text-blue",
    component: Unit,
    layout: "/admin",
  },
  {
    path: "/review",
    name: "Review Gapok - 3",
    icon: "ni ni-money-coins text-blue",
    component: Review,
    layout: "/admin",
  },
  {
    path: "/reviewtotal",
    name: "Review Total - 4",
    icon: "ni ni-time-alarm text-blue",
    component: ReviewTotal,
    layout: "/admin",
  },
  {
    path: "/insentif",
    name: "Review Insentif - 5",
    icon: "ni ni-credit-card text-blue",
    component: Insentif,
    layout: "/admin",
  },
  {
    path: "/kredit",
    name: "Kredit",
    icon: "ni ni-credit-card text-blue",
    component: Kredit,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    icon: "ni ni-circle-08 text-blue",
    component: User,
    layout: "/admin",
  },
];

export default routes;
