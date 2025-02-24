import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
	const navigate = useNavigate()

	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Number.POSITIVE_INFINITY,
	})

	const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
		useQuery({
			queryKey: ['managed-restaurant'],
			queryFn: getManagedRestaurant,
			staleTime: Number.POSITIVE_INFINITY,
		})

	const { mutateAsync: signOutfn, isPending: isSignOut } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			navigate('/sign-in', {
				replace: true
			})
		}
	})

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={'outline'}
						className="flex select-none items-center gap-2"
					>
						{isLoadingManagedRestaurant ? (
							<Skeleton className="h-4 w-40" />
						) : (
							managedRestaurant?.name
						)}
						<ChevronDown />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-4 w-24" />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span className="font-normal text-muted-foreground text-xs">
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="mr-2 h-4 w-4" />
							<span>Perfil da Loja</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem
						className="text-rose-500 dark:text-red-400"
						asChild
						disabled={isSignOut}
					>
						<button
							className="w-full"
							onClick={() => signOutfn()}
							type="button"
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfileDialog />
		</Dialog>
	)
}
