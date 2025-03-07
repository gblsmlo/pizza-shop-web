import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'

import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { OrderStatus } from './order-status'

interface OrderTableRowProps {
	order: {
		orderId: string
		createdAt: string
		status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
		customerName: string
		total: number
	}
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutateAsync: cancelOrderFn } = useMutation({
		mutationFn: cancelOrder,
		async onSuccess(_, { orderId }) {
			const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
				queryKey: ['orders'],
			})

			ordersListCache.map(([cacheKey, cacheData]) => {
				if(!cacheData) {
					return
				}

				queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
					...cacheData,
					orders: cacheData.orders.map(order => {
						if(order.orderId === orderId) {
							return {
								...order,
								status: 'canceled',
							}
						}

						return order
					})
				})
			})
		},
	})

	return (
		<TableRow>
			<TableCell className="font-medium font-mono text-xs">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(order.createdAt, {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName} </TableCell>
			<TableCell className="font-medium">
				{order.total.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>

			<TableCell>
				<div className="flex justify-end gap-2">
					<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								<Search className="h-3 w-3" />
								<span className="sr-only">Detalhes do pedido</span>
							</Button>
						</DialogTrigger>
						<OrderDetails orderId={order.orderId} open={isDetailsOpen} />
					</Dialog>
					<Separator orientation="vertical" className="h-8 w-px" />

					<Button variant="outline" size="sm" className="mr-2">
						<ArrowRight className="mr-2 h-3 w-3" />
						Aprovar
					</Button>

					<Button
						disabled={!['pending', 'processing'].includes(order.status)}
						variant="ghost"
						size="sm"
						onClick={() => cancelOrderFn({ orderId: order.orderId })}
					>
						<X className="mr-2 h-3 w-3" />
						Cancelar
					</Button>
				</div>
			</TableCell>
		</TableRow>
	)
}
