import api from '@/lib/axios'
import { Draw } from '@/types'

export const drawsService = {
  /**
   * Fetch all active/completed draws
   */
  getDraws: () =>
    api.get<Draw[]>('/draws').then((r) => r.data),

  /**
   * Fetch a single draw's details by ID
   */
  getDrawById: (id: string) =>
    api.get<Draw>(`/draws/${id}`).then((r) => r.data),

  /**
   * Fetch active draw details (e.g. current homepage draw)
   */
  getCurrentDraw: () =>
    api.get<Draw>('/draws/current').then((r) => r.data),
}
