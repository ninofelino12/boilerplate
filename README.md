# Mobile App Boilerplate - Next.js + Neon + Firebase RTDB

A modern mobile-style web application boilerplate built with Next.js, featuring dual database support (Neon PostgreSQL and Firebase Real-Time Database).

## 🚀 Features

- **Mobile-First Design**: Optimized for mobile devices with touch-friendly UI
- **Neon Database**: Serverless PostgreSQL with powerful query capabilities
- **Firebase RTDB**: Real-time data synchronization across all clients
- **TypeScript**: Full type safety throughout the application
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **App Router**: Next.js 14 App Router with Server Components
- **Dark Mode**: Automatic dark mode support
- **Responsive Components**: Mobile-optimized components with touch feedback

## 📦 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Database 1**: Neon (Serverless PostgreSQL)
- **Database 2**: Firebase Real-Time Database
- **UI**: Custom mobile-first components

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon Database account
- Firebase project

### Installation

1. **Clone or use this boilerplate**
   ```bash
   cd /home/esp/Documents/boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure Neon Database**
   
   - Create a project at [neon.tech](https://neon.tech)
   - Get your database URL from the Neon dashboard
   - Add it to `.env.local`:
     ```
     NEON_DATABASE_URL=postgresql://username:password@ep-xyz-123456.us-east-1.aws.neon.tech/dbname
     ```

5. **Configure Firebase RTDB**
   
   - Create a project at [Firebase Console](https://console.firebase.google.com)
   - Enable Real-Time Database
   - Get your config from the Firebase dashboard
   - Add all Firebase variables to `.env.local`

6. **Initialize the database**
   
   Run the SQL migration in your Neon database:
   ```bash
   # Use the Neon dashboard or psql to run database/init.sql
   ```

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   
   Navigate to `http://localhost:3000` and use mobile view in DevTools or open on a mobile device.

## 📱 Pages

- **Home** (`/`): Landing page with features overview
- **Items** (`/items`): CRUD operations with Neon Database
- **Realtime** (`/realtime`): Real-time chat with Firebase RTDB
- **Profile** (`/profile`): App info and tech stack

## 🗂️ Project Structure

```
boilerplate/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── items/
│   │   │       ├── route.ts          # Items API endpoint
│   │   │       └── [id]/route.ts     # Single item API endpoint
│   │   ├── items/
│   │   │   └── page.tsx              # Items page (Neon DB)
│   │   ├── realtime/
│   │   │   └── page.tsx              # Realtime page (Firebase RTDB)
│   │   ├── profile/
│   │   │   └── page.tsx              # Profile page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.tsx         # Bottom navigation
│   │   │   └── Header.tsx            # Header component
│   │   └── ui/
│   │       ├── Card.tsx              # Card component
│   │       ├── LoadingSkeleton.tsx   # Loading skeleton
│   │       └── Toast.tsx             # Toast notifications
│   └── lib/
│       └── db/
│           ├── neon.ts               # Neon database client
│           └── rtdb.ts               # Firebase RTDB client
├── database/
│   └── init.sql                      # Database schema
├── .env.local.example                # Environment variables example
└── package.json
```

## 🔧 Database Operations

### Neon Database (PostgreSQL)

```typescript
import { query, getItems, createItem, updateItem, deleteItem } from '@/lib/db/neon';

// Get all items
const items = await getItems();

// Create item
const newItem = await createItem('Name', 'Description');

// Update item
const updated = await updateItem(id, 'New Name', 'New Description');

// Delete item
const deleted = await deleteItem(id);
```

### Firebase Real-Time Database

```typescript
import { writeToDB, updateDB, deleteFromDB, subscribeToDB, getFromDB } from '@/lib/db/rtdb';

// Write data
await writeToDB('path/to/data', { key: 'value' });

// Update data
await updateDB('path/to/data', { key: 'new value' });

// Delete data
await deleteFromDB('path/to/data');

// Subscribe to changes
const unsubscribe = subscribeToDB('path', (data) => {
  console.log('Data updated:', data);
});

// Get data once
const data = await getFromDB('path/to/data');
```

## 🎨 Customization

### Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: #3b82f6;
  --secondary: #10b981;
  --accent: #f59e0b;
  /* ... */
}
```

### Navigation

Edit `src/components/layout/BottomNav.tsx` to customize navigation items.

### Database Schema

Modify `database/init.sql` to change the database schema.

## 📝 API Routes

### Items API

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `DELETE /api/items/[id]` - Delete an item

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS
- etc.

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Implement proper authentication for production
- Validate and sanitize all user inputs
- Use HTTPS in production

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT
