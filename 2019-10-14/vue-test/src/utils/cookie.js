import Cookies from "js-cookie"

const defaultData = new Date(new Date().getTime() + 120 * 60 * 1000)

function setCookie(key, value, data = defaultData) {
    Cookies.set(key, value, { expires: data })
}

function getCookit(key) {
    return Cookies.get(key);
}

function removeCookit(key) {
    Cookies.remove(key)
}

export {
    setCookie,
    getCookit,
    removeCookit
}