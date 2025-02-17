import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDocumentTitle } from '@/hooks/document-title'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const signInFormSchema = z.object({
	email: z.string().email(),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
	useDocumentTitle('Sign In')

	const [searchParams] = useSearchParams()

	const { mutateAsync: authenticate, submittedAt } = useMutation({
		mutationFn: signIn,
	})

	console.log(submittedAt)

	const navigate = useNavigate()

	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm<SignInForm>({
		defaultValues: {
			email: searchParams.get('email') || '',
		},
	})

	async function handleSignIn(data: SignInForm) {
		try {
			// await new Promise((resolver) => setTimeout(resolver, 2000))

			await authenticate({
				email: data.email,
			})

			toast.success('Restaurante cadastrado com sucesso!', {
				action: {
					label: 'Login',
					onClick: () => navigate('/sign-up'),
				},
			})
		} catch (error) {
			toast.error('Erro ao cadastrar restaurante.')
		}
	}

	return (
		<>
			<Button variant="ghost" asChild className="absolute top-8 right-8">
				<Link to="/sign-up">Criar conta</Link>
			</Button>
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
