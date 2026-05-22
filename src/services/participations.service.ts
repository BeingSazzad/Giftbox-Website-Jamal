import api from '@/lib/axios'
import { Participation } from '@/types'

export const participationsService = {
  /**
   * Fetch all user participations/entries
   */
  getParticipations: () =>
    api.get<Participation[]>('/participations').then((r) => r.data),

  /**
   * Fetch details for a specific participation entry by ID
   */
  getParticipationById: (id: string) =>
    api.get<Participation>(`/participations/${id}`).then((r) => r.data),

  /**
   * Submit payment proof screenshot/photo for a draw participation.
   * Uses multipart/form-data for file uploads.
   * 
   * @param drawId The ID of the draw being entered.
   * @param file The image file (screenshot/photo of proof).
   */
  submitProof: (drawId: string, file: File) => {
    const formData = new FormData()
    formData.append('drawId', drawId)
    formData.append('proof', file)

    return api.post<Participation>('/participations/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((r) => r.data)
  },
}
