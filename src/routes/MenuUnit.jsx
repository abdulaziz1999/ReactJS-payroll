import Index from "views/Dash/DashUnit";
// import InputInsentif from "views/insentif/Insentif"
import InsentifPegawai from "views/insentif/InsentifPegawai"

var routes = [
  {
    path: "/index",
    name: "Home Unit",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/unit",
  },
  {
    path: "/insentifPegawai",
    name: "Insentif Pegawai - Unit",
    icon: "ni ni-credit-card text-primary",
    component: InsentifPegawai,
    layout: "/unit",
  },
];

export default routes;
