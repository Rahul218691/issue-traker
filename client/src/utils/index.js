import CryptoJS from 'crypto-js';
import { APP_CONFIGS } from '../config';

export const randomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000)
}


export const dateFormat = (date) => {
    if (!date) return '-'
    const newDate = new Date(date)
    const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).format(newDate)
    return formatted
}

export const encryptData =(name,data)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), APP_CONFIGS.CRYPTO_SECRET).toString();
    localStorage.setItem(name, encrypted);
}

export const decryptData = (name) => {
    const encrypted = localStorage.getItem(name);
    const decrypted = CryptoJS.AES.decrypt(encrypted, APP_CONFIGS.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}

export const debounceFunction = (func) => {
    let timer;
    return function(...args) {
        const context = this;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(context, args)
        }, 500)
    }
}

export const importFileValidations = (file) => {
    if (!file) return false
    var validExts = new Array(".csv")
    let fileExt = file.name
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        return false
    } else {
        return true
    }
}

export const imageValidations = (file) => {
    if (!file) return false
    const ext = ['.jpg', '.jpeg', '.png'];
    return ext.some(el => file.name.endsWith(el));
}