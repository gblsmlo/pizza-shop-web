import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-canceled-orders-amount'],
		queryFn: () => getMonthCanceledOrdersAmount(),
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">
					Cancelamentos (mês)
				</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthCanceledOrdersAmount ? (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>

						<p className="text-muted-foreground text-xs">
							{monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										{monthCanceledOrdersAmount.diffFromLastMonth}
									</span>
									<span className="ml-1 inline-block">em relação a ontem</span>
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										+{monthCanceledOrdersAmount.diffFromLastMonth}
									</span>
									<span className="ml-1 inline-block">em relação a ontem</span>
								</>
							)}
						</p>
					</>
				) : (
					<>
						<Skeleton className="mt-1 h-7 w-7" />
						<Skeleton className="h-4 w-40" />
					</>
				)}
			</CardContent>
		</Card>
	)
}
