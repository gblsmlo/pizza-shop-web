import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'

export function OrderTableFilters() {
	return (
		<form className="flex items-center gap-2">
			<span className="font-semibold text-sm">Filtros:</span>
			<Input placeholder="Search" className="w-[320px]" />
			<Input placeholder="Nome do Cliente" className="w-[320px]" />

			<Select defaultValue="all">
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

			<Button type="submit" variant="secondary" size="sm">
				<Search className="mr-2 h-8 w-8" />
				Filtrar resultados
			</Button>

			<Button type="button" variant="outline" size="sm">
				<X className="mr-2 h-8 w-8" />
				Remover filtros
			</Button>
		</form>
	)
}
