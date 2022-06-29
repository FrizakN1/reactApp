class AddWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Recipient: '',
            RequiredDate: '',
            Zone: 'Площадка 1',
            options: [],
            window: false
        };

        this.recipientChange = this.recipientChange.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.requiredDateChange = this.requiredDateChange.bind(this);
        this.zoneChange = this.zoneChange.bind(this);
        this.windowSwitch = this.windowSwitch.bind(this)
    }

    componentDidMount() {
        this.requestData()
    }

    requestData = () =>{
        let arr = []
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/getInputData")
        xhr.onload = () => {
            let res = JSON.parse(xhr.response)
            for (let i of res){
                arr.push(<option>{i}</option>)
            }
            this.setState({options: arr})
        }
        xhr.send()
    }

    recipientChange(event) {
        this.setState({Recipient: event.target.value});
    }

    requiredDateChange(event) {
        this.setState({RequiredDate: event.target.value});
    }

    zoneChange(event) {
        this.setState({Zone: event.target.value});
    }

    windowSwitch(event){
        if(event.target.className === "btn_add" || event.target.className === "window"){
            if (!this.state.window){
                this.setState({window: true})
            } else {
                this.setState({window: false})
            }
        }
    }

    addOrder(){
        if(this.state.Recipient !== '' && this.state.RequiredDate !== '' && this.state.Zone !== ''){
            const data = {
                Recipient: this.state.Recipient,
                RequiredDate: this.state.RequiredDate,
                Zone: this.state.Zone,
            }
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", "/api/addOrder")
            xhr.onload = () => {
                alert("OK")
            }
            xhr.send(JSON.stringify(data))
            this.setState({
                Recipient: '',
                RequiredDate: '',
                window: false
            })
        } else {
            this.refs.recipient.style.border = "1px solid red";
            this.refs.recipient.style.borderBottom = "unset";
            this.refs.date.style.border = "1px solid red";
            this.refs.date.style.borderBottom = "unset";
            this.refs.zone.style.border = "1px solid red";
            this.refs.zone.style.borderBottom = "unset";
        }
    }

    render(){
        if (this.state.window){
            return(
                <div className="window" onMouseDown={this.windowSwitch}>
                    <div className="window_inputBlock">
                        <input className="window_input" ref="recipient" type="text" value={this.state.Recipient} onChange={this.recipientChange} placeholder="Получатель"/>
                        <input className="window_input" ref="date" type="date" value={this.state.RequiredDate} onChange={this.requiredDateChange} placeholder="Требуемая дата"/>
                        <select className="window_input" ref="zone" value={this.state.Zone} onChange={this.zoneChange} placeholder="Зона">
                            {this.state.options}
                        </select>
                        <button onClick={this.addOrder} className="window_btn_add">Добавить</button>
                    </div>
                </div>
            )
        } else {
            return(
                <button onClick={this.windowSwitch} className="btn_add">Добавить</button>
            )
        }
    }
}

class Header extends React.Component{
    render() {
        return (
            <header>
                <h1>Заказы на производство</h1>
                <AddWindow/>
                <label className="search">
                    <input type="text" placeholder="Поиск" className="search_input" value={this.props.value} onChange={this.props.onChange}/>
                    <i className="fa-solid fa-magnifying-glass search search_icon" onClick={this.props.onClick}> </i>
                </label>
            </header>
        );
    }
}

class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shownRows: [],
            rows: [],
            show: 0,
            showCount: 10,
            showValue: 10,
            search: ''
        }

        this.showCountChange = this.showCountChange.bind(this)
        this.showCountSet = this.showCountSet.bind(this)
        this.showMore = this.showMore.bind(this)
        this.requestData = this.requestData.bind(this)
        this.searchChange = this.searchChange.bind(this)
    }

    componentDidMount() {
        this.requestData()
    }

    requestData() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/getTableData")
        xhr.onload = () => {
            let rows = []
            let res = JSON.parse(xhr.response)
            for (let i of res){
                rows.push(<TableRow date={i.Date} idOrder={i.ID} recipient={i.Recipient} requiredDate={i.RequiredDate} state={i.State} zone={i.Zone}/>)
            }
            this.setState({rows: rows})
            this.showCountSet(this.state.showValue-1)
        }
        xhr.send(JSON.stringify({Text: this.state.search}))
    }

    showCountSet(len) {
        let count = 0;
        let shownRows = [];
        for (let i of this.state.rows){
            shownRows.push(i);
            count++;
            if (count > len) break;
        }
        this.setState({showCount: count})
        this.setState({show: count})
        this.setState({shownRows: shownRows})
    }

    showCountChange(event) {
        this.setState({showValue: +event.target.value})
        this.showCountSet(+event.target.value-1)
    }

    showMore() {
        this.showCountSet(this.state.showCount+9)
    }

    searchChange(event) {
        this.setState({search: event.target.value});
    }

    searchApply(){
        this.requestData()
    }

    render(){
        return(
            <div>
                <Header value={this.state.search} onChange={this.searchChange} onClick={this.requestData}/>
                <div className="table">
                    <div className="table_row_h">
                        <div className="column h">ДАТА ЗАКАЗА</div>
                        <div className="column h">НОМЕР ЗАКАЗА</div>
                        <div className="column h recipient">ПОЛУЧАТЕЛЬ</div>
                        <div className="column h">ТРЕБУЕМАЯ ДАТА</div>
                        <div className="column h">СОСТОЯНИЕ</div>
                        <div className="column h zone">ЗОНА</div>
                    </div>
                    {this.state.shownRows}
                </div>
                <Footer show={this.state.show} showLength={this.state.rows.length} onClick={this.showMore} onChange={this.showCountChange}/>
            </div>
        )
    }
}

class Footer extends React.Component{
    render() {
        return (
            <footer>
                <div className="displayed">Отображено: {this.props.show} из {this.props.showLength}</div>
                <div className="btn_show" onClick={this.props.onClick}>Показать еще 10</div>
                <div className="show_count">Показывать по <select onChange={this.props.onChange} className="show_count_select">
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select></div>
            </footer>
        );
    }
}

class TableRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            switchState: false,
            newState: this.props.state
        }

        this.switchState = this.switchState.bind(this)
        this.setNewState = this.setNewState.bind(this)
    }

    switchState(){
        if (this.state.switchState){
            this.setState({switchState: false})
        } else {
            this.setState({switchState: true})
        }
    }

    setNewState(newState){
        console.log(newState)
        this.setState({newState: newState})
    }

    render() {
        if (this.state.switchState){
            return(
                <div className="table_row">
                    <div className="column">{this.props.date}</div>
                    <div className="column">ЗП01-{this.props.idOrder}</div>
                    <div className="column recipient">{this.props.recipient}</div>
                    <div className="column">{this.props.requiredDate}</div>
                    <SwitchWindow state={this.state.newState} id={this.props.idOrder} onChange={this.switchState} setNewState={this.setNewState}/>
                    <div className="column zone">{this.props.zone}</div>
                </div>
            )
        } else {
            return(
                <div className="table_row">
                    <div className="column">{this.props.date}</div>
                    <div className="column">ЗП01-{this.props.idOrder}</div>
                    <div className="column recipient">{this.props.recipient}</div>
                    <div className="column">{this.props.requiredDate}</div>
                    <div className="column state" onClick={this.switchState}><StateColor state={this.state.newState}/>{this.state.newState}</div>
                    <div className="column zone">{this.props.zone}</div>
                </div>
            )
        }
    }
}

class SwitchWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            states: []
        }

        this.setNewState = this.setNewState.bind(this)
    }

    componentDidMount() {
        this.requestData()
    }

    requestData = () =>{
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/getStates")
        xhr.onload = () => {
            let res = JSON.parse(xhr.response)
            let states = []
            for (let i of res){
                if (i === this.props.state){
                    states.push(<option onClick={this.setNewState} selected>{i}</option>)
                } else {
                    states.push(<option onClick={this.setNewState}>{i}</option>)
                }
            }
            this.setState({states: states})
        }
        xhr.send()
    }

    setNewState(event){
        const data = {
            ID: this.props.id,
            State: event.target.value
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/setState")
        xhr.onload = () => {
            if(JSON.parse(xhr.response)){
                this.props.onChange()
                this.props.setNewState(event.target.value)
            }
        }
        xhr.send(JSON.stringify(data))
    }

    render() {
        return (
            <select className="column_select" onChange={this.setNewState}>
                {this.state.states}
            </select>
        );
    }
}

class StateColor extends React.Component{
    render() {
        if (this.props.state === "Выполнено") {
            return (
                <div className="state_color blue"></div>
            );
        } else if (this.props.state === "Выполняется") {
            return (
                <div className="state_color green"></div>
            );
        } else if (this.props.state === "Не выполнено") {
            return (
                <div className="state_color red"></div>
            );
        } else {
            return (
                <div className="state_color black"></div>
            );
        }
    }
}

ReactDOM.render(
    <div>
        <Table />
    </div>,
    document.getElementById("root")
)