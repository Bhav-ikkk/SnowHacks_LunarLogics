import exampleService from 'src/services/exampleService'

/**
 * Example Relations API Handler
 * Handles complex queries with joins and relations
 */
export default async function handler(req, res) {
  try {
    const userId = req.query.userId || req.body.userId

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: 'User ID is required' 
      })
    }

    switch (req.method) {
      case 'GET':
        try {
          const result = await exampleService.getItemsWithRelations(userId)
          return res.status(200).json(result)
        } catch (error) {
          console.error('Error fetching items with relations:', error)
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch items' 
          })
        }

      case 'POST':
        try {
          const { name, description, tags } = req.body

          if (!name) {
            return res.status(400).json({ 
              success: false, 
              error: 'Name is required' 
            })
          }

          const result = await exampleService.createItemWithRelations(
            { name, description, tags },
            userId
          )
          
          return res.status(201).json(result)
        } catch (error) {
          console.error('Error creating item with relations:', error)
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to create item' 
          })
        }

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({ 
          success: false, 
          error: `Method ${req.method} not allowed` 
        })
    }
  } catch (error) {
    console.error('Error in relations API:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    })
  }
}
