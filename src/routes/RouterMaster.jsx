import Berkah from "views/masterData/BerkahInput"
import MasterTunjangan from "views/masterData/MasterTunjangan"
import BerkahMaster from "views/masterData/BerkahMaster"
import InputInsentif from "views/insentif/Insentif"
import InsentifPegawai from "views/insentif/InsentifPegawai"
import Pinjaman from "views/cicilan/Pinjaman"
import DataPegawai from "views/masterData/dataPegawai"
import User from "views/user/User"

var routesmaster = [
      {
        path: "/pegawai",
        name: "Data Pegawai",
        icon: "fa fa-users text-green",
        component: DataPegawai,
        layout: "/admin",
      },
      {
        path: "/tunjangan",
        name: "Master Tunjangan",
        icon: "fa fa-users text-green",
        component: MasterTunjangan,
        layout: "/admin",
      },
      {
        path: "/berkahMaster",
        name: "Master Potongan ",
        icon: "ni ni-credit-card text-red",
        component: BerkahMaster,
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
        icon: "ni ni-credit-card text-info",
        component: Pinjaman,
        layout: "/admin",
      },
      {
        path: "/insentif",
        name: "Insentif - Unit",
        icon: "ni ni-credit-card text-primary",
        component: InputInsentif,
        layout: "/admin",
      },
      {
        path: "/insentifPegawai",
        name: "Insentif Pegawai - Unit",
        icon: "ni ni-credit-card text-primary",
        component: InsentifPegawai,
        layout: "/admin",
      },
      {
        path: "/user",
        name: "Pengguna",
        icon: "ni ni-circle-08 text-green",
        component: User,
        layout: "/admin",
      },
];

export default routesmaster;