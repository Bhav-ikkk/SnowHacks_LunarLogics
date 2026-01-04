/**
 * Example API Handler (Mock Version)
 * Bridge between frontend (views) and backend (services)
 * Handles HTTP methods: GET, POST, PUT, DELETE
 * 
 * NOTE: This is a mock implementation that works without a database.
 * Replace with actual service calls when you set up your database.
 */

// In-memory storage for demo purposes
let mockItems = [
  {
    id: '1',
    name: 'Example Item 1',
    description: 'This is a sample item to demonstrate the CRUD functionality',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Example Item 2',
    description: 'Another example item with different data',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Example Item 3',
    description: 'Third example to show grid layout',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

let nextId = 4

export default async function handler(req, res) {
  try {
    // In production, you would get userId from session/auth
    // For now, we'll extract it from query or body
    const userId = req.query.userId || req.body.userId

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: 'User ID is required' 
      })
    }

    switch (req.method) {
      // GET - Fetch all items
      case 'GET':
        try {
          const { itemId } = req.query
          
          if (itemId) {
            // Get single item
            const item = mockItems.find(i => i.id === itemId)
            if (!item) {
              return res.status(404).json({ 
                success: false, 
                error: 'Item not found' 
              })
            }
            return res.status(200).json({ success: true, data: item })
          } else {
            // Get all items
            return res.status(200).json({ 
              success: true, 
              data: mockItems 
            })
          }
        } catch (error) {
          console.error('Error in GET:', error)
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch items' 
          })
        }

      // POST - Create new item
      case 'POST':
        try {
          const { name, description } = req.body

          // Validation
          if (!name) {
            return res.status(400).json({ 
              success: false, 
              error: 'Name is required' 
            })
          }

          const newItem = {
            id: String(nextId++),
            name,
            description: description || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }

          mockItems = [newItem, ...mockItems]
          
          return res.status(201).json({ 
            success: true, 
            data: newItem 
          })
        } catch (error) {
          console.error('Error in POST:', error)
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to create item' 
          })
        }

      // PUT - Update item
      case 'PUT':
        try {
          const { itemId } = req.query
          const { name, description } = req.body

          if (!itemId) {
            return res.status(400).json({ 
              success: false, 
              error: 'Item ID is required' 
            })
          }

          const itemIndex = mockItems.findIndex(i => i.id === itemId)
          if (itemIndex === -1) {
            return res.status(404).json({ 
              success: false, 
              error: 'Item not found' 
            })
          }

          mockItems[itemIndex] = {
            ...mockItems[itemIndex],
            name,
            description,
            updated_at: new Date().toISOString()
          }
          
          return res.status(200).json({ 
            success: true, 
            data: mockItems[itemIndex] 
          })
        } catch (error) {
          console.error('Error in PUT:', error)
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to update item' 
          })
        }

      // DELETE - Delete item
      case 'DELETE':
        try {
          const { itemId } = req.query

          if (!itemId) {
            return res.status(400).json({ 
              success: false, 
              error: 'Item ID is required' 
            })
          }

          const itemIndex = mockItems.findIndex(i => i.id === itemId)
          if (itemIndex === -1) {
            return res.status(404).json({ 
              success: false, 
              error: 'Item not found' 
            })
          }

          mockItems = mockItems.filter(i => i.id !== itemId)
          
          return res.status(200).json({ 
            success: true, 
            message: 'Item deleted successfully' 
          })
        } catch (error) {
          console.error('Error in DELETE:', error)
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to delete item' 
          })
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ 
          success: false, 
          error: `Method ${req.method} not allowed` 
        })
    }
  } catch (error) {
    console.error('Error in API handler:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    })
  }
}
