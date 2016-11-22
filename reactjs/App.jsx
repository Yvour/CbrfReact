import React from 'react';
        import ReactDOM from 'react-dom';
        class App extends React.Component {
        constructor() {
        super();
                this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
        };
                findDomNodeHandler() {
        var date = document.getElementById('date');
                var colors = ['green', 'red', 'blue', 'black', 'forestgreen'];
                var date = ReactDOM.findDOMNode(date).value;
                try {
                var date_elem = date.split('/');
                        var param = {date:{dd:date_elem[0], mm:date_elem[1], yyyy:date_elem[2]}}

                var xhr = new XMLHttpRequest();
                        xhr.open("POST", '/get_courses', true)
                        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                        xhr.onreadystatechange = function(){
                        if (this.readyState != 4)return;
                                var courses = document.createElement('courses');
                                courses.innerHTML = this.responseText;
                                var currencies = Array.prototype.map.call(courses.querySelectorAll('Valute'), function(x){
                                var d = {};
                                 var i;
                                        if (x.children){

                                for (i = 0; i < x.children.length; i++){

                                if (x[i] == undefined){

                                };
                                        d[x.children[i].tagName] = x.children[i].innerHTML;
                                };
                                        return d}}).filter(
                                function(x){
                                var currency_list = document.getElementById("currency_list").value + '';
                                        if ((currency_list.toLowerCase().indexOf(x.CHARCODE.toLowerCase())) == - 1)
                                        return false;
                                        return true;
                                }



                        ) ;
                                window.currencies = currencies;
                             var courses = document.getElementById('courses');
                                  ReactDOM.findDOMNode(courses).innerHTML = '';
                             var info = '';
                             for (var i = 0; i< currencies.length; i++){
                                 info += '<tr><td>' + currencies[i].CHARCODE + '</td><td>' +  currencies[i].VALUE + '</tr>'

                               }
                                  ReactDOM.findDOMNode(courses).innerHTML = info;

                        }
                console.log('the param is ' + param);
                        xhr.send(JSON.stringify(param));
                }
        catch (e){
        console.log(e);
        };
        }

        render() {
        return (
                < div >
                Currencies to show
                < input type = "text" placeholder = "USD, EUR"   id = "currency_list" />
                < button onClick = {this.findDomNodeHandler} > get rates by date < /button>
                < div id = "myDiv" > Date
                < input type = "text" id = "date" placeholder = "dd/mm/yyyy" / >
                < /div>
                < table>
                < tbody id = "courses">
                < /tbody>
                < /table>
                < /div>

                );
        }
        }

export default App;