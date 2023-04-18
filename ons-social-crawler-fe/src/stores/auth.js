import { ref } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '../core/services/ApiService'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import JwtService from '@/core/services/JwtService'

export const useAuthStore = defineStore('auth', () => {
  // const errors = ref({})
  const user = ref({})
  const userRoles = ref([])
  const isAuthenticated = ref(!!JwtService.getToken())

  function setRoles(res) {
    userRoles.value = res?.user ?? []
  }

  function setAuth(authUser) {
    isAuthenticated.value = true
    user.value = authUser.user
    localStorage.setItem('userName', user.value?.displayName)
    JwtService.saveToken(user.value.accessToken)
  }

  // function setError(error) {
  //   errors.value = { ...error }
  // }

  function purgeAuth() {
    isAuthenticated.value = false
    user.value = {}
    window.localStorage.removeItem('userName')
    JwtService.destroyToken()
  }

  async function login(credentials = {}) {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        credentials?.email.value,
        credentials?.password.value
      )
      setAuth(res)
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
        const res = await ApiService.post('auth/verify')
        setRoles(res.data)
      } catch (err) {
        // setError(response.data.errors)
        await logout()
      }
    } else {
      await logout()
    }
  }

  return {
    // errors,
    user,
    userRoles,
    isAuthenticated,
    login,
    logout,
    verifyAuth
  }
})
