.PHONY: dev build run

dev:
	@cd frontend && npm run dev & air

build:
	cd frontend && npm run build
	cp -r frontend/dist backend/dist
	go build -o server ./backend

run: build
	./server
