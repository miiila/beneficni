import { defineStore } from 'pinia'

export interface Team {
  id: number
}

export interface AuthStore {
  user: Ref<Team | null>
  jwt: Ref<string | null>
  logout: () => void
  setTeam: (currentTeam: Team, jwt?: string) => void
}

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<Team | null> = ref(null)
  const jwt: Ref<string | null> = ref(null)

  function logout () {
    user.value = null
    jwt.value = null
  }

  function setTeam (currentUser: Team, currentJwt?: string) {
    user.value = currentUser
    if (currentJwt !== undefined) {
      jwt.value = currentJwt
    }
  }

  const authStore: AuthStore = { user, jwt, logout, setTeam }

  return authStore
}, { persist: true })
