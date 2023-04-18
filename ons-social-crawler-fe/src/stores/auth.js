import { ref } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '../core/services/ApiService'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import JwtService from '@/core/services/JwtService'

export const useAuthStore = defineStore('auth', () => {
  // const errors = ref({})
  const user = ref({})
  const isAuthenticated = ref(!!JwtService.getToken())

  function setAuth(authUser, userRoles) {
    isAuthenticated.value = true
    user.value = authUser.user
    console.debug('#c au: ', userRoles);
    localStorage.setItem("userName", user.value?.displayName)
    // errors.value = {}
    JwtService.saveToken(user.value.accessToken)
  }

  // function setError(error) {
  //   errors.value = { ...error }
  // }

  function purgeAuth() {
    isAuthenticated.value = false
    user.value = {}
    // errors.value = []
    JwtService.destroyToken()
  }

  async function login(credentials = {}) {
    try {
      const res = await signInWithEmailAndPassword(auth, credentials?.email.value, credentials?.password.value)
      const tokenResult = await auth.currentUser.getIdTokenResult();
      const userRoles = tokenResult?.claims?.user ?? [];
      setAuth(res, userRoles)
    } catch (error) {
      setError(error)
    }
  }

  async function logout() {
    await signOut(auth)
    purgeAuth()
  }

  async function verifyAuth() {
    if (JwtService.getToken()) {
      try {
        ApiService.setHeader()
        await ApiService.post('auth/verify')
      } catch {
        // setError(response.data.errors)
        purgeAuth()
      }
    } else {
      purgeAuth()
    }
  }

  return {
    // errors,
    user,
    isAuthenticated,
    login,
    logout,
    verifyAuth
  }
})
