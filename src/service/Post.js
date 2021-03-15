import axios from 'axios';
import { Rootpath,RootOnline } from "./Config";

const Post = (path,root,data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${root ? RootOnline : Rootpath}/${path}`,data)
        .then((result) => {
            resolve(result)
        }, (err) => {
            reject(err)
      });
    })
    return promise
}

export default Post;