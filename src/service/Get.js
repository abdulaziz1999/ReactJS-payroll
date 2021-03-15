import axios from 'axios'
import { Rootpath,RootOnline } from "./Config"

const Get = (path,root) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${root ? RootOnline : Rootpath}/${path}`)
        .then((result) => {
            resolve(result.data)
        }, (err) => {
            reject(err)
      });
    })
    return promise
}

export default Get;