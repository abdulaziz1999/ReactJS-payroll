import Index from "views/Index.js"
import Kredit from "views/kredit/Kredit"
import Cicilan from "views/cicilan/Cicilan"
import User from "views/user/User"
import Cutoff from "views/cutoff/CutOff"
import Unit from "views/unit/Unit"
import InputInsentif from "views/insentif/Insentif"
import ReviewGapok from "views/review/Review"
import ReviewJam from "views/reviewjam/Reviewtotal"
import ReviewInsentif from "views/reviewinsentif/Insentif"
import ReviewCicilan from "views/reviewcicilan/ReviewCicilan"
import ReviewLedger from "views/reviewledger/ReviewLedger"
import Pinjaman from "views/cicilan/Pinjaman"

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
    component: ReviewGapok,
    layout: "/admin",
  },
  {
    path: "/reviewtotal",
    name: "Review Jam - 4",
    icon: "ni ni-time-alarm text-blue",
    component: ReviewJam,
    layout: "/admin",
  },
  {
    path: "/reviewinsentif",
    name: "Review Insentif - 5",
    icon: "ni ni-single-copy-04 text-blue",
    component: ReviewInsentif,
    layout: "/admin",
  },
  {
    path: "/reviewcicilan",
    name: "Review Cicilan - 6",
    icon: "ni ni-credit-card text-blue",
    component: ReviewCicilan,
    layout: "/admin",
  },
  {
    path: "/reviewledger",
    name: "Review Ledger - 7",
    icon: "ni ni-map-big text-blue",
    component: ReviewLedger,
    layout: "/admin",
  },
  {
    path: "/kredit",
    name: "Cicilan - Berkah",
    icon: "ni ni-credit-card text-red",
    component: Kredit,
    layout: "/admin",
  },
  {
    path: "/cicilan",
    name: "Cicilan - Keuangan",
    icon: "ni ni-credit-card text-orange",
    component: Cicilan,
    layout: "/admin",
  },
  {
    path: "/pinjaman",
    name: "Pinjaman - Keuangan",
    icon: "ni ni-credit-card text-orange",
    component: Pinjaman,
    layout: "/admin",
  },
  {
    path: "/insentif",
    name: "Insentif - Unit",
    icon: "ni ni-credit-card text-green",
    component: InputInsentif,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Pengguna",
    icon: "ni ni-circle-08 text-orange",
    component: User,
    layout: "/admin",
  },
];

export default routes;
