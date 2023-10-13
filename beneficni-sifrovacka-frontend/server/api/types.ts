import { type Team } from '~/stores/auth'

export interface Puzzle {
  id: number
  stateId: number
  url: string
  logoUrl: string
  description: string
  state: 'locked' | 'open' | 'solved'
  actions: Record<'unlocked' | 'solved' | 'failed', Date>
}

export interface TeamAction {
  action: 'unlocked' | 'solved' | 'failed'
  timestamp: Date
}
