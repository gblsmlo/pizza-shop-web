import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

export function MonthOrdersAmountCard() {
	const { data: monthOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-orders-amount'],
		queryFn: () => getMonthOrdersAmount(),
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">Pedidos (mês)</CardTitle>
				<Utensils className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthOrdersAmount ? (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{monthOrdersAmount.amount}
						</span>
						<p className="text-muted-foreground text-xs">
							{monthOrdersAmount.diffFromLastMonth >= 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										+{monthOrdersAmount.diffFromLastMonth}
									</span>
									<span className="ml-1 inline-block">
										em relação ao mês passado
									</span>
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										{monthOrdersAmount.diffFromLastMonth}
									</span>
									<span className="ml-1 inline-block">
										em relação ao mês passado
									</span>
								</>
							)}
						</p>
					</>
				) : (
					<>
						<Skeleton className="mt-1 h-7 w-7" />
						<Skeleton className="h-4 w-56" />
					</>
				)}
			</CardContent>
		</Card>
	)
}
