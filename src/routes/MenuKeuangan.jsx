import Index from "views/Dash/DashKeuangan";
import Insentif from "views/cicilan/Pinjaman";
import Unit from "views/unit/Unit"
import ReviewGapok from "views/review/Review"
import ReviewJam from "views/reviewjam/Reviewtotal"
import ReviewInsentif from "views/reviewinsentif/Insentif"
import ReviewCicilan from "views/reviewcicilan/ReviewCicilan"
import ReviewLedger from "views/reviewledger/ReviewLedger"

var routes = [
  {
    path: "/index",
    name: "Home Keuangan",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/keuangan",
  },
  {
    path: "/pinjaman",
    name: "Pinjaman",
    icon: "fa fa-money-bill-alt text-green",
    component: Insentif,
    layout: "/keuangan",
  },
  {
    path: "/unit",
    name: "Pilih Unit - 2",
    icon: "ni ni-building text-blue",
    component: Unit,
    layout: "/keuangan",
  },
  {
    path: "/review",
    name: "Review Gapok - 3",
    icon: "ni ni-money-coins text-blue",
    component: ReviewGapok,
    layout: "/keuangan",
  },
  {
    path: "/reviewtotal",
    name: "Review Jam - 4",
    icon: "ni ni-time-alarm text-blue",
    component: ReviewJam,
    layout: "/keuangan",
  },
  {
    path: "/reviewinsentif",
    name: "Review Insentif - 5",
    icon: "ni ni-single-copy-04 text-blue",
    component: ReviewInsentif,
    layout: "/keuangan",
  },
  {
    path: "/reviewcicilan",
    name: "Review Cicilan - 6",
    icon: "ni ni-credit-card text-blue",
    component: ReviewCicilan,
    layout: "/keuangan",
  },
  {
    path: "/reviewledger",
    name: "Review Ledger - 7",
    icon: "ni ni-map-big text-blue",
    component: ReviewLedger,
    layout: "/keuangan",
  },
];

export default routes;
