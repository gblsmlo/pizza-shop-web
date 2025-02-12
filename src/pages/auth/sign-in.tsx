import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import { useDocumentTitle } from '@/hooks/document-title'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signInFormSchema = z.object({
	email: z.string().email(),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm<SignInForm>()
	useDocumentTitle('Sign In')

	async function handleSignIn(data: SignInForm) {
		await new Promise((resolver) => setTimeout(resolver, 2000))
		console.log(data)

		toast('Event has been created.')
	}

	return (
		<>
			<div className="p-8">
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Acessar painel
						</h1>
						<p className="text-muted-foreground text-sm">
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
						<div className="space-y-2">
							<Label htmlFor="email">Seu e-mail</Label>
							<Input id="email" type="email" {...register('email')} />
						</div>

						<Button className="w-full" type="submit" disabled={isSubmitting}>
							Acessar painel
						</Button>
					</form>
				</div>
			</div>
		</>
	)
}
