import Index from "views/Dash/DashDqmart";
import Berkah from "views/masterData/BerkahInput"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/dqmart",
  },
  {
    path: "/berkah",
    name: "Potongan",
    icon: "ni ni-credit-card text-red",
    component: Berkah,
    layout: "/dqmart",
  }
];

export default routes;
