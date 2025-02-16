import { PageTitle } from '@/components/ui/page-title'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useDocumentTitle } from '@/hooks/document-title'
import { OrderTableFilters } from './order-table-filter'
import { OrderTableRow } from './order-table-row'

export function Orders() {
	useDocumentTitle('Orders')

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
							{Array.from({ length: 10 }).map((_, i) => (
								<OrderTableRow key={Math.random()} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
