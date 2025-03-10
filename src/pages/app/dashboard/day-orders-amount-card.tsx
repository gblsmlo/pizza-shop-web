import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

export function DayOrdersAmountCard() {
	const { data: dayOrdersAmount } = useQuery({
		queryKey: ['metrics', 'day-orders-amount'],
		queryFn: () => getDayOrdersAmount(),
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">Pedidos (dia)</CardTitle>
				<Utensils className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{dayOrdersAmount && (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{dayOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						<p className="text-muted-foreground text-xs">
							{dayOrdersAmount.diffFromYesterday >= 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										+{dayOrdersAmount.diffFromYesterday}
									</span>
									<span className="ml-1 inline-block">
										em relação a ontem
									</span>
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										{dayOrdersAmount.diffFromYesterday}
									</span>
									<span className="ml-1 inline-block">
										em relação a ontem
									</span>
								</>
							)}
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
