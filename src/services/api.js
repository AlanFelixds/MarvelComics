import axios from "axios";
import md5 from 'md5';

const publicKey = "3bb25386993945e7bfef937cd3b9e193"
const privateKey = "038a838971617d24f908da6ff53fffcb783dd447"
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey)


const api = axios.create({

    baseURL: "http://gateway.marvel.com/v1/public",
    params: {
        ts: time,
        apikey: publicKey,
        hash: hash,
    }
});



export default api;