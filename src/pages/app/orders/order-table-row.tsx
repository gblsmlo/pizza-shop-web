import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { TableCell, TableRow } from '@/components/ui/table'
import { nanoid } from '@/lib/nanoid'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'

export function OrderTableRow() {
	return (
		<TableRow>
			<TableCell className="font-medium font-mono text-xs">
				{nanoid()}
			</TableCell>
			<TableCell className="text-muted-foreground">há 15 minutos</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-amber-500" />
					<span>Pendente</span>
				</div>
			</TableCell>
			<TableCell className="font-medium">Gabriel Melo</TableCell>
			<TableCell className="font-medium">R$ 149,00</TableCell>

			<TableCell>
				<div className="flex justify-end gap-2">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								<Search className="h-3 w-3" />
								<span className="sr-only">Detalhes do pedido</span>
							</Button>
						</DialogTrigger>
						<OrderDetails />
					</Dialog>
					<Separator orientation="vertical" className="h-8 w-px" />
					<Button variant="outline" size="sm" className="mr-2">
						<ArrowRight className="mr-2 h-3 w-3" />
						Aprovar
					</Button>
					<Button variant="ghost" size="sm">
						<X className="mr-2 h-3 w-3" />
						Cancelar
					</Button>
				</div>
			</TableCell>
		</TableRow>
	)
}
