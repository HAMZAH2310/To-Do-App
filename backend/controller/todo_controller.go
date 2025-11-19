package controller

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
)

type TodoController interface {
	Create(writer http.ResponseWriter, response *http.Request,Params httprouter.Params)
	Update(writer http.ResponseWriter, response *http.Request,Params httprouter.Params)
	Delete(writer http.ResponseWriter, response *http.Request,Params httprouter.Params)
	FindAll(writer http.ResponseWriter, response *http.Request,Params httprouter.Params)
}