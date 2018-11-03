import React from 'react';
import {setActive} from "../data/actions/active";

export default class Home extends React.Component
{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        setActive('about');
    }


    render() {
        return(
            <div className={"container mt-5 text-center"}>
                <h1>Hava Durumu Uygulaması</h1>
                <h2>v1.0.0</h2>
            </div>
        )
    }
}
