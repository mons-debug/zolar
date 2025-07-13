# Zolar Landing Page

A modern, animated landing page for Zolar clothing brand built with Next.js 14 App Router, featuring a whitelist signup for the upcoming oversized t-shirt collection.

## Features

- 🎨 Modern, animated UI with Framer Motion
- 📱 Fully responsive design
- 🔥 Beautiful gradient backgrounds and smooth animations
- 📧 Email whitelist collection with MongoDB storage
- 🛡️ Email validation and duplicate prevention
- 🚀 Built with Next.js 14 App Router and TypeScript

## Tech Stack

- **Next.js 14** - App Router for modern React development
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Prisma** - Database ORM
- **MongoDB** - NoSQL database
- **Zod** - Schema validation
- **HeadlessUI** - Unstyled, accessible UI components

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your database:**
   - Update the `DATABASE_URL` in `.env` with your MongoDB connection string
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database_name`
   - For local MongoDB: `mongodb://localhost:27017/zolar_landing`

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── whitelist/
│   │       └── route.ts      # API endpoint for email collection
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main landing page
├── lib/
│   └── prisma.ts            # Prisma client setup
prisma/
└── schema.prisma            # Database schema
```

## Database Schema

The project uses a simple whitelist model:

```prisma
model WhitelistEntry {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API Endpoints

- `POST /api/whitelist` - Add email to whitelist
- `GET /api/whitelist` - Get whitelist stats

## Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform:**
   - Vercel (recommended)
   - Netlify
   - Railway
   - Your own server

## Environment Variables

```env
DATABASE_URL="your_mongodb_connection_string"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
