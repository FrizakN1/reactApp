package database

import (
	"database/sql"
	_ "github.com/lib/pq"
	"react/utils"
	"strings"
)

type Order struct {
	ID           int
	Recipient    string
	Date         string
	RequiredDate string
	State        string
	Zone         string
}

type Search struct {
	Text string
}

var query map[string]*sql.Stmt

func prepareRequest() []string {
	query = make(map[string]*sql.Stmt)
	errors := make([]string, 0)
	var e error

	query["GetZones"], e = Link.Prepare(`SELECT "Name" FROM "Zones"`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	query["AddOrder"], e = Link.Prepare(`INSERT INTO "Orders"("Recipient", "Date", "Required_date", "State", "Zone") VALUES ($1,CURRENT_TIMESTAMP,$2,$3,$4)`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	query["GetTableData"], e = Link.Prepare(`SELECT "ID", "Recipient", "Date", "Required_date", "State", "Zone" FROM "Orders" WHERE "Recipient" ILIKE '%' || $1 || '%' ORDER BY "ID"`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	query["GetStates"], e = Link.Prepare(`SELECT "Name" FROM "States"`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	query["SetState"], e = Link.Prepare(`UPDATE "Orders" SET "State" = $1 WHERE "ID" = $2`)
	if e != nil {
		errors = append(errors, e.Error())
	}

	return errors
}

func (s *Order) SetState() bool {
	stmt, ok := query["SetState"]
	if !ok {
		utils.Logger.Println("query не найден")
		return false
	}

	_, e := stmt.Exec(s.State, s.ID)
	if e != nil {
		utils.Logger.Println(e)
		return false
	}

	return true
}

func GetStates() []string {
	var states []string
	stmt, ok := query["GetStates"]
	if !ok {
		utils.Logger.Println("query не найден")
		return nil
	}

	rows, e := stmt.Query()
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}

	for rows.Next() {
		var state string
		e = rows.Scan(&state)
		if e != nil {
			utils.Logger.Println(e)
			return nil
		}

		states = append(states, state)
	}

	return states
}

func GetTableData(searchText string) []Order {
	var data []Order
	stmt, ok := query["GetTableData"]
	if !ok {
		utils.Logger.Println("query не найден")
		return nil
	}

	rows, e := stmt.Query(searchText)
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}

	for rows.Next() {
		var row Order
		e = rows.Scan(&row.ID, &row.Recipient, &row.Date, &row.RequiredDate, &row.State, &row.Zone)
		if e != nil {
			utils.Logger.Println(e)
			return nil
		}

		row.Date = row.Date[0:10]
		handlingDate := strings.Split(row.Date, "-")
		row.Date = handlingDate[2] + "." + handlingDate[1] + "." + handlingDate[0]
		row.RequiredDate = row.RequiredDate[0:10]
		handlingDate = strings.Split(row.RequiredDate, "-")
		row.RequiredDate = handlingDate[2] + "." + handlingDate[1] + "." + handlingDate[0]

		data = append(data, row)
	}

	return data
}

func (o *Order) AddOrder() bool {
	stmt, ok := query["AddOrder"]
	if !ok {
		utils.Logger.Println("query не найден")
		return false
	}

	_, e := stmt.Exec(o.Recipient, o.RequiredDate, "Выполняется", o.Zone)
	if e != nil {
		utils.Logger.Println(e)
		return false
	}

	return true
}

func GetInputData() []string {
	var zones []string
	stmt, ok := query["GetZones"]
	if !ok {
		utils.Logger.Println("query не найден")
		return nil
	}

	rows, e := stmt.Query()
	if e != nil {
		utils.Logger.Println(e)
		return nil
	}

	for rows.Next() {
		var zone string
		e = rows.Scan(&zone)
		if e != nil {
			utils.Logger.Println(e)
			return nil
		}

		zones = append(zones, zone)
	}

	return zones
}
