var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddWindow = function (_React$Component) {
    _inherits(AddWindow, _React$Component);

    function AddWindow(props) {
        _classCallCheck(this, AddWindow);

        var _this = _possibleConstructorReturn(this, (AddWindow.__proto__ || Object.getPrototypeOf(AddWindow)).call(this, props));

        _this.requestData = function () {
            var arr = [];
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/getInputData");
            xhr.onload = function () {
                var res = JSON.parse(xhr.response);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        arr.push(React.createElement(
                            'option',
                            null,
                            i
                        ));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this.setState({ options: arr });
            };
            xhr.send();
        };

        _this.state = {
            Recipient: '',
            RequiredDate: '',
            Zone: 'Площадка 1',
            options: [],
            window: false
        };

        _this.recipientChange = _this.recipientChange.bind(_this);
        _this.addOrder = _this.addOrder.bind(_this);
        _this.requiredDateChange = _this.requiredDateChange.bind(_this);
        _this.zoneChange = _this.zoneChange.bind(_this);
        _this.windowSwitch = _this.windowSwitch.bind(_this);
        return _this;
    }

    _createClass(AddWindow, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.requestData();
        }
    }, {
        key: 'recipientChange',
        value: function recipientChange(event) {
            this.setState({ Recipient: event.target.value });
        }
    }, {
        key: 'requiredDateChange',
        value: function requiredDateChange(event) {
            this.setState({ RequiredDate: event.target.value });
        }
    }, {
        key: 'zoneChange',
        value: function zoneChange(event) {
            this.setState({ Zone: event.target.value });
        }
    }, {
        key: 'windowSwitch',
        value: function windowSwitch(event) {
            if (event.target.className === "btn_add" || event.target.className === "window") {
                if (!this.state.window) {
                    this.setState({ window: true });
                } else {
                    this.setState({ window: false });
                }
            }
        }
    }, {
        key: 'addOrder',
        value: function addOrder() {
            if (this.state.Recipient !== '' && this.state.RequiredDate !== '' && this.state.Zone !== '') {
                var data = {
                    Recipient: this.state.Recipient,
                    RequiredDate: this.state.RequiredDate,
                    Zone: this.state.Zone
                };
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", "/api/addOrder");
                xhr.onload = function () {
                    alert("OK");
                };
                xhr.send(JSON.stringify(data));
                this.setState({
                    Recipient: '',
                    RequiredDate: '',
                    window: false
                });
            } else {
                this.refs.recipient.style.border = "1px solid red";
                this.refs.recipient.style.borderBottom = "unset";
                this.refs.date.style.border = "1px solid red";
                this.refs.date.style.borderBottom = "unset";
                this.refs.zone.style.border = "1px solid red";
                this.refs.zone.style.borderBottom = "unset";
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.window) {
                return React.createElement(
                    'div',
                    { className: 'window', onMouseDown: this.windowSwitch },
                    React.createElement(
                        'div',
                        { className: 'window_inputBlock' },
                        React.createElement('input', { className: 'window_input', ref: 'recipient', type: 'text', value: this.state.Recipient, onChange: this.recipientChange, placeholder: '\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C' }),
                        React.createElement('input', { className: 'window_input', ref: 'date', type: 'date', value: this.state.RequiredDate, onChange: this.requiredDateChange, placeholder: '\u0422\u0440\u0435\u0431\u0443\u0435\u043C\u0430\u044F \u0434\u0430\u0442\u0430' }),
                        React.createElement(
                            'select',
                            { className: 'window_input', ref: 'zone', value: this.state.Zone, onChange: this.zoneChange, placeholder: '\u0417\u043E\u043D\u0430' },
                            this.state.options
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.addOrder, className: 'window_btn_add' },
                            '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                        )
                    )
                );
            } else {
                return React.createElement(
                    'button',
                    { onClick: this.windowSwitch, className: 'btn_add' },
                    '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                );
            }
        }
    }]);

    return AddWindow;
}(React.Component);

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'header',
                null,
                React.createElement(
                    'h1',
                    null,
                    '\u0417\u0430\u043A\u0430\u0437\u044B \u043D\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E'
                ),
                React.createElement(AddWindow, null),
                React.createElement(
                    'label',
                    { className: 'search' },
                    React.createElement('input', { type: 'text', placeholder: '\u041F\u043E\u0438\u0441\u043A', className: 'search_input', value: this.props.value, onChange: this.props.onChange }),
                    React.createElement(
                        'i',
                        { className: 'fa-solid fa-magnifying-glass search search_icon', onClick: this.props.onClick },
                        ' '
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var Table = function (_React$Component3) {
    _inherits(Table, _React$Component3);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this3 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this3.state = {
            shownRows: [],
            rows: [],
            show: 0,
            showCount: 10,
            showValue: 10,
            search: ''
        };

        _this3.showCountChange = _this3.showCountChange.bind(_this3);
        _this3.showCountSet = _this3.showCountSet.bind(_this3);
        _this3.showMore = _this3.showMore.bind(_this3);
        _this3.requestData = _this3.requestData.bind(_this3);
        _this3.searchChange = _this3.searchChange.bind(_this3);
        return _this3;
    }

    _createClass(Table, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.requestData();
        }
    }, {
        key: 'requestData',
        value: function requestData() {
            var _this4 = this;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/getTableData");
            xhr.onload = function () {
                var rows = [];
                var res = JSON.parse(xhr.response);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var i = _step2.value;

                        rows.push(React.createElement(TableRow, { date: i.Date, idOrder: i.ID, recipient: i.Recipient, requiredDate: i.RequiredDate, state: i.State, zone: i.Zone }));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this4.setState({ rows: rows });
                _this4.showCountSet(_this4.state.showValue - 1);
            };
            xhr.send(JSON.stringify({ Text: this.state.search }));
        }
    }, {
        key: 'showCountSet',
        value: function showCountSet(len) {
            var count = 0;
            var shownRows = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.state.rows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var i = _step3.value;

                    shownRows.push(i);
                    count++;
                    if (count > len) break;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.setState({ showCount: count });
            this.setState({ show: count });
            this.setState({ shownRows: shownRows });
        }
    }, {
        key: 'showCountChange',
        value: function showCountChange(event) {
            this.setState({ showValue: +event.target.value });
            this.showCountSet(+event.target.value - 1);
        }
    }, {
        key: 'showMore',
        value: function showMore() {
            this.showCountSet(this.state.showCount + 9);
        }
    }, {
        key: 'searchChange',
        value: function searchChange(event) {
            this.setState({ search: event.target.value });
        }
    }, {
        key: 'searchApply',
        value: function searchApply() {
            this.requestData();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { value: this.state.search, onChange: this.searchChange, onClick: this.requestData }),
                React.createElement(
                    'div',
                    { className: 'table' },
                    React.createElement(
                        'div',
                        { className: 'table_row_h' },
                        React.createElement(
                            'div',
                            { className: 'column h' },
                            '\u0414\u0410\u0422\u0410 \u0417\u0410\u041A\u0410\u0417\u0410'
                        ),
                        React.createElement(
                            'div',
                            { className: 'column h' },
                            '\u041D\u041E\u041C\u0415\u0420 \u0417\u0410\u041A\u0410\u0417\u0410'
                        ),
                        React.createElement(
                            'div',
                            { className: 'column h recipient' },
                            '\u041F\u041E\u041B\u0423\u0427\u0410\u0422\u0415\u041B\u042C'
                        ),
                        React.createElement(
                            'div',
                            { className: 'column h' },
                            '\u0422\u0420\u0415\u0411\u0423\u0415\u041C\u0410\u042F \u0414\u0410\u0422\u0410'
                        ),
                        React.createElement(
                            'div',
                            { className: 'column h' },
                            '\u0421\u041E\u0421\u0422\u041E\u042F\u041D\u0418\u0415'
                        ),
                        React.createElement(
                            'div',
                            { className: 'column h zone' },
                            '\u0417\u041E\u041D\u0410'
                        )
                    ),
                    this.state.shownRows
                ),
                React.createElement(Footer, { show: this.state.show, showLength: this.state.rows.length, onClick: this.showMore, onChange: this.showCountChange })
            );
        }
    }]);

    return Table;
}(React.Component);

var Footer = function (_React$Component4) {
    _inherits(Footer, _React$Component4);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'footer',
                null,
                React.createElement(
                    'div',
                    { className: 'displayed' },
                    '\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043E: ',
                    this.props.show,
                    ' \u0438\u0437 ',
                    this.props.showLength
                ),
                React.createElement(
                    'div',
                    { className: 'btn_show', onClick: this.props.onClick },
                    '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0435 10'
                ),
                React.createElement(
                    'div',
                    { className: 'show_count' },
                    '\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u043E ',
                    React.createElement(
                        'select',
                        { onChange: this.props.onChange, className: 'show_count_select' },
                        React.createElement(
                            'option',
                            { value: '10', selected: true },
                            '10'
                        ),
                        React.createElement(
                            'option',
                            { value: '20' },
                            '20'
                        ),
                        React.createElement(
                            'option',
                            { value: '30' },
                            '30'
                        )
                    )
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

var TableRow = function (_React$Component5) {
    _inherits(TableRow, _React$Component5);

    function TableRow(props) {
        _classCallCheck(this, TableRow);

        var _this6 = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props));

        _this6.state = {
            switchState: false,
            newState: _this6.props.state
        };

        _this6.switchState = _this6.switchState.bind(_this6);
        _this6.setNewState = _this6.setNewState.bind(_this6);
        return _this6;
    }

    _createClass(TableRow, [{
        key: 'switchState',
        value: function switchState() {
            if (this.state.switchState) {
                this.setState({ switchState: false });
            } else {
                this.setState({ switchState: true });
            }
        }
    }, {
        key: 'setNewState',
        value: function setNewState(newState) {
            console.log(newState);
            this.setState({ newState: newState });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.switchState) {
                return React.createElement(
                    'div',
                    { className: 'table_row' },
                    React.createElement(
                        'div',
                        { className: 'column' },
                        this.props.date
                    ),
                    React.createElement(
                        'div',
                        { className: 'column' },
                        '\u0417\u041F01-',
                        this.props.idOrder
                    ),
                    React.createElement(
                        'div',
                        { className: 'column recipient' },
                        this.props.recipient
                    ),
                    React.createElement(
                        'div',
                        { className: 'column' },
                        this.props.requiredDate
                    ),
                    React.createElement(SwitchWindow, { state: this.state.newState, id: this.props.idOrder, onChange: this.switchState, setNewState: this.setNewState }),
                    React.createElement(
                        'div',
                        { className: 'column zone' },
                        this.props.zone
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    { className: 'table_row' },
                    React.createElement(
                        'div',
                        { className: 'column' },
                        this.props.date
                    ),
                    React.createElement(
                        'div',
                        { className: 'column' },
                        '\u0417\u041F01-',
                        this.props.idOrder
                    ),
                    React.createElement(
                        'div',
                        { className: 'column recipient' },
                        this.props.recipient
                    ),
                    React.createElement(
                        'div',
                        { className: 'column' },
                        this.props.requiredDate
                    ),
                    React.createElement(
                        'div',
                        { className: 'column state', onClick: this.switchState },
                        React.createElement(StateColor, { state: this.state.newState }),
                        this.state.newState
                    ),
                    React.createElement(
                        'div',
                        { className: 'column zone' },
                        this.props.zone
                    )
                );
            }
        }
    }]);

    return TableRow;
}(React.Component);

var SwitchWindow = function (_React$Component6) {
    _inherits(SwitchWindow, _React$Component6);

    function SwitchWindow(props) {
        _classCallCheck(this, SwitchWindow);

        var _this7 = _possibleConstructorReturn(this, (SwitchWindow.__proto__ || Object.getPrototypeOf(SwitchWindow)).call(this, props));

        _this7.requestData = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/getStates");
            xhr.onload = function () {
                var res = JSON.parse(xhr.response);
                var states = [];
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = res[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var i = _step4.value;

                        if (i === _this7.props.state) {
                            states.push(React.createElement(
                                'option',
                                { onClick: _this7.setNewState, selected: true },
                                i
                            ));
                        } else {
                            states.push(React.createElement(
                                'option',
                                { onClick: _this7.setNewState },
                                i
                            ));
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                _this7.setState({ states: states });
            };
            xhr.send();
        };

        _this7.state = {
            states: []
        };

        _this7.setNewState = _this7.setNewState.bind(_this7);
        return _this7;
    }

    _createClass(SwitchWindow, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.requestData();
        }
    }, {
        key: 'setNewState',
        value: function setNewState(event) {
            var _this8 = this;

            var data = {
                ID: this.props.id,
                State: event.target.value
            };
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/setState");
            xhr.onload = function () {
                if (JSON.parse(xhr.response)) {
                    _this8.props.onChange();
                    _this8.props.setNewState(event.target.value);
                }
            };
            xhr.send(JSON.stringify(data));
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'select',
                { className: 'column_select', onChange: this.setNewState },
                this.state.states
            );
        }
    }]);

    return SwitchWindow;
}(React.Component);

var StateColor = function (_React$Component7) {
    _inherits(StateColor, _React$Component7);

    function StateColor() {
        _classCallCheck(this, StateColor);

        return _possibleConstructorReturn(this, (StateColor.__proto__ || Object.getPrototypeOf(StateColor)).apply(this, arguments));
    }

    _createClass(StateColor, [{
        key: 'render',
        value: function render() {
            if (this.props.state === "Выполнено") {
                return React.createElement('div', { className: 'state_color blue' });
            } else if (this.props.state === "Выполняется") {
                return React.createElement('div', { className: 'state_color green' });
            } else if (this.props.state === "Не выполнено") {
                return React.createElement('div', { className: 'state_color red' });
            } else {
                return React.createElement('div', { className: 'state_color black' });
            }
        }
    }]);

    return StateColor;
}(React.Component);

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(Table, null)
), document.getElementById("root"));