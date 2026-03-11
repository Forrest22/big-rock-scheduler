package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
)

//go:embed dist
var static embed.FS

func main() {
	mux := http.NewServeMux()

	// API routes
	mux.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message": "hello from Go"}`))
	})

	// Static file serving with SPA fallback
	distFS, _ := fs.Sub(static, "dist")
	fileServer := http.FileServer(http.FS(distFS))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// If the file exists in dist, serve it
		if _, err := fs.Stat(distFS, strings.TrimPrefix(r.URL.Path, "/")); err == nil {
			fileServer.ServeHTTP(w, r)
			return
		}
		// Otherwise serve index.html for SPA routing
		index, _ := static.ReadFile("frontend/dist/index.html")
		w.Header().Set("Content-Type", "text/html")
		w.Write(index)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
