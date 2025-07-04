import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import { PageTitle } from '@/components/ui/page-title'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useDocumentTitle } from '@/hooks/document-title'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { OrderTableFilters } from './order-table-filter'
import { OrderTableRow } from './order-table-row'
import { OrderTableSkeleton } from './order-table-skeleton'

export function Orders() {
	useDocumentTitle('Orders')
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1')

	const { data: result, isLoading: isLoadingOrders } = useQuery({
		queryKey: ['orders', pageIndex, orderId, customerName, status],
		queryFn: () =>
			getOrders({
				pageIndex,
				orderId,
				customerName,
				status: status === 'all' ? null : status,
			}),
	})

	function handlePaginate(pageIndex: number) {
		setSearchParams((state) => {
			state.set('page', (pageIndex + 1).toString())

			return state
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<PageTitle text="Orders" />
			<div className="space-y-2.5">
				<OrderTableFilters />

				<div className="rounded border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">ID</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className="w-[140px]">Realizado há</TableHead>
								<TableHead className="w-[140px]">Status</TableHead>
								<TableHead className="w-[140px]">Total de pedidos</TableHead>
								<TableHead className="w-[240px]"> Actions </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoadingOrders && <OrderTableSkeleton />}
							{result?.orders.map((order) => (
								<OrderTableRow key={order.orderId} order={order} />
							))}
						</TableBody>
					</Table>
				</div>

				{result && (
					<Pagination
						onPageChange={handlePaginate}
						pageIndex={result.meta.pageIndex}
						totalCount={result.meta.totalCount}
						perPage={result.meta.perPage}
					/>
				)}
			</div>
		</div>
	)
}
