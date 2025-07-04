import { getOrderDetails } from '@/api/get-order-details'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderDetailsSkeleton } from './order-details-skeleton'
import { OrderStatus } from './order-status'

interface OrderDetailsProps {
	orderId: string
	open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
	const { data: order } = useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrderDetails({ orderId }),
		enabled: open,
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: {orderId} </DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			{order ? (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>{<OrderStatus status={order.status} />}</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Cliente</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Telefone
								</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.phone}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.email}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Realizado há
								</TableCell>
								<TableCell className="flex justify-end">
									{formatDistanceToNow(order.createdAt, {
										locale: ptBR,
										addSuffix: true,
									})}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead className="text-right">Qtd.</TableHead>
								<TableHead className="text-right">Preço</TableHead>
								<TableHead className="text-right">Subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order.orderItems.map((order) => {
								return (
									<TableRow key={order.id}>
										<TableCell>{order.product.name}</TableCell>
										<TableCell className="text-right">
											{order.quantity}
										</TableCell>
										<TableCell className="text-right">
											{(order.priceInCents / 100).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})}
										</TableCell>
										<TableCell className="text-right">
											{(
												(order.priceInCents / 100) *
												order.quantity
											).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>Total do pedido</TableCell>
								<TableCell className="text-right font-medium">
									{(order.totalInCents / 100).toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			) : (
				<OrderDetailsSkeleton />
			)}
		</DialogContent>
	)
}
