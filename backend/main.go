package main

import (
	"net/http"
	"todoapp/app"
	"todoapp/controller"
	"todoapp/helper"
	"todoapp/middleware"
	"todoapp/repository"
	"todoapp/service"

	"github.com/go-playground/validator"
	_"github.com/julienschmidt/httprouter"

	"github.com/rs/cors"
)

func main() {
	db := app.NewDB()
	validate := validator.New()

	todoRepository := repository.NewTodoRepository(db)
	todoService := service.NewTodoService(todoRepository, validate)
	todoController := controller.NewTodoController(todoService)

	router := app.NewRouter(todoController)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Origin", "Content-Type", "Accept", "Authorization","X-API-Key"},
		AllowCredentials: true,
	})

	handler := corsMiddleware.Handler(router)                   
	handler = middleware.NewAuthMiddleware(handler)             


	server := http.Server{
		Addr:    "localhost:8080",
		Handler: handler,
	}

	println("Server running on http://localhost:8080")
	println("API: http://localhost:8080/api/todos")

	err := server.ListenAndServe()
	helper.PanicIfError(err)
}