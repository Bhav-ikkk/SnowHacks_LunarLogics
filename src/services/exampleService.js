import { query, queryOne, queryNone, transaction } from './dbConnection'

/**
 * Example Service
 * Template for creating service layer functions
 * This is where all your database queries and business logic should live
 */
const exampleService = {
  /**
   * Get all items
   * @param {string} userId - User ID for filtering
   * @returns {Promise<Object>} List of items
   */
  async getAllItems(userId) {
    try {
      const itemsQuery = `
        SELECT 
          id,
          name,
          description,
          created_at,
          updated_at
        FROM items
        WHERE user_id = $1
        ORDER BY created_at DESC
      `
      
      const result = await query(itemsQuery, [userId])

      return { success: true, data: result || [] }
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  },

  /**
   * Get single item by ID
   * @param {string} itemId - Item ID
   * @param {string} userId - User ID for authorization
   * @returns {Promise<Object>} Single item
   */
  async getItemById(itemId, userId) {
    try {
      const itemQuery = `
        SELECT 
          id,
          name,
          description,
          created_at,
          updated_at
        FROM items
        WHERE id = $1 AND user_id = $2
      `
      
      const result = await queryOne(itemQuery, [itemId, userId])

      if (!result) {
        return { success: false, error: 'Item not found' }
      }

      return { success: true, data: result }
    } catch (error) {
      console.error('Error fetching item:', error)
      throw error
    }
  },

  /**
   * Create new item
   * @param {Object} itemData - Item data
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Created item
   */
  async createItem(itemData, userId) {
    try {
      const { name, description } = itemData

      const insertQuery = `
        INSERT INTO items (name, description, user_id)
        VALUES ($1, $2, $3)
        RETURNING id, name, description, created_at, updated_at
      `
      
      const result = await queryOne(insertQuery, [name, description, userId])

      return { success: true, data: result }
    } catch (error) {
      console.error('Error creating item:', error)
      throw error
    }
  },

  /**
   * Update item
   * @param {string} itemId - Item ID
   * @param {Object} itemData - Updated item data
   * @param {string} userId - User ID for authorization
   * @returns {Promise<Object>} Updated item
   */
  async updateItem(itemId, itemData, userId) {
    try {
      const { name, description } = itemData

      const updateQuery = `
        UPDATE items
        SET name = $1, description = $2, updated_at = NOW()
        WHERE id = $3 AND user_id = $4
        RETURNING id, name, description, created_at, updated_at
      `
      
      const result = await queryOne(updateQuery, [name, description, itemId, userId])

      if (!result) {
        return { success: false, error: 'Item not found or unauthorized' }
      }

      return { success: true, data: result }
    } catch (error) {
      console.error('Error updating item:', error)
      throw error
    }
  },

  /**
   * Delete item
   * @param {string} itemId - Item ID
   * @param {string} userId - User ID for authorization
   * @returns {Promise<Object>} Deletion result
   */
  async deleteItem(itemId, userId) {
    try {
      const deleteQuery = `
        DELETE FROM items
        WHERE id = $1 AND user_id = $2
        RETURNING id
      `
      
      const result = await queryOne(deleteQuery, [itemId, userId])

      if (!result) {
        return { success: false, error: 'Item not found or unauthorized' }
      }

      return { success: true, message: 'Item deleted successfully' }
    } catch (error) {
      console.error('Error deleting item:', error)
      throw error
    }
  },

  /**
   * Get items with related data using JOIN
   * Example of complex query with joins
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Items with related data
   */
  async getItemsWithRelations(userId) {
    try {
      const complexQuery = `
        SELECT 
          i.id,
          i.name,
          i.description,
          i.created_at,
          c.name as category_name,
          COUNT(DISTINCT t.id) as tag_count,
          JSON_AGG(DISTINCT jsonb_build_object('id', t.id, 'name', t.name)) as tags
        FROM items i
        LEFT JOIN categories c ON i.category_id = c.id
        LEFT JOIN item_tags it ON i.id = it.item_id
        LEFT JOIN tags t ON it.tag_id = t.id
        WHERE i.user_id = $1
        GROUP BY i.id, i.name, i.description, i.created_at, c.name
        ORDER BY i.created_at DESC
      `
      
      const result = await query(complexQuery, [userId])

      return { success: true, data: result || [] }
    } catch (error) {
      console.error('Error fetching items with relations:', error)
      throw error
    }
  },

  /**
   * Example of transaction usage
   * Create item with multiple related records
   * @param {Object} itemData - Item data with relations
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Transaction result
   */
  async createItemWithRelations(itemData, userId) {
    try {
      const result = await transaction(async t => {
        // Insert main item
        const item = await t.one(
          `INSERT INTO items (name, description, user_id) 
           VALUES ($1, $2, $3) 
           RETURNING id, name, description`,
          [itemData.name, itemData.description, userId]
        )

        // Insert tags if provided
        if (itemData.tags && itemData.tags.length > 0) {
          const tagQueries = itemData.tags.map(tagId =>
            t.none(
              `INSERT INTO item_tags (item_id, tag_id) VALUES ($1, $2)`,
              [item.id, tagId]
            )
          )
          await t.batch(tagQueries)
        }

        return item
      })

      return { success: true, data: result }
    } catch (error) {
      console.error('Error creating item with relations:', error)
      throw error
    }
  }
}

export default exampleService
