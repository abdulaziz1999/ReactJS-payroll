import axios from 'axios'
import { Rootpath,RootOnline } from "./Config"

const Get = (path,root) => {
    const promise = new Promise((resolve, reject) => {
        root ? axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token : delete axios.defaults.headers.common["Authorization"]
        axios.get(`${root ? RootOnline : Rootpath}/${path}`)
        .then((result) => {
            resolve(result.data)
        }, (err) => {
            reject(err)
      })
    })
    return promise
}

export default Get;