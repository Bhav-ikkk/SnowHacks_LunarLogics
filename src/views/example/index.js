import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import exampleApi from '../../api/exampleApi'

/**
 * Example View Component
 * Main view that displays items and handles CRUD operations
 * This is where all frontend logic lives
 */
const ExampleView = () => {
  // State management
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  // Mock user ID - In production, get from auth context
  const userId = '123'

  // Load items on mount
  useEffect(() => {
    loadItems()
  }, [])

  /**
   * Load all items from API
   */
  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await exampleApi.getAllItems(userId)
      
      if (response.success) {
        setItems(response.data)
      } else {
        setError(response.error || 'Failed to load items')
      }
    } catch (err) {
      setError('Failed to load items')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle create new item
   */
  const handleCreate = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await exampleApi.createItem(formData, userId)
      
      if (response.success) {
        setItems(prev => [response.data, ...prev])
        handleCloseDialog()
      } else {
        setError(response.error || 'Failed to create item')
      }
    } catch (err) {
      setError('Failed to create item')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle update item
   */
  const handleUpdate = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await exampleApi.updateItem(
        currentItem.id,
        formData,
        userId
      )
      
      if (response.success) {
        setItems(prev =>
          prev.map(item =>
            item.id === currentItem.id ? response.data : item
          )
        )
        handleCloseDialog()
      } else {
        setError(response.error || 'Failed to update item')
      }
    } catch (err) {
      setError('Failed to update item')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle delete item
   */
  const handleDelete = async itemId => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await exampleApi.deleteItem(itemId, userId)
      
      if (response.success) {
        setItems(prev => prev.filter(item => item.id !== itemId))
      } else {
        setError(response.error || 'Failed to delete item')
      }
    } catch (err) {
      setError('Failed to delete item')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Open dialog for create/edit
   */
  const handleOpenDialog = (item = null) => {
    setCurrentItem(item)
    setFormData(
      item
        ? { name: item.name, description: item.description }
        : { name: '', description: '' }
    )
    setOpenDialog(true)
  }

  /**
   * Close dialog and reset form
   */
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentItem(null)
    setFormData({ name: '', description: '' })
  }

  /**
   * Handle form submit
   */
  const handleSubmit = () => {
    if (currentItem) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight={600}>
          Example Items
        </Typography>
        <Button
          variant="contained"
          startIcon={<IconPlus />}
          onClick={() => handleOpenDialog()}
          disabled={loading}
        >
          Add Item
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && items.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Items Grid */}
          <Grid container spacing={3}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {item.name}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(item)}
                            disabled={loading}
                          >
                            <IconEdit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item.id)}
                            disabled={loading}
                          >
                            <IconTrash />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.description || 'No description'}
                      </Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: 'block' }}>
                        Created: {new Date(item.created_at).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {items.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No items found
              </Typography>
              <Button
                variant="outlined"
                startIcon={<IconPlus />}
                onClick={() => handleOpenDialog()}
                sx={{ mt: 2 }}
              >
                Create Your First Item
              </Button>
            </Box>
          )}
        </>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentItem ? 'Edit Item' : 'Create New Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.name}
          >
            {loading ? <CircularProgress size={24} /> : currentItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ExampleView
