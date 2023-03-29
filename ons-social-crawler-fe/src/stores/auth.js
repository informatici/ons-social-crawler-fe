import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "../core/services/ApiService";
// import JwtService from "@/core/services/JwtService";

//
// export const useAuthStore = defineStore({
//   id: 'auth',
//   state: () => ({
//     errors: {},
//     user: {},
//     isAuthenticated: false,
//   }),
//   actions: {
//     setAuth(authUser) {
//       this.isAuthenticated = true;
//       this.user = authUser;
//       this.errors = {};
//       // JwtService.saveToken(user.value.api_token);
//     },
//
//     setError(error) {
//       this.errors = { ...error };
//     },
//
//     purgeAuth() {
//       this.isAuthenticated = false;
//       this.user = {};
//       this.errors = [];
//       // JwtService.destroyToken();
//     },
//
//     login(credentials) {
//       // return ApiService.post("login", credentials)
//       //     .then(({ data }) => {
//       //       setAuth(data);
//       //     })
//       //     .catch(({ response }) => {
//       //       setError(response.data.errors);
//       //     });
//     },
//
//     logout() {
//       this.purgeAuth();
//     },
// //
// // function register(credentials) {
// //   return ApiService.post("register", credentials)
// //     .then(({ data }) => {
// //       setAuth(data);
// //     })
// //     .catch(({ response }) => {
// //       setError(response.data.errors);
// //     });
// // }
// //
// // function forgotPassword(email: string) {
// //   return ApiService.post("forgot_password", email)
// //     .then(() => {
// //       setError({});
// //     })
// //     .catch(({ response }) => {
// //       setError(response.data.errors);
// //     });
// // }
//
//     verifyAuth() {
//       // if (JwtService.getToken()) {
//       //   ApiService.setHeader();
//       //   ApiService.post("verify_token", { api_token: JwtService.getToken() })
//       //     .then(({ data }) => {
//       //       setAuth(data);
//       //     })
//       //     .catch(({ response }) => {
//       //       setError(response.data.errors);
//       //       purgeAuth();
//       //     });
//       // } else {
//       //   purgeAuth();
//       // }
//
//       this.purgeAuth()
//     }
//
// }
// })


export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref({});
  // const isAuthenticated = ref(!!JwtService.getToken());
  const isAuthenticated = ref(true);

  function setAuth(authUser) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    // JwtService.saveToken(user.value.api_token);
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {};
    errors.value = [];
    // JwtService.destroyToken();
  }

  function login(credentials = {}) {
    setAuth(credentials)

    // return ApiService.post("login", credentials)
    //   .then(({ data }) => {
    //     setAuth(data);
      // })
      // .catch(({ response }) => {
      //   setError(response.data.errors);
      // });
  }

  function logout() {
    purgeAuth();
  }
  //
  // function register(credentials) {
  //   return ApiService.post("register", credentials)
  //     .then(({ data }) => {
  //       setAuth(data);
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }
  //
  // function forgotPassword(email: string) {
  //   return ApiService.post("forgot_password", email)
  //     .then(() => {
  //       setError({});
  //     })
  //     .catch(({ response }) => {
  //       setError(response.data.errors);
  //     });
  // }

  function verifyAuth() {
    // if (JwtService.getToken()) {
    //   ApiService.setHeader();
    //   ApiService.post("verify_token", { api_token: JwtService.getToken() })
    //     .then(({ data }) => {
    //       setAuth(data);
    //     })
    //     .catch(({ response }) => {
    //       setError(response.data.errors);
    //       purgeAuth();
    //     });
    // } else {
    //   purgeAuth();
    // }

    // purgeAuth()
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    // register,
    // forgotPassword,
    verifyAuth,
  };
});

