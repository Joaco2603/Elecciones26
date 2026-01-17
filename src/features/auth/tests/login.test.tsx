import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import LoginForm from '../components/LoginForm'
import * as authActions from '../actions/auth'

// Mock the server action
vi.mock('../actions/auth', () => ({
    loginAction: vi.fn(),
}))

describe('Admin Login Flow', () => {
    it('renders login form correctly', () => {
        render(<LoginForm />)
        expect(screen.getByLabelText(/email/i)).toBeDefined()
        expect(screen.getByLabelText(/contraseña/i)).toBeDefined()
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeDefined()
    })

    it('validates empty fields', async () => {
        // Check validation messages match exact implementation
        render(<LoginForm />)
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        // Use findByText which waits automatically
        expect(await screen.findByText(/email inválido/i)).toBeDefined()
        expect(await screen.findByText(/mínimo 6 caracteres/i)).toBeDefined()
    })

    it('calls loginAction with credentials on submit', async () => {
        render(<LoginForm />)
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } })
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } })

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        await waitFor(() => {
            expect(authActions.loginAction).toHaveBeenCalledWith(expect.anything())
        })
    })

    it('displays error message when loginAction returns error', async () => {
        const mockLogin = vi.mocked(authActions.loginAction)
        mockLogin.mockResolvedValueOnce({ error: 'Credenciales inválidas' })

        render(<LoginForm />)
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } })
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrongpass' } })
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

        expect(await screen.findByText(/credenciales inválidas/i)).toBeDefined()
    })
})
