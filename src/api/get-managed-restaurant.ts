import { api } from '@/lib/axios'

export interface GetManagedRestaurantResponse {
	id: string
	name: string
	description: string
	createdAt: Date | null
	updatedAt: Date | null
	managerId: string
}

export async function getManagedRestaurant() {
	const response = await api.get<GetManagedRestaurantResponse>(
		'/managed-restaurant',
	)

	return response.data
}
