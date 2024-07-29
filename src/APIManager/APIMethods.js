import axios from 'axios'
const BASE_URL="http://localhost:3000/"
axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')===null?"":localStorage.getItem('token')}`;
const getConcatenatedUrl=(url)=>{
    return BASE_URL+url;
}
class APIMethods{
    static async get(url){
        url=getConcatenatedUrl(url);
        return await axios.get(url);
    }
    static async post (url,params){
        url=getConcatenatedUrl(url);
        return await axios.post(url,params)
    }
    static async put(url,params){
        url=getConcatenatedUrl(url);
        return await axios.put(url,params)
    }
    static async delete(url){
        url=getConcatenatedUrl(url);
        return await axios.delete(url);
    }
}

export default APIMethods;