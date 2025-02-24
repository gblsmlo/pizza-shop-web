import {
	type GetManagedRestaurantResponse,
	getManagedRestaurant,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
	name: z.string().min(1),
	description: z.string().nullable(),
})

type StoreProfile = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
	const queryClient = useQueryClient()

	const { data: managedRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		staleTime: Number.POSITIVE_INFINITY,
	})

	const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfile>({
		resolver: zodResolver(storeProfileSchema),
		values: {
			name: managedRestaurant?.name ?? '',
			description: managedRestaurant?.description ?? '',
		},
	})

	function updateManagedRestaurantCache({ name, description}: StoreProfile) {
		const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
			'managed-restaurant',
		])

		if (cached) {
			queryClient.setQueryData(['managed-restaurant'], {
				...cached,
				name,
				description,
			})
		}

		return { cached }
	}

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
		onMutate({ name, description }) {
			const { cached } = updateManagedRestaurantCache({
				name,
				description
			})

			return { previousProfile: cached}
		},
		onError(_, __, context) {
			if(context?.previousProfile) {
				updateManagedRestaurantCache(context.previousProfile)
			}
		}
	})

	async function handleUpdateProfile(data: StoreProfile) {
		try {
			await updateProfileFn({
				name: data.name,
				description: data.description,
			})

			toast.success('Perfil atualizado com sucesso')
		} catch (error) {
			toast.success('Falha ao atualizar o perfil')
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da loja</DialogTitle>
				<DialogDescription>
					Atualize as informações do seu estabelecimento visíveis ao seu cliente
				</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleSubmit(handleUpdateProfile)}>
				<div className="space-y-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="name">
							Nome
						</Label>
						<Input className="col-span-3" id="name" {...register('name')} />
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="description">
							Descrição
						</Label>
						<Textarea
							className="col-span-3"
							id="description"
							{...register('description')}
						/>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost" type="button">
							Cancelar
						</Button>
					</DialogClose>
					<Button type="submit" variant="default" disabled={isSubmitting}>
						Salvar
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	)
}
