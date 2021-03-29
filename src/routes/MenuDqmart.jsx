import Index from "views/Dash/DashDqmart";
import Kredit from "views/kredit/Kredit";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/dqmart",
  },
  {
    path: "/kredit",
    name: "Kredit",
    icon: "ni ni-credit-card text-red",
    component: Kredit,
    layout: "/dqmart",
  }
];

export default routes;
