import ExampleView from '../../views/example'

/**
 * Example Page
 * Page component that imports and renders the view
 * Keep pages simple - only import views
 */
const ExamplePage = () => {
  return <ExampleView />
}

// Optional: Add authentication and ACL guards
// ExamplePage.authGuard = true
// ExamplePage.acl = {
//   action: 'read',
//   subject: 'example'
// }

export default ExamplePage
