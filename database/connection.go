package database

import (
	"database/sql"
	"fmt"
	"react/settings"
	"react/utils"
)

var Link *sql.DB

func Connection(options *settings.Settings) {
	var e error
	Link, e = sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		options.DbAddress,
		options.DbPort,
		options.DbUser,
		options.DbPass,
		options.DbName,
	))
	if e != nil {
		utils.Logger.Println(e)
		return
	}

	e = Link.Ping()
	if e != nil {
		utils.Logger.Println(e)
		return
	}

	errors := make([]string, 0)
	errors = append(errors, prepareRequest()...)
	if len(errors) > 0 {
		for _, i := range errors {
			utils.Logger.Println(i)
		}
	}
}
