import Berkah from "views/masterData/Berkah"
import Pinjaman from "views/cicilan/Pinjaman"
import InputInsentif from "views/insentif/Insentif"
import DataPegawai from "views/masterData/dataPegawai"
var routesmaster = [
    {
        path: "/pegawai",
        name: "Data Pegawai",
        icon: "fa fa-users text-green",
        component: DataPegawai,
        layout: "/admin",
      },
    {
        path: "/berkah",
        name: "Potongan - Berkah",
        icon: "ni ni-credit-card text-red",
        component: Berkah,
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
];

export default routesmaster;