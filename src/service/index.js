import Get from './Get'
import Post from './Post'
import Put from './Put'
import Delete from './Delete'

//API User
const getDataUser  = () => Get('user',true)
const postDataUser = (data) => Post('user',true,data)
const putDataUser  = (data) => Put(`user`,true,data)
const deleteUser   = (id) => Delete(`user/${id}`,true)

//API Kredit
const getDataKredit   = () => Get('kredit',true)
const getAllKredit    = () => Get('kredit/all',true)
const getDetailKredit = (id) => Get(`kredit/detail/${id}`,true)
const postDataKredit  = (data) => Post('kredit',true,data)

//API Cut Off
const getDataCutOff  = () => Get('cutoff/active',true)
const postDataCutOff = (data) => Post('cutoff',true,data)
const putDataCutOff  = (data) => Put('cutoff',true,data)
const deleteCutOff   = (id) => Delete(`cutoff/${id}`,true)

//API Review Gapok
const getDataGapok  = (id) => Get(`gapok/${id}`,true)
const postDataGapok = (id) => Post(`gapok/${id}`,true)

//API Review Jam Tambahan (Summary)
const getDataSummary = (id) => Get(`summary/${id}`,true)

//API Review Insentif
const getAllInsentif = () => Get(`insentif`,true)
const getInsentifPerCutOff = () => Get(`insentif/cutoff`,true)
const postDataInsentif = (data) => Post(`insentif`,true,data)
const postInsentifPegawai = (data) => Post(`insentifPegawai`,true,data)

const getDataInsentifCutoff = (id) => Get(`insentifCutoff/${id}`,true)
const postDataInsentifCutoff = (data) => Post(`insentifCutoff`,true,data)
const deleteDataInsentifCutoff = (id) => Delete(`insentifCutoff/${id}`,true)

//API Tunjangan
const getDataTunjangan  = () => Get(`tunjangan`,true)
const getDetailTunjangan  = (id) => Get(`tunjangan/${id}`,true)
const postDataTunjangan = (data) => Post(`tunjangan`,true,data)
const postTunjanganPegawai = (data) => Post(`tunjangan/pegawai`,true,data)

//API Pegawai
const getDataPegawai = () => Get('pegawai',true)

const kreditPegawai = (config) => Get('kredit',true,config)
const getPegawai    = () => Get('kredit',true)

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

    //API Kredit
    getDataKredit,
    getAllKredit,
    getDetailKredit,
    postDataKredit,

    //API Gapok
    getDataGapok,
    postDataGapok,

    //API Summary
    getDataSummary,

    //API Tunjangan
    getDataTunjangan,
    getDetailTunjangan,
    postDataTunjangan,
    postTunjanganPegawai,

    //API Insentif
    getAllInsentif,
    getDataInsentifCutoff,
    getInsentifPerCutOff,
    postDataInsentifCutoff,
    deleteDataInsentifCutoff,
    postDataInsentif,
    postInsentifPegawai,

    getDataPegawai,

    getPegawai,
    kreditPegawai,
}

export default API