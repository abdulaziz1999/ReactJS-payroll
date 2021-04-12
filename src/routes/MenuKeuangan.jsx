import Index from "views/Dash/DashKeuangan";
import Insentif from "views/reviewinsentif/Insentif";

var routes = [
  {
    path: "/index",
    name: "Home Keuangan",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/keuangan",
  },
  {
    path: "/insentif",
    name: "Insentif",
    icon: "fa fa-money-bill-alt text-green",
    component: Insentif,
    layout: "/keuangan",
  }
];

export default routes;
