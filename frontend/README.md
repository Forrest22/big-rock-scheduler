# Big Rock Tee Time Scheduler

A React + Vite frontend served by a Go backend as a single binary.

## Structure

```
myapp/
├── frontend/       # Vite + React app
│   ├── src/
│   ├── dist/       # built output (generated, do not edit)
│   └── vite.config.ts
├── backend/
│   └── main.go     # Go server, serves API and static files
├── go.mod
├── Makefile
└── .air.toml       # air config for Go hot reload
```

## How it works

The Go server does two things:
- Serves API routes under `/api/`
- Serves the built React app (`frontend/dist/`) as static files, with a fallback to `index.html` for client-side routing

In production, the `frontend/dist` folder is embedded directly into the Go binary using `//go:embed`, so deployment is a single file.

During development, Vite runs its own dev server with hot module replacement (HMR), and proxies `/api` requests to the Go server.

## Development

Requires Node.js, Go 1.23+, and [air](https://github.com/air-verse/air) for Go hot reload.

Install air:
```
go install github.com/air-verse/air@latest
```

Install frontend dependencies:
```
cd frontend && npm install
```

Start both servers:
```
make dev
```

- Frontend runs on `http://localhost:5173` with HMR
- Go API runs on `http://localhost:8080`
- API calls from the frontend are proxied automatically

## Production build

```
make build
./server
```

This builds the frontend into `frontend/dist/`, compiles the Go binary with the frontend embedded, and outputs a single `server` binary. Run it and visit `http://localhost:8080`.

The `PORT` environment variable can be used to change the port:
```
PORT=3000 ./server
```
