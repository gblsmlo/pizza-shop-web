import { Link, type LinkProps, useLocation } from 'react-router'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
	const { pathname } = useLocation()

	return (
		<Link
			data-current={pathname === props.to}
			className="flex items-center gap-1 font-medium text-muted-foreground text-sm hover:text-foreground data-[current=true]:text-foreground"
			{...props}
		/>
	)
}
