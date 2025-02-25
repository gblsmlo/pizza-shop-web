import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

const orderFilterSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, control, handleSubmit, reset } = useForm<OrderFilterSchema>({
		resolver: zodResolver(orderFilterSchema),
		defaultValues: {
			orderId: orderId ?? '',
			customerName: customerName ?? '',
			status: status ?? 'all'
		}
	})

	function handleFilter({ orderId, customerName, status }: OrderFilterSchema) {
		console.log(orderId, customerName, status)

		setSearchParams((state) => {
			if(orderId) {
				state.set('orderId', orderId)
			} else {
				state.delete('orderId')
			}

			if (customerName) {
				state.set('customerName', customerName)
			} else {
				state.delete('customerName')
			}

			if (status) {
				state.set('status', status)
			} else {
				state.delete('status')
			}

			state.set('page', '1')

			return state
		})
	}

	function handleClearFilter() {
		setSearchParams((state) => {
			state.delete('orderId')
			state.delete('customerName')
			state.delete('status')

			return state
		})

		reset({
			customerName: '',
			orderId: '',
			status: 'all'
		})
	}

	return (
		<form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilter)}>
			<span className="font-semibold text-sm">Filtros:</span>

			<Input placeholder="ID do Pedido" className="w-[320px]" {...register('orderId')} />
			<Input placeholder="Nome do Cliente" className="w-[320px]" { ...register('customerName') }/>

			<Controller name="status" control={control} render={({ field: { name, onChange, value, disabled }}) => {
				return (
					<Select
						defaultValue="all"
						onValueChange={onChange}
						name={name}
						value={value}
						disabled={disabled}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="pending">Pendente</SelectItem>
							<SelectItem value="canceled">Cancelado</SelectItem>
							<SelectItem value="processing">Em preparo</SelectItem>
							<SelectItem value="delivering">Em entrega</SelectItem>
							<SelectItem value="delivered">Entregue</SelectItem>
						</SelectContent>
					</Select>
				)
			}}>

			</Controller>

			<Button type="submit" variant="secondary" size="sm">
				<Search className="mr-2 h-8 w-8" />
				Filtrar resultados
			</Button>

			<Button type="button" variant="outline" size="sm" onClick={handleClearFilter}>
				<X className="mr-2 h-8 w-8" />
				Remover filtros
			</Button>
		</form>
	)
}
