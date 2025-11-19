package repository

import (
	"context"
	"database/sql"
	"todoapp/helper"
	"todoapp/model/domain"
)

type TodoRepositoryImpl struct {
	DB *sql.DB
}

func NewTodoRepository(db *sql.DB) TodoRepository {
	return &TodoRepositoryImpl{
		DB: db,
	}
}

func (r *TodoRepositoryImpl) Save(ctx context.Context, todo domain.TodoApp) {
	SQL := "INSERT INTO todos(name) VALUES ($1) RETURNING id"
	err := r.DB.QueryRowContext(ctx, SQL, todo.Name).Scan(&todo.Id)
	helper.PanicIfError(err)
}

func (r *TodoRepositoryImpl) Update(ctx context.Context, todo domain.TodoApp) {
	SQL := "UPDATE todos SET name = $1 WHERE id = $2"
	_, err := r.DB.ExecContext(ctx, SQL, todo.Name, todo.Id)
	helper.PanicIfError(err)
}

func (r *TodoRepositoryImpl) Delete(ctx context.Context, todo domain.TodoApp) {
	SQL := "DELETE FROM todos WHERE id = $1"
	_, err := r.DB.ExecContext(ctx, SQL, todo.Id)
	helper.PanicIfError(err)
}

func (r *TodoRepositoryImpl) FindById(ctx context.Context, id int) (domain.TodoApp, error) {
	SQL := "SELECT id, name FROM todos WHERE id = $1"
	var todo domain.TodoApp
	err := r.DB.QueryRowContext(ctx, SQL, id).Scan(&todo.Id, &todo.Name)
	return todo, err
}

func (r *TodoRepositoryImpl) FindAll(ctx context.Context) []domain.TodoApp {
	SQL := "SELECT id, name FROM todos"
	rows, err := r.DB.QueryContext(ctx, SQL)
	helper.PanicIfError(err)
	defer rows.Close()

	var todos []domain.TodoApp
	for rows.Next() {
		var todo domain.TodoApp
		err := rows.Scan(&todo.Id, &todo.Name)
		helper.PanicIfError(err)
		todos = append(todos, todo)
	}

	return todos
}
