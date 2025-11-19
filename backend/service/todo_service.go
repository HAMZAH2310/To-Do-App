package service

import (
	"context"
	"todoapp/model/web"
)

type TodoService interface {
	Create(ctx context.Context, request web.TodoCreateRequest) web.TodoResponse

	Update(ctx context.Context, request web.TodoUpdateRequest)web.TodoResponse

	Delete(ctx context.Context, todoId int)

	FindAll(ctx context.Context)[]web.TodoResponse
}