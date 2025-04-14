import { AuthContextType } from '@/contexts/auth/auth.type'
import { createContext, useContext } from 'react'

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
