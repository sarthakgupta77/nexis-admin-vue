import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";


// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const authApi = axios.create({
    baseURL: "https://genesis.datatrained.com/api/admin/"
});

const api = axios.create({
    baseURL: "https://genesis.datatrained.com/api/admin/",
    headers: {
        Authorization: 'Bearer ' + LocalStorage.getItem('dt_key')
    }
});
const api2 = axios.create({
    baseURL: "https://genesis.datatrained.com/api/admin/dashboard",
    headers: {
        Authorization: 'Bearer ' + LocalStorage.getItem('dt_key')
    }
});

const local = axios.create({
    baseURL: "http://127.0.0.1:8000/api/admin/",
    headers: {
        Authorization: 'Bearer ' + LocalStorage.getItem('dt_key')
    }
});

export default boot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = authApi;

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export { authApi, api, api2, local };
