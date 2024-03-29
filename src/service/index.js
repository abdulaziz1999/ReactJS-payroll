import Get from './Get'
import Post from './Post'
import Put from './Put'
import Delete from './Delete'
import GetClear from './GetClear'

//API kepegawaian
const getUnit = () => Get('lembaga',false)
const getUnitById = (id) => Get(`lembagaById/${id}`,false)

//API Menu
const getMenu = (id) => Get(`menu/${id}`,true)
const postLogMenu = (data) => Post(`menu`,true,data)

//API User
const getDataUser  = () => Get('user',true)
const postDataUser = (data) => Post('user',true,data)
const putDataUser  = (data) => Put(`user`,true,data)
const deleteUser   = (id) => Delete(`user/${id}`,true)

//API Kredit
const getDataKredit   = () => Get('kredit',true)
const getDetailKreditP= (id) => Get(`kredit/pegawai/${id}`,true)
const getAllKredit    = () => Get('kredit/all',true)
const getDetailKredit = (id) => Get(`kredit/detail/${id}`,true)
const postDataKredit  = (data) => Post('kredit',true,data)

//API Cut Off
const getDataCutOff  = () => Get('cutoff/active',true)
const getRangeTgl    = () => Get('cutoff',true)
const postDataCutOff = (data) => Post('cutoff',true,data)
const putDataCutOff  = (data,id) => Put(`cutoff/${id}`,true,data)
const deleteCutOff   = (id) => Delete(`cutoff/${id}`,true)

//API Review Gapok
const getDataGapok  = (id) => Get(`gapok/${id}`,true)
const postDataGapok = (id) => Post(`gapok/${id}`,true)

//API Review Jam Tambahan (Summary)
const getDataSummary = (id) => Get(`summary/${id}`,true)
const getSyncSummary = (id) => Get(`summary/sync/${id}`,true)

//API Review Insentif / Kegiatan
const getAllInsentif = () => Get(`kegiatan`,true)
const getKegiatanId = (id) => Get(`kegiatan/${id}`,true)
const postDataInsentif = (data) => Post(`kegiatan`,true,data)
const putKegiatan = (data) => Put(`kegiatan`,true,data)
const deleteKegiatan = (id) => Delete(`kegiatan/${id}`,true)

const getDetailKegiatan = (id) => Get(`kegiatan/${id}`,true)
const postDetailKegiatan = (data) => Post(`kegiatan/detail`,true,data)
const putDetailKegiatan = (data) => Put(`kegiatan/detail`,true,data)
const deleteDetailKegiatan = (id) => Delete(`kegiatan/detail/${id}`,true)

const getInsentifPerCutOff = () => Get(`insentif`,true)
const postInsentifPegawai = (data) => Post(`insentifPegawai`,true,data)
const getDataInsentifCutoff = (id) => Get(`insentifCutoff/${id}`,true)
const postDataInsentifCutoff = (data) => Post(`insentifCutoff`,true,data)
const deleteDataInsentifCutoff = (id) => Delete(`insentifCutoff/${id}`,true)

//API Tunjangan
const getDataTunjangan  = () => Get(`tunjangan`,true)
const getDetailTunjangan  = (id) => Get(`tunjangan/${id}`,true)
const postDataTunjangan = (data) => Post(`tunjangan`,true,data)
const postTunjanganPegawai = (data) => Post(`tunjangan/pegawai`,true,data)

//API Tunjangan Role
const postRoleTunjangan = (data) => Post(`tunjangan/role`,true,data)
const putRoleTunjangan = (data) => Put(`tunjangan/role/update`,true,data)
const deleteRoleTunjangan = (id) => Delete(`tunjangan/role/${id}`,true)

// API Master Tunjangan
const getTunjangan = () => Get(`tunjangan`,true)
const postTunjangan = (data) => Post(`tunjangan`,true,data)
const putTunjangan = (data) => Put(`tunjangan`,true,data)
const deleteTunjangan = (id) => Delete(`tunjangan/${id}`,true)

//API Pegawai
const getDataPegawai = () => Get('pegawai',true)
const getSycnPegawai = () => Get('syncPegawai',true)

//API Kredit
const kreditPegawai = (config) => Get('kredit',true,config)
const getPegawai    = () => Get('kredit',true)

//API Master Potongan
const postPotongan = (data) => Post(`potongan`,true,data)
const putPotongan = (data) => Put(`potongan`,true,data)
const deletePotongan = (id) => Delete(`potongan/${id}`,true)

//API Potongan Pegawai
const postPotonganPegawai = (id,data) => Post(`potongan/pegawai/${id}`,true,data)

//API Potongan
const getAllPotongan = () => Get('potongan',true)
const postAllPotongan = (data) => Post('potongan',true,data)
const PotonganKredit = (data) => Post('potongan/pegawai/kredit',true,data)
const getPotonganRangeTgl = (jenis,idlembaga,startDate,endDate) => Get(`potongan/${jenis}/${idlembaga}/${startDate}/${endDate}`,true)
const getPotonganAllLembaga = (jenis,startDate,endDate) => Get(`potongan/pegawai/${jenis}/${startDate}/${endDate}`,true)

const postPotonganRangeTgl = (idlembaga,startDate,endDate) => Post(`potongan/kredit/${idlembaga}/${startDate}/${endDate}`,true)
const postPotonganCutoff = (idlembaga,idcutoff) => Get(`potongan/kredit/${idlembaga}/${idcutoff}`,true)
const getPotonganAll = (idlembaga,idcutoff) => Get(`potongan/all/${idlembaga}/${idcutoff}`,true)

//API Ledger Akhir
const getReviewLedger = (idlembaga,idcutoff) => Get(`review/${idlembaga}/${idcutoff}`,true)

//API Clear Chache
const hapusChache = () => GetClear('clear-cache',true)

//API Import Plafon
const importPlafon = (data) => Post(`import-plafon`,true,data)

//API master jam wajib
const getJamWajib = () => Get(`master/jamwajib`,true)
const postJamWajib = (data) => Post(`master/jamwajib`,true,data)
const putJamWajib = (id,data) => Put(`master/jamwajib/${id}`,true,data)
const delJamWajib = (id) => Delete(`master/jamwajib/${id}`,true)

//API master index
const getMasterIndex = () => Get(`master/index`,true)
const postMasterIndex = (data) => Post(`master/index`,true,data)
const putMasterIndex = (id,data) => Put(`master/index/${id}`,true,data)
const delMasterIndex = (id) => Delete(`master/index/${id}`,true)

const API = {
    //API User
    getDataUser,
    postDataUser,
    putDataUser,
    deleteUser,

    //API Cut Off
    getDataCutOff,
    postDataCutOff,
    putDataCutOff,
    deleteCutOff,
    getRangeTgl,

    //API Kredit
    getDataKredit,
    getDetailKreditP,
    getAllKredit,
    getDetailKredit,
    postDataKredit,

    //API Gapok
    getDataGapok,
    postDataGapok,

    //API Summary
    getDataSummary,
    getSyncSummary,

    //API Tunjangan
    getDataTunjangan,
    getDetailTunjangan,
    postDataTunjangan,
    postTunjanganPegawai,

    //API master tunjangan
    getTunjangan,
    postTunjangan,
    putTunjangan,
    deleteTunjangan,

    //API role tunjangan
    postRoleTunjangan,
    putRoleTunjangan,
    deleteRoleTunjangan,

    //API Insentif
    getAllInsentif,
    putKegiatan,
    deleteKegiatan,
    getDetailKegiatan,
    postDetailKegiatan,
    putDetailKegiatan,
    deleteDetailKegiatan,

    getDataInsentifCutoff,
    getInsentifPerCutOff,
    postDataInsentifCutoff,
    deleteDataInsentifCutoff,
    postDataInsentif,
    postInsentifPegawai,
    getKegiatanId,
    
    //API Pegawai Master data
    getDataPegawai,
    getSycnPegawai,

    //API Lembaga
    getUnit,
    getUnitById,

    //API Menu
    getMenu,
    postLogMenu,

    //API master potongan
    postPotongan,
    putPotongan,
    deletePotongan,
    postPotonganPegawai,

    //API potongan
    getAllPotongan,
    postAllPotongan,
    PotonganKredit,
    getPotonganRangeTgl,
    postPotonganRangeTgl,
    postPotonganCutoff,
    getPotonganAll,
    getPotonganAllLembaga,

    //API review ledger akhir
    getReviewLedger,
    getPegawai,
    kreditPegawai,
    hapusChache,

    //API Import Plafon
    importPlafon,

    //API master jam wajib
    getJamWajib,
    postJamWajib,
    putJamWajib,
    delJamWajib,

    //API master index
    getMasterIndex,
    postMasterIndex,
    putMasterIndex,
    delMasterIndex,
}

export default API