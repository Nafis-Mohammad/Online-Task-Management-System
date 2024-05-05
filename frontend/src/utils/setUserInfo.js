import Cookies from 'js-cookie';

export async function setUserInfo(data) {
    console.log(data);
    data.headers.authorization = `Bearer ${data.data.token}`
    Cookies.set('userInfo', JSON.stringify(data.headers.authorization))
}