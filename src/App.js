import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Provider} from 'react-redux'

import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import {store} from './store';


class App extends Component {
    render() {
        console.log(store);

        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about/" component={About}/>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
