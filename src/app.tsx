import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/sonner'
import { NotFound } from './pages/app/404'
import { AppLayout } from './pages/app/_layouts/app'
import { AuthLayout } from './pages/app/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { Orders } from './pages/app/orders/orders'
import { Settings } from './pages/app/settings'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="settings" element={<Settings />} />
						<Route path="orders" element={<Orders />} />
						<Route path="*" element={<NotFound />} />
					</Route>
					<Route element={<AuthLayout />}>
						<Route path="sign-in" element={<SignIn />} />
						<Route path="sign-up" element={<SignUp />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster />
		</ThemeProvider>
	)
}
export default App
