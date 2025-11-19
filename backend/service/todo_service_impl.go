package service

import (
	"context"
	"todoapp/exception"
	"todoapp/helper"
	"todoapp/model/domain"
	"todoapp/model/web"
	"todoapp/repository"

	"github.com/go-playground/validator"
)

type TodoServiceImpl struct {
	TodoRepository repository.TodoRepository
	Validate       *validator.Validate
}

func NewTodoService(todoRepository repository.TodoRepository, validate *validator.Validate) TodoService {
	return &TodoServiceImpl{
		TodoRepository: todoRepository,
		Validate:       validate,
	}
}

func (service TodoServiceImpl) Create(ctx context.Context, request web.TodoCreateRequest) web.TodoResponse {

	err := service.Validate.Struct(request)
	helper.PanicIfError(err)

	todo := domain.TodoApp{
		Name: request.Name,
	}

	service.TodoRepository.Save(ctx, todo)

	return helper.TodoResponse(todo)
}

func (service TodoServiceImpl) Update(ctx context.Context, request web.TodoUpdateRequest) web.TodoResponse {
	err := service.Validate.Struct(request)
	if err != nil {
		panic(exception.NewNotFoundError(err.Error()))
	}

	todo := domain.TodoApp{
		Id:   request.Id,
		Name: request.Name,
	}

	service.TodoRepository.Update(ctx, todo)

	return helper.TodoResponse(todo)
}

func (service TodoServiceImpl) Delete(ctx context.Context, todoId int) {
	todo, err := service.TodoRepository.FindById(ctx, todoId)
	if err != nil {
		panic(exception.NewNotFoundError(err.Error()))
	}

	service.TodoRepository.Delete(ctx, todo)
}

func (service TodoServiceImpl) FindAll(ctx context.Context) []web.TodoResponse {

	todos := service.TodoRepository.FindAll(ctx)
	return helper.TodoResponses(todos)
}
