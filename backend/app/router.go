package app

import (
	"todoapp/controller"
	"todoapp/exception"

	"github.com/julienschmidt/httprouter"
)

func NewRouter(todoController controller.TodoController) *httprouter.Router {

	router:= httprouter.New()

	router.GET("/api/todos",todoController.FindAll)
	router.POST("/api/todos",todoController.Create)
	router.PUT("/api/todos/:todoId",todoController.Update)
	router.DELETE("/api/todos/:todoId", todoController.Delete)

	router.PanicHandler = exception.ErrorHandler
	return router
}