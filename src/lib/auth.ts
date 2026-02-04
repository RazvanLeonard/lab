const ADMIN_KEY = 'lab-admin-auth'

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_KEY) === '1'
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(ADMIN_KEY, '1')
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(ADMIN_KEY)
}

export function checkAdminPin(pin: string): boolean {
  const expected = import.meta.env.VITE_ADMIN_PIN || '1234'
  return pin === expected
}
