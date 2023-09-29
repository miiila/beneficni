import { defineStore } from 'pinia'

export interface Team {
  id: number
  name: string
}

export interface AuthStore {
  team: Ref<Team | null>
  jwt: Ref<string | null>
  logout: () => void
  setTeam: (currentTeam: Team, jwt?: string) => void
}

export const useAuthStore = defineStore('auth', () => {
  const team: Ref<Team | null> = ref(null)
  const jwt: Ref<string | null> = ref(null)

  function logout () {
    team.value = null
    jwt.value = null
  }

  function setTeam (currentTeam: Team, currentJwt?: string) {
    team.value = { id: currentTeam.id, name: currentTeam.name }
    if (currentJwt !== undefined) {
      jwt.value = currentJwt
    }
  }

  const authStore: AuthStore = { team, jwt, logout, setTeam }

  return authStore
}, { persist: true })
