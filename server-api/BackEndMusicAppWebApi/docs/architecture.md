# BackEndMusicAppWebApi Architecture

## Solution layout

```
BackEndMusicAppWebApi.sln
├── ApiGateway           (YARP-based reverse proxy routing to all services)
├── AuthenticationService (existing service for identity and JWT issuance)
├── SongService          (catalog of songs)
├── SingerService        (artist profiles)
├── PlaylistService      (user playlists and song ordering)
└── FavoriteService      (per-user favorite songs)
```

Each service is an isolated ASP.NET Core Web API (net8.0) with its own Domain, Application, Infrastructure and API layers. For simplicity the services use EF Core InMemory providers right now, but the DbContext classes are ready to be switched to SQL Server or PostgreSQL by swapping the provider registration.

## Architecture Pattern

The project follows a **Repository Pattern** with clear separation of concerns:

1. **Domain Layer**: Contains entities and repository interfaces
2. **Application Layer**: Contains DTOs, service interfaces, and business logic
3. **Infrastructure Layer**: Contains repository implementations and DbContext
4. **API Layer**: Contains controllers that call services

**Data Flow**: `DbContext` → `Repository` → `Service` → `Controller` → `API Gateway`

## Cross-service boundaries

| Service          | Responsibility                                | Key entities                       |
|------------------|-----------------------------------------------|------------------------------------|
| Authentication   | Sign-up/login, JWT tokens, user identities    | `ApplicationUser`, refresh tokens  |
| SongService      | CRUD for songs and metadata                    | `Song`                             |
| SingerService    | CRUD for artists/singers                       | `Singer`                           |
| PlaylistService  | Manage playlists and track ordering           | `Playlist`, `PlaylistSong`         |
| FavoriteService  | Track user favorite songs                     | `FavoriteSong`                     |

Services communicate through IDs only to keep boundaries clean. Later you can introduce event-driven messaging (e.g. using RabbitMQ) or API Gateway patterns if needed.

## API surface

### Direct Service Access
All services expose RESTful controllers under `api/<resource>`:

- `SongService` → `GET/POST/PUT/DELETE api/songs`
- `SingerService` → `GET/POST/PUT/DELETE api/singers`
- `PlaylistService` → CRUD plus `PUT api/playlists/{id}/songs` for reordering
- `FavoriteService` → `GET api/favorites/{userId}`, `POST api/favorites`, `DELETE api/favorites/{userId}/songs/{songId}`

### API Gateway Access
The API Gateway (port 5000) routes all requests to the appropriate microservices:

- `http://localhost:5000/api/auth/*` → AuthenticationService (port 5183)
- `http://localhost:5000/api/songs/*` → SongService (port 5232)
- `http://localhost:5000/api/singers/*` → SingerService (port 5126)
- `http://localhost:5000/api/playlists/*` → PlaylistService (port 5262)
- `http://localhost:5000/api/favorites/*` → FavoriteService (port 5055)

These controllers delegate to application services that encapsulate business rules and call repositories. Repositories abstract data access from EF Core DbContext. DTOs ensure input validation and output shaping.

## Local development workflow

1. **Run individual services**: `dotnet run --project <Service>/<Service>.csproj`
   - Each service exposes Swagger UI at `/swagger` when `ASPNETCORE_ENVIRONMENT=Development`
   - Seed data is inserted automatically on startup to make manual testing easier

2. **Run API Gateway**: `dotnet run --project ApiGateway/ApiGateway.csproj`
   - Gateway runs on port 5000 and routes requests to backend services
   - Access Swagger at `http://localhost:5000/swagger`

3. **Repository Pattern**: 
   - Data access is abstracted through repository interfaces in the Domain layer
   - Repository implementations in Infrastructure layer use DbContext
   - Services depend on repository interfaces, not DbContext directly

4. **Persistence**: When ready for production, replace `UseInMemoryDatabase` with `UseSqlServer` or another provider and add migrations per service.

## Next steps

- Introduce API Gateway (YARP or Ocelot) to route frontend traffic to services.
- Add communication between services (e.g., Singer updates triggering SongService cache refresh).
- Implement authentication/authorization by validating JWTs from `AuthenticationService`.
- Add integration tests per service and shared contract tests.

