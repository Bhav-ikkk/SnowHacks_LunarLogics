# 🏔️ SnowHacks Template - LunarLogics

A production-ready Next.js hackathon template with clean 3-layer architecture, complete with database integration, authentication, and UI components.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your database credentials

# Run development server
npm run dev
```

Visit http://localhost:3000

## 🎯 What's Included

- ✅ **3-Layer Architecture** (Pages → Views → API → Services)
- ✅ **Database Integration** (pg-promise + PostgreSQL)
- ✅ **UI Components** (Material-UI + Tabler Icons)
- ✅ **Animations** (Framer Motion)
- ✅ **Internationalization** (i18next)
- ✅ **Theme System** (Light/Dark mode)
- ✅ **Permissions** (CASL)
- ✅ **HTTP Client** (Axios configured)
- ✅ **Complete Example** (CRUD operations)

## 📖 Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete guide on:
- Architecture overview
- Data flow
- Creating new features
- Best practices
- Code examples

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (Page Router) |
| Frontend | React 19 + Material-UI |
| Database | PostgreSQL + pg-promise |
| HTTP Client | Axios |
| Permissions | CASL |
| Icons | Tabler Icons |
| Animations | Framer Motion |
| i18n | i18next |

## 📁 Project Structure

```
src/
├── pages/          # Pages & API routes
├── views/          # UI components
├── api/            # API client functions
├── services/       # Business logic & DB queries
├── components/     # Reusable components
├── configs/        # Configuration files
├── contexts/       # React contexts
├── lib/            # Utilities
└── theme/          # Theme configuration
```

## 🚀 Creating Features

### 1. Create Service
```javascript
// src/services/myService.js
export default {
  async getAll(userId) {
    const result = await query(`SELECT * FROM table WHERE user_id = $1`, [userId])
    return { success: true, data: result }
  }
}
```

### 2. Create API Route
```javascript
// src/pages/api/my-feature/index.js
import myService from 'src/services/myService'

export default async function handler(req, res) {
  const result = await myService.getAll(userId)
  return res.status(200).json(result)
}
```

### 3. Create API Client
```javascript
// src/api/myApi.js
import axiosInstance from 'src/lib/axios'

export default {
  getAll: async (userId) => {
    const response = await axiosInstance.get(`/api/my-feature?userId=${userId}`)
    return response.data
  }
}
```

### 4. Create View
```javascript
// src/views/my-feature/index.js
import myApi from 'src/api/myApi'

const MyView = () => {
  const loadData = async () => {
    const response = await myApi.getAll(userId)
    setData(response.data)
  }
  // UI rendering
}
```

### 5. Create Page
```javascript
// src/pages/my-feature/index.js
import MyView from 'src/views/my-feature'

export default () => <MyView />
```

## 🎨 Example Included

Visit `/example` to see a complete CRUD implementation with:
- List view with grid layout
- Create/Edit dialog
- Delete functionality
- Loading states
- Error handling
- Animations

## 📝 Environment Variables

```env
# Database
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
DB_POOLSIZE=10

# App
NEXT_PUBLIC_APP_NAME=Your App Name
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🔒 Permissions

Use CASL for permission management:

```javascript
// In your view
import { useCan } from 'src/contexts/AbilityContext'

const canCreate = useCan('create', 'items')
```

```javascript
// In your page
MyPage.acl = {
  action: 'read',
  subject: 'items'
}
```

## 📚 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

This is a hackathon template. Feel free to modify and use as needed!

## 📄 License

MIT

---

Built with ❤️ for SnowHacks by LunarLogics
