import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
export function MonthRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-revenue'],
		queryFn: () => getMonthRevenue(),
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">
					Receita total (mês)
				</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthRevenue ? (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{monthRevenue.receipt.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>

						<p className="text-muted-foreground text-xs">
							{monthRevenue.diffFromLastMonth >= 0 ? (
								<>
									<span className="text-emerald-500 dark:text-emerald-400">
										+{monthRevenue.diffFromLastMonth}
									</span>
									<span className="ml-1 inline-block">
										em relação ao mês passado
									</span>
								</>
							) : (
								<>
									<span className="text-rose-500 dark:text-rose-400">
										{monthRevenue.diffFromLastMonth}
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
						<Skeleton className="mt-1 h-7 w-40" />
						<Skeleton className="h-4 w-56" />
					</>
				)}
			</CardContent>
		</Card>
	)
}
