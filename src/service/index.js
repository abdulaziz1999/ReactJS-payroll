import Get from './Get'
import Post from './Post'
import Put from './Put'
import Delete from './Delete'

//API User
const getDataUser = () => Get('user',true)
const postDataUser = (data) => Post('user',true,data)
const putDataUser = (data) => Put(`user`,true,data)
const deleteUser = (id) => Delete(`user/${id}`,true)

const kreditPegawai = (config) => Get('kredit',true,config)
const getPegawai = () => Get('kredit',true)

const API = {
    //API User
    getDataUser,
    postDataUser,
    putDataUser,
    deleteUser,

    getPegawai,
    kreditPegawai,
}

export default API