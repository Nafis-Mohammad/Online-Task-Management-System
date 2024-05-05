import Cookies from 'js-cookie'

export async function getUserInfo() {
    const bearerToken = JSON.parse(Cookies.get('userInfo'))
    return {headers: {authorization: bearerToken}}
}