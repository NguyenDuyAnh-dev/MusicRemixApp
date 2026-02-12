# Music App Backend - Microservices Architecture

A .NET 8 microservices-based backend for a music application with API Gateway, implementing repository pattern and clean architecture.

## Architecture

This project follows a **microservices architecture** with the following components:

- **ApiGateway**: YARP-based reverse proxy that routes requests to backend services
- **AuthenticationService**: User authentication and JWT token management
- **SongService**: Song catalog management
- **SingerService**: Artist/singer profile management
- **PlaylistService**: User playlist management
- **FavoriteService**: User favorite songs management

### Repository Pattern

All services implement the repository pattern:
- **Domain Layer**: Entities and repository interfaces
- **Application Layer**: DTOs, service interfaces, and business logic
- **Infrastructure Layer**: Repository implementations and DbContext
- **API Layer**: Controllers

**Data Flow**: `DbContext` → `Repository` → `Service` → `Controller` → `API Gateway`

## Getting Started

### Prerequisites

- .NET 8 SDK
- Visual Studio 2022 or VS Code (optional)

### Running the Services

1. **Start all microservices** (in separate terminals):

```bash
# Terminal 1 - Authentication Service
dotnet run --project AuthenticationService/AuthenticationService.csproj

# Terminal 2 - Song Service
dotnet run --project SongService/SongService.csproj

# Terminal 3 - Singer Service
dotnet run --project SingerService/SingerService.csproj

# Terminal 4 - Playlist Service
dotnet run --project PlaylistService/PlaylistService.csproj

# Terminal 5 - Favorite Service
dotnet run --project FavoriteService/FavoriteService.csproj

# Terminal 6 - API Gateway
dotnet run --project ApiGateway/ApiGateway.csproj
```

2. **Access the API Gateway**:
   - Swagger UI: `http://localhost:5000/swagger`
   - All API requests should go through the gateway at `http://localhost:5000/api/*`

### Service Ports

- API Gateway: `5000`
- AuthenticationService: `5183`
- SongService: `5232`
- SingerService: `5126`
- PlaylistService: `5262`
- FavoriteService: `5055`

## API Endpoints

### Through API Gateway (http://localhost:5000)

- **Authentication**: `/api/auth/*`
- **Songs**: `/api/songs/*`
- **Singers**: `/api/singers/*`
- **Playlists**: `/api/playlists/*`
- **Favorites**: `/api/favorites/*`

### Direct Service Access

Each service can also be accessed directly via its Swagger UI:
- AuthenticationService: `http://localhost:5183/swagger`
- SongService: `http://localhost:5232/swagger`
- SingerService: `http://localhost:5126/swagger`
- PlaylistService: `http://localhost:5262/swagger`
- FavoriteService: `http://localhost:5055/swagger`

## Project Structure

```
BackEndMusicAppWebApi/
├── ApiGateway/              # API Gateway service
├── AuthenticationService/    # Authentication microservice
├── SongService/             # Song catalog microservice
│   ├── Domain/
│   │   ├── Entities/
│   │   └── Repositories/    # Repository interfaces
│   ├── Application/
│   │   ├── Dto/            # Data Transfer Objects
│   │   └── Services/       # Business logic services
│   ├── Infrastructure/
│   │   ├── Data/           # DbContext
│   │   └── Repositories/   # Repository implementations
│   └── Controllers/        # API controllers
├── SingerService/           # Singer microservice
├── PlaylistService/         # Playlist microservice
├── FavoriteService/         # Favorite microservice
└── docs/
    └── architecture.md     # Detailed architecture documentation
```

## Features

- ✅ Repository pattern implementation
- ✅ Clean architecture with separation of concerns
- ✅ API Gateway with YARP reverse proxy
- ✅ Swagger/OpenAPI documentation
- ✅ In-memory database for development (easily replaceable)
- ✅ Automatic seed data on startup
- ✅ .NET 8 compatibility

## Next Steps

- Replace InMemory database with SQL Server/PostgreSQL
- Add JWT authentication middleware to API Gateway
- Implement service-to-service communication
- Add integration tests
- Add logging and monitoring
- Implement caching layer

## License

This project is for educational purposes.

