import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { clearSession, getAccessToken, getStoredUser, loginRequest, saveStoredUser, setSessionExpiredHandler } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Start from whatever is saved in the browser so a page refresh keeps you signed in.
  const [user, setUser] = useState(() => (getAccessToken() ? getStoredUser() : null))

  const login = useCallback(async (identifier, password, rememberMe = false) => {
    const u = await loginRequest(identifier, password, rememberMe)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  useEffect(() => {
    setSessionExpiredHandler(() => {
      logout()
    })
    return () => setSessionExpiredHandler(null)
  }, [logout])

  // Merge new profile fields (e.g. after editing the profile) into the signed-in user.
  const updateUser = useCallback((partial) => {
    setUser((prev) => (prev ? { ...prev, ...partial } : prev))
  }, [])

  useEffect(() => {
    if (user) saveStoredUser(user)
  }, [user])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout, updateUser }),
    [user, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
