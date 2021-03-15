import Get from './Get'
import Post from './Post'
import Put from './Put'
import Delete from './Delete'

//POST
const postPegawai = (data) => Post('pegawai',false,data)

//PUT
const kreditPegawai = (config) => Get('kredit',true,config)
const putPegawai = (data,id) => Put(`pegawai/${id}`,false,data)

//DELETE
const deletePegawai = (id) => Delete(`pegawai/${id}`,false)

//GET
const getPegawai = () => Get('pegawai?_sort=id&_order=desc',false)
// const postKredit = (config) => Get('kredit',true,config)

const API = {
    getPegawai,
    postPegawai,
    putPegawai,
    deletePegawai,
    kreditPegawai,
    // postKredit
}

export default API