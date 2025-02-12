import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { AppLayout } from './pages/app/_layouts/app'
import { AuthLayout } from './pages/app/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { Settings } from './pages/app/settings'
import { SignIn } from './pages/auth/sign-in'

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="settings" element={<Settings />} />
					</Route>
					<Route element={<AuthLayout />}>
						<Route path="sign-in" element={<SignIn />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	)
}
export default App
