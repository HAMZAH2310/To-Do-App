package middleware

import (
	"net/http"
	"todoapp/helper"
	"todoapp/model/web"
)

type AuthMiddleware struct {
	Handler http.Handler
}

func NewAuthMiddleware(handler http.Handler) *AuthMiddleware {
	return &AuthMiddleware{Handler: handler}
}

func (middleware AuthMiddleware) ServeHTTP(writer http.ResponseWriter, request *http.Request) {

	if request.Method == http.MethodOptions {
		middleware.Handler.ServeHTTP(writer,request)
		return
	}

	if request.Header.Get("X-API-Key") == "TODOS" {
		middleware.Handler.ServeHTTP(writer, request)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusUnauthorized)

	webResponse := web.WebResponse{
		Code:   http.StatusUnauthorized,
		Status: "Unauthorized",
	}

	helper.WriteToResponseBody(writer, webResponse)
}
