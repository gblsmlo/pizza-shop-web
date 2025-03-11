import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export function RevenueChart() {
	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period'],
		queryFn: () => getDailyRevenueInPeriod(),
	})

	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="font-medium text-base">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{dailyRevenueInPeriod ? (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
							<XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) =>
									value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})
								}
							/>
							<Line
								stroke={colors.violet[500]}
								type="linear"
								strokeWidth={2}
								dataKey="receipt"
							/>
							<CartesianGrid vertical={false} className="stroke-muted" />
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className="flex h-[240px] w-full items-center justify-center">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
