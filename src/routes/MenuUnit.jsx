import Index from "views/Dash/DashUnit";
import Insentif from "views/insentif/Insentif";

var routes = [
  {
    path: "/index",
    name: "Home Unit",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/unit",
  },
  {
    path: "/insentif",
    name: "Insentif",
    icon: "fa fa-money-bill-alt text-green",
    component: Insentif,
    layout: "/unit",
  }
];

export default routes;
