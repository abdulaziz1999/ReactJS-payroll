import Index from "views/Index.js"
import Cutoff from "views/cutoff/CutOff"
import Unit from "views/unit/Unit"
import ReviewGapok from "views/review/Review"
import ReviewJam from "views/reviewjam/Reviewtotal"
import ReviewInsentif from "views/reviewinsentif/Insentif"
import ReviewCicilan from "views/reviewcicilan/ReviewCicilan"
import ReviewLedger from "views/reviewledger/ReviewLedger"
import KirimData from "views/kirim/Kirim"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/cutoff",
    name: "Cutoff - 1",
    icon: "ni ni-scissors text-primary",
    component: Cutoff,
    layout: "/admin",
  },
  {
    path: "/unit",
    name: "Pilih Unit - 2",
    icon: "ni ni-building text-primary",
    component: Unit,
    layout: "/admin",
  },
  {
    path: "/rev_gapok",
    name: "Review Gapok - 3",
    icon: "ni ni-money-coins text-primary",
    component: ReviewGapok,
    layout: "/admin",
  },
  {
    path: "/rev_jam",
    name: "Review Jam - 4",
    icon: "ni ni-time-alarm text-primary",
    component: ReviewJam,
    layout: "/admin",
  },
  {
    path: "/rev_insentif",
    name: "Review Insentif - 5",
    icon: "ni ni-single-copy-04 text-primary",
    component: ReviewInsentif,
    layout: "/admin",
  },
  {
    path: "/rev_cicilan",
    name: "Review Cicilan - 6",
    icon: "ni ni-credit-card text-primary",
    component: ReviewCicilan,
    layout: "/admin",
  },
  {
    path: "/rev_ledger",
    name: "Review Ledger - 7",
    icon: "ni ni-map-big text-primary",
    component: ReviewLedger,
    layout: "/admin",
  },
  {
    path: "/kirim",
    name: "Kirim Data - 8",
    icon: "ni ni-send text-primary",
    component: KirimData,
    layout: "/admin",
  },
];

export default routes;
