import axiosInstance from 'src/lib/axios'

/**
 * Example API Client
 * Contains all API calls for the example module
 * Uses axios instance with default configuration
 */
const exampleApi = {
  /**
   * Get all items
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  getAllItems: async userId => {
    try {
      const response = await axiosInstance.get(`/api/example?userId=${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  },

  /**
   * Get single item by ID
   * @param {string} itemId - Item ID
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  getItemById: async (itemId, userId) => {
    try {
      const response = await axiosInstance.get(`/api/example?itemId=${itemId}&userId=${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching item:', error)
      throw error
    }
  },

  /**
   * Create new item
   * @param {Object} itemData - Item data
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  createItem: async (itemData, userId) => {
    try {
      const response = await axiosInstance.post('/api/example', {
        ...itemData,
        userId
      })
      return response.data
    } catch (error) {
      console.error('Error creating item:', error)
      throw error
    }
  },

  /**
   * Update item
   * @param {string} itemId - Item ID
   * @param {Object} itemData - Updated item data
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  updateItem: async (itemId, itemData, userId) => {
    try {
      const response = await axiosInstance.put(`/api/example?itemId=${itemId}`, {
        ...itemData,
        userId
      })
      return response.data
    } catch (error) {
      console.error('Error updating item:', error)
      throw error
    }
  },

  /**
   * Delete item
   * @param {string} itemId - Item ID
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  deleteItem: async (itemId, userId) => {
    try {
      const response = await axiosInstance.delete(`/api/example?itemId=${itemId}&userId=${userId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting item:', error)
      throw error
    }
  },

  /**
   * Get items with relations
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  getItemsWithRelations: async userId => {
    try {
      const response = await axiosInstance.get(`/api/example/relations?userId=${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching items with relations:', error)
      throw error
    }
  },

  /**
   * Create item with relations
   * @param {Object} itemData - Item data with relations
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  createItemWithRelations: async (itemData, userId) => {
    try {
      const response = await axiosInstance.post('/api/example/relations', {
        ...itemData,
        userId
      })
      return response.data
    } catch (error) {
      console.error('Error creating item with relations:', error)
      throw error
    }
  }
}

export default exampleApi
