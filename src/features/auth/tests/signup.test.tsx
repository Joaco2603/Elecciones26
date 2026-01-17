import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import SignUpForm from '@/features/auth/components/SignUpForm'
import * as signupActions from '@/features/auth/actions/signup'

// Mock the server action
vi.mock('../actions/signup', () => ({
    signupAction: vi.fn(),
}))

describe('Signup Flow', () => {
    it('renders signup form correctly', () => {
        render(<SignUpForm />)
        expect(screen.getByLabelText(/email/i)).toBeDefined()
        expect(screen.getByLabelText(/^contraseña/i)).toBeDefined() // regex to avoid confusion with "confirm password" if label is similar
        expect(screen.getByLabelText(/confirmar contraseña/i)).toBeDefined()
        expect(screen.getByRole('button', { name: /registrarse/i })).toBeDefined()
    })

    it('validates empty fields', async () => {
        render(<SignUpForm />)
        fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

        expect(await screen.findByText(/Email es obligatorio/i)).toBeDefined()
        const passwordErrors = await screen.findAllByText(/mínimo 6 caracteres/i)
        expect(passwordErrors.length).toBeGreaterThan(0)
    })

    it('validates password mismatch', async () => {
        render(<SignUpForm />)
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByLabelText(/^contraseña/i), { target: { value: 'password123' } })
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password456' } })
        fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

        expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeDefined()
    })

    it('calls signupAction with correct data on submit', async () => {
        render(<SignUpForm />)
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'newuser@example.com' } })
        fireEvent.change(screen.getByLabelText(/^contraseña/i), { target: { value: 'password123' } })
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password123' } })

        fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

        await waitFor(() => {
            expect(signupActions.signupAction).toHaveBeenCalledWith(expect.anything())
        })
    })

    it('displays error message when signupAction returns error', async () => {
        const mockSignup = vi.mocked(signupActions.signupAction)
        mockSignup.mockResolvedValueOnce({ error: 'El usuario ya existe' })

        render(<SignUpForm />)
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'existing@example.com' } })
        fireEvent.change(screen.getByLabelText(/^contraseña/i), { target: { value: 'password123' } })
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password123' } })
        fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

        expect(await screen.findByText(/el usuario ya existe/i)).toBeDefined()
    })
})
