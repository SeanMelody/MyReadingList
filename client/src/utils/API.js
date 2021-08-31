// Import axios
import axios from "axios";

// set the api key to a const
const APIKEY = "&key=&key=AIzaSyCKu9i_PLjFCu47B2YF3PQAK7E2trvFyjk"

// set the base requestURL
const requestUrl = "https://www.googleapis.com/books/v1/volumes?q="

// export function for the axios API call yeay!

// eslint-disable-next-line
export default {
    // Set it to a function
    APISearch: function (query) {
        // console.log(requestUrl + query + APIKEY)
        return axios.get(requestUrl + query + APIKEY);
    }
};