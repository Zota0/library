# Aplikacja do biblioteki

## Sposób użycia:

### 1. Docker-compose:
- Na serwerze z obsługą `docker-compose.yml`, nalezy wgrać pliki na serwer,
- ustawic odpowiednia wartosci w plikach `.env`-

### 2. Docker oddzielne serwisy:
- Na 2 serwery dockera z obsługą  `dockerfile` nalezy wgrac pliki z(lub sciezki i ustawic domyslny folder na): `backend/` oraz `frontend/`
- Ustawić odpowiednie wartości w plikach `.env`
<hr/>

### 
Następnie wystarczy otworzyć stronę:
- Backend:
  - MySQL: `3306`(domyślnie)
  - PHP: `3454`(domyślnie)
- Frontend `3000`(domyślnie)

## Technologie użyte:
- Docker,
- Frontend:
  - Bun 1.29
  - Typescript
  - React(Nextjs)
  - tailwindcss(+własne klasy)
- Backend:
  - PHP 8.2 (z mysqli)
  - MySql
- Aplikacja
  - Batch
  - Go(golang 1.22)
  - moduł webview_go

## Developer:
- frontend:
 - `bun run dev`
- backend:
 - `php -S localhost:3454`
- app:
  - `./run`
  - `go run main.go`
  - `go build main.go -out biblioteka`

 #### Licencja MIT
