package helper

import (
	"encoding/json"
	"net/http"
)

func ReadFromRequestBody(request *http.Request, result interface{}) {
    if request.Body == nil {
        return
    }

    decoder := json.NewDecoder(request.Body)
    decoder.DisallowUnknownFields()

    err := decoder.Decode(result)

    if err != nil && err.Error() != "EOF" { 
        PanicIfError(err)
    }
}


func WriteToResponseBody(writer http.ResponseWriter, response interface{})  {
	writer.Header().Add("Content-Type","application/json")
	encoder:= json.NewEncoder(writer)
	err := encoder.Encode(response)
	PanicIfError(err)	
}
