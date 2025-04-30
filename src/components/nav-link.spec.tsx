import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router'
import { NavLink } from './nav-link'

describe('NavLink', () => {
	it('Should hightlight the nav link when is the current page link', () => {
		const wrapper = render(
			<>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
			</>,
			{
				wrapper: ({ children }) => {
					return (
						<MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
					)
				},
			},
		)

		expect(wrapper.getByText('Home').dataset.current).toBe('false')
		expect(wrapper.getByText('About').dataset.current).toBe('true')
	})
})
