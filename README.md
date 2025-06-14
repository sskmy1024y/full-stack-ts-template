# Full-Stack TypeScript Template

A monorepo full-stack TypeScript template providing a type-safe development environment with Fastify + tRPC + Next.js + React Native/Expo.

## 🚀 Tech Stack

### Common
- **TypeScript**: 5.7.2
- **Node.js**: 22.12.0 LTS
- **Yarn Workspaces**: Monorepo management
- **ESLint**: 9.17.0 (flat config)

### Backend
- **Fastify**: 5.3.3 (high-performance web framework)
- **tRPC**: 11.x (type-safe API)
- **Prisma**: 6.8.2 (ORM)
- **PostgreSQL**: 16 (database)
- **Zod**: validation

### Frontend
- **Next.js**: 15.x (App Router)
- **React**: 19.1.0
- **TanStack Query**: data fetching
- **Tailwind CSS**: styling

### Mobile
- **React Native**: latest
- **Expo**: latest
- **tRPC**: shared with frontend

## 📁 Project Structure

```
full-stack-ts-template/
├── apps/
│   ├── server/                 # Backend API (Fastify + tRPC)
│   ├── frontend/               # Frontend app (Next.js)
│   └── mobile/                 # Mobile app (React Native/Expo)
├── packages/
│   ├── shared-lib/             # Shared library (types, utilities, etc.)
│   ├── tsconfig/               # Shared TypeScript config
│   ├── eslint-config/          # Shared ESLint config
│   └── database/               # Prisma schema and migrations
├── docker-compose.yml          # Database environment
└── package.json                # Workspace configuration
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file values as needed.

### 3. Start Database

```bash
docker-compose up -d
```

### 4. Initialize Database

```bash
# Generate Prisma client
yarn db:generate

# Run migrations
yarn db:migrate

# Seed data (optional)
yarn workspace @template/database db:seed
```

### 5. Start Development Servers

```bash
# Start all applications in parallel
yarn dev

# Or start individually
yarn workspace @template/server dev      # Backend (port 3001)
yarn workspace @template/frontend dev    # Frontend (port 3000)
yarn workspace @template/mobile dev      # Mobile
```

## 📱 Applications

### Backend (apps/server)
- **URL**: http://localhost:3001
- **tRPC Playground**: http://localhost:3001/trpc-playground
- **DDD Architecture**: Domain, Application, Infrastructure, Presentation layers

### Frontend (apps/frontend)
- **URL**: http://localhost:3000
- **Next.js App Router**: Server Components + Client Components
- **Type-safe API calls**: tRPC client

### Mobile (apps/mobile)
- **Expo Dev Tools**: URL displayed after starting dev server
- **Platforms**: iOS, Android, Web support

## 🔧 Development Commands

```bash
# Development
yarn dev                    # Start all applications in parallel
yarn workspace <name> dev   # Start individual application

# Build
yarn build                  # Build all projects
yarn workspace <name> build # Build individual project

# Lint & Type check
yarn lint                   # Lint all projects
yarn type-check            # Type check all projects

# Database
yarn db:generate           # Generate Prisma client
yarn db:migrate            # Run migrations
yarn db:studio             # Start Prisma Studio
yarn db:reset              # Reset database

# Cleanup
yarn clean                 # Remove build artifacts
```

## 🏗️ Architecture

### Server Architecture (DDD)
```
apps/server/src/
├── application/     # Use cases & application services
├── domain/          # Domain models & repository interfaces
├── infrastructure/  # External system integration & Prisma implementation
├── presentation/    # DTOs & controllers
└── main.ts         # Entry point
```

### Type Safety
- Complete type safety from frontend to backend
- API type inference with tRPC
- Validation with Zod
- Shared type definitions via common library

## 🔐 Authentication

Basic JWT authentication system implemented:
- User registration & login
- JWT token-based authentication
- Password hashing

## 🧪 Testing

```bash
# Run tests (planned implementation)
yarn test
yarn workspace <name> test
```

## 🚀 Deployment

### Production Environment Variables
Set the following environment variables appropriately in production:
- `DATABASE_URL`: Production database URL
- `JWT_SECRET`: Strong JWT secret
- `NODE_ENV`: "production"

### Platform Examples
- **Vercel**: Frontend
- **Railway/Render**: Backend
- **Expo EAS**: Mobile app

## 📝 Future Enhancements

- [ ] Automated testing (Jest, Playwright)
- [ ] OAuth authentication (Google, GitHub)
- [ ] Real-time features (WebSocket)
- [ ] File upload
- [ ] CI/CD (GitHub Actions)
- [ ] Monitoring & logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

MIT License