package app

import (
	"database/sql"
	"os"
	"time"
	"todoapp/helper"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/joho/godotenv"
)

var db *sql.DB

func NewDB() *sql.DB{
	if db != nil {
		return db
	}

	godotenv.Load("./.env")

	dsn:= os.Getenv("DATABASE_URL")
	if dsn == "" {
		panic("DATABASE_URL not found")
	}

	var err error
	db,err = sql.Open("pgx",dsn)
	helper.PanicIfError(err)

	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	db.SetConnMaxLifetime(60 * time.Minute)
	db.SetConnMaxIdleTime(5 * time.Minute)

	return db
}