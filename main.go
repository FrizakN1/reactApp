package main

import (
	"github.com/gin-gonic/gin"
	"react/database"
	"react/settings"
	"react/utils"
)

func main() {
	options := settings.LoadSetting("settings.json")
	database.Connection(options)
	router := gin.Default()
	router.LoadHTMLGlob("template/*.html")
	router.Static("assets", "assets/")
	router.GET("/", index)

	routerAPI := router.Group("/api")
	routerAPI.PUT("/addOrder", addOrder)
	routerAPI.GET("/getInputData", getInputData)
	routerAPI.POST("/getTableData", getTableData)
	routerAPI.GET("/getStates", getStates)
	routerAPI.POST("/setState", setState)

	_ = router.Run(options.Address + ":" + options.Port)
}

func setState(c *gin.Context) {
	var setNewState database.Order
	e := c.BindJSON(&setNewState)
	if e != nil {
		utils.Logger.Println(e)
		return
	}
	c.JSON(200, setNewState.SetState())
}

func getStates(c *gin.Context) {
	var states []string
	states = database.GetStates()
	c.JSON(200, states)
}

func getTableData(c *gin.Context) {
	var searchText database.Search
	e := c.BindJSON(&searchText)
	if e != nil {
		utils.Logger.Println(e)
	}
	var data []database.Order
	data = database.GetTableData(searchText.Text)
	c.JSON(200, data)
}

func getInputData(c *gin.Context) {
	c.JSON(200, database.GetInputData())
}

func addOrder(c *gin.Context) {
	var order database.Order
	e := c.BindJSON(&order)
	if e != nil {
		utils.Logger.Println(e)
		return
	}
	c.JSON(200, order.AddOrder())
}

func index(c *gin.Context) {
	c.HTML(200, "index", nil)
}
