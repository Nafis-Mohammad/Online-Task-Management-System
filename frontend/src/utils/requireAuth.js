import { redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export async function requireAuth() {

    let isLoggedIn

    if (Cookies.get('userInfo')) {
        isLoggedIn = true
    }
    else {
        isLoggedIn = false
    }
    // console.log(data);
    

    if (!isLoggedIn) {
        throw redirect("/login")
    }
}