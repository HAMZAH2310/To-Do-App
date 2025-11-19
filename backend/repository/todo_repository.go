package repository

import (
	"context"
	"todoapp/model/domain"
)

type TodoRepository interface {
	Save(ctx context.Context, todo domain.TodoApp)
	Update(ctx context.Context, todo domain.TodoApp)
	Delete(ctx context.Context, todo domain.TodoApp)
	FindById(ctx context.Context, id int) (domain.TodoApp, error)
	FindAll(ctx context.Context) []domain.TodoApp
}

