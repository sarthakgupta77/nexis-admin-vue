import { LocalStorage, Notify } from "quasar";
import { authApi, api, local } from 'boot/axios'
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const token = LocalStorage.getItem("dt_key")
const access = LocalStorage.getItem('access_key')


export default ({ router }) => {
  router.beforeEach(async (to, from, next) => {


    if (token) {

      api.get("permissions", {
        params: {
          email: LocalStorage.getItem('email')
        }
      }).then(response => {
        LocalStorage.set('access_key', response.data.permissions)
      });


      // Now you need to add your authentication logic here, like calling an API endpoint
      authApi.post('auth/getAuthenticatedUser', {
        token: token
      })
        .then((res) => {
          // console.log(res)
          // if (res.data.msg == "Token Invalid" || res.data.msg == "Token Absent") {
          //     LocalStorage.remove('dt_key')
          // }
          // else if (res.data.msg == "Token Expired") {
          //     api.post('auth/refresh', {
          //         token: LocalStorage.getItem('dt_key')
          //     }).then((res) => {
          //         LocalStorage.set('dt_key', res.data.access_token)
          //     })
          //     // localStorage.setItem('email', res.data.user.email)
          // }
        }).catch((err) => {
          console.log(err)
        })


    }




    const permissions = []
    if (access) {
      access.forEach((item) => {
        let ele = item.split('.')[0]
        if (!permissions.includes(ele)) {
          permissions.push(ele)
        }
      })
    }



    if (!token && to.path !== "/login") {
      next("/login");
    } else if (token && to.path === "/login") {
      next("/")
    } else {
      if (to.meta.auth === true) {
        if (access.includes(to.meta.code) || permissions.includes(to.meta.code)) {
          to.meta.auth = false
          // next()
        } else {
          Notify.create({
            timeout: 3000,
            position: 'top-right',
            type: 'negative',
            message: "You Don't have Permission to Visit this Page..."
          })
          setTimeout(function () { router.push(from.path, null, { shallow: true }) }, 0)
        }
      }

      next()
    }
  })
}
9