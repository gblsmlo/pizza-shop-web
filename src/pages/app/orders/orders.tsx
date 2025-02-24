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

export function Orders() {
	useDocumentTitle('Orders')
	const [searchParams, setSearchParams] = useSearchParams()

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1')

	const { data: result } = useQuery({
		queryKey: ['orders', pageIndex],
		queryFn: () =>
			getOrders({
				pageIndex,
			}),
	})

	function handlePaginate(pageIndex: number) {
		console.log(pageIndex)

		setSearchParams((state) => {
			console.log(state)

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
