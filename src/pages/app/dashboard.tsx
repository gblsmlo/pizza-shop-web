import { PageTitle } from '@/components/ui/page-title'
import { useDocumentTitle } from '@/hooks/document-title'

export function Dashboard() {

	useDocumentTitle('Dashboard')

	return (
		<>
			<PageTitle title="Dashboard" />
		</>
	)
}
