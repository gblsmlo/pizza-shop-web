import { Pagination } from '@/components/pagination'
import { render } from '@testing-library/react'

describe('Pagination', () => {
	it('should display the right amount of pages and results', () => {
		const wrapper = render(
			<Pagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={() => {}}
			/>,
		)

		expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
		expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
	})

	it('should be able to navigate to the next page', () => {
		const wrapper = render(
			<Pagination
				pageIndex={0}
				totalCount={200}
				perPage={10}
				onPageChange={() => {}}
			/>,
		)

		expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
		expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
	})
})
