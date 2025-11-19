package controller

import (
	"net/http"
	"strconv"
	"todoapp/helper"
	"todoapp/model/web"
	"todoapp/service"

	"github.com/julienschmidt/httprouter"
)

type TodoControllerImpl struct {
	TodoService 	service.TodoService
}

func NewTodoController(todoService service.TodoService) TodoController  {
	return &TodoControllerImpl{
		TodoService: todoService,
	}
}

func (todo TodoControllerImpl) Create (writer http.ResponseWriter, request *http.Request, param httprouter.Params) {
	todoCreateRequest:= web.TodoCreateRequest{}
	helper.ReadFromRequestBody(request,&todoCreateRequest)

	todoResponse:= todo.TodoService.Create(request.Context(),todoCreateRequest)

	webResponse:= web.WebResponse{
		Code: 200,
		Status: "OK",
		Data: todoResponse,
	}

	helper.WriteToResponseBody(writer,webResponse)
}

func (todo TodoControllerImpl) Update (writer http.ResponseWriter, request *http.Request, param httprouter.Params){
	todoUpdateRequest:= web.TodoUpdateRequest{}
	helper.ReadFromRequestBody(request, &todoUpdateRequest)

	todoId:= param.ByName("todoId")
	id,err:= strconv.Atoi(todoId)
	helper.PanicIfError(err)

	todoUpdateRequest.Id = id

	todoResponse:= todo.TodoService.Update(request.Context(),todoUpdateRequest)
	webResponse:= web.WebResponse{
		Code: 200,
		Status: "OK",
		Data: todoResponse,
	}

	helper.WriteToResponseBody(writer,webResponse)
}

func (todo TodoControllerImpl) Delete(writer http.ResponseWriter, request *http.Request,param httprouter.Params) {
	
	todoId:= param.ByName("todoId")
	id,err:= strconv.Atoi(todoId)
	helper.PanicIfError(err)

	todo.TodoService.Delete(request.Context(),id)
	webResponse:= web.WebResponse{
		Code: 200,
		Status: "OK",
	}

	helper.WriteToResponseBody(writer,webResponse)
}

func (todo TodoControllerImpl) FindAll(writer http.ResponseWriter, response *http.Request,param httprouter.Params) {
	todoResponse:= todo.TodoService.FindAll(response.Context())	

	webResponse:= web.WebResponse{
		Code: 200,
		Status: "OK",
		Data:todoResponse,
	}

	helper.WriteToResponseBody(writer,webResponse)
}