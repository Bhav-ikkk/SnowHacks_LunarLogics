import { createContext, useState, useContext, useEffect } from 'react'
import { buildAbilityFor } from 'src/configs/acl'

/**
 * ACL Context
 * Provides ability instance throughout the app
 */
const AbilityContext = createContext()

/**
 * ACL Provider Component
 * Wraps the app and provides permission checking functionality
 */
export const AbilityProvider = ({ children, user }) => {
  const [ability, setAbility] = useState(null)

  useEffect(() => {
    if (user) {
      // Build ability based on user role and permissions
      const userAbility = buildAbilityFor(user.role, user.permissions || [])
      setAbility(userAbility)
    }
  }, [user])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}

/**
 * Hook to access ability instance
 * @returns {Ability} CASL ability instance
 */
export const useAbility = () => {
  const context = useContext(AbilityContext)
  if (!context) {
    throw new Error('useAbility must be used within AbilityProvider')
  }
  return context
}

/**
 * Hook to check if user can perform an action
 * @param {string} action - Action to check (read, create, update, delete, manage)
 * @param {string} subject - Subject/resource to check
 * @returns {boolean} Whether user can perform action
 */
export const useCan = (action, subject) => {
  const ability = useAbility()
  return ability ? ability.can(action, subject) : false
}

export default AbilityContext
