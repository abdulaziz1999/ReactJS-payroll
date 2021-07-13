import Index from "views/Dash/DashKeuangan";
import Pinjaman from "views/review/Review";

var routes = [
  {
    path: "/index",
    name: "Home Keuangan",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/keuangan",
  },
  {
    path: "/review",
    name: "Pinjaman",
    icon: "fa fa-money-bill-alt text-green",
    component: Pinjaman,
    layout: "/keuangan",
  }
];

export default routes;
