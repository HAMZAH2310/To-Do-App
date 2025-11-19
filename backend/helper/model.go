package helper

import (
	"todoapp/model/domain"
	"todoapp/model/web"
)

func TodoResponse(todos domain.TodoApp) web.TodoResponse{
	return web.TodoResponse{
		Id: todos.Id,
		Name: todos.Name,
	}
}

func TodoResponses(todos []domain.TodoApp)[]web.TodoResponse  {
	var todoResponses[]web.TodoResponse
	for _, todo:= range todos{
		todoResponses = append(todoResponses, TodoResponse(todo))
	}
	return todoResponses
}