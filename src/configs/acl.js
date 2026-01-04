import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

/**
 * User Roles
 */
export const ROLES = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  USER: 'User',
  CUSTOMER: 'Customer'
}

/**
 * Define CASL rules for user permissions
 * @param {string} role - User role (Owner, Admin, User, Customer)
 * @param {Array} userDetails - User permission details from database
 * @returns {Array} Permission rules
 */
const defineRulesFor = (role, userDetails = []) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  // Owner and Admin have full access to everything
  if (role === ROLES.OWNER || role === ROLES.ADMIN) {
    can('manage', 'all')
  } else {
    // For User and Customer roles, check granular permissions from userDetails
    if (userDetails && Array.isArray(userDetails)) {
      userDetails.forEach(detail => {
        if (detail?.screen_access) {
          // Grant read access to screens user has access to
          can('read', detail.screen_access)
          
          // Check additional permissions
          if (detail?.can_create) {
            can('create', detail.screen_access)
          }
          if (detail?.can_update) {
            can('update', detail.screen_access)
          }
          if (detail?.can_delete) {
            can('delete', detail.screen_access)
          }
        }
      })
    }

    // Role-specific default permissions
    if (role === ROLES.USER) {
      // Users can always read their own profile and dashboard
      can('read', 'profile')
      can('update', 'profile')
      can('read', 'dashboard')
    } else if (role === ROLES.CUSTOMER) {
      // Customers have limited access
      can('read', 'profile')
      can('update', 'profile')
      can('read', 'products')
      can('read', 'orders')
      can('create', 'orders')
    }
  }

  return rules
}

/**
 * Build ability instance for a user
 * @param {string} role - User role
 * @param {Array} userDetails - User permission details
 * @returns {Ability} Ability instance
 */
export const buildAbilityFor = (role, userDetails = []) => {
  return new AppAbility(defineRulesFor(role, userDetails), {
    detectSubjectType: object => object?.type
  })
}

/**
 * Default ACL object for pages
 * Use this when you want to allow access to all authenticated users
 */
export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

/**
 * Example ACL configurations for different pages
 */
export const ACL_CONFIGS = {
  // Dashboard - All authenticated users
  dashboard: {
    action: 'read',
    subject: 'dashboard'
  },
  
  // Admin only pages
  adminPanel: {
    action: 'manage',
    subject: 'admin'
  },
  
  // User management
  users: {
    action: 'manage',
    subject: 'users'
  },
  
  // Example module
  example: {
    action: 'read',
    subject: 'example'
  }
}

export default defineRulesFor
