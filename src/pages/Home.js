import React from 'react';
import Autocomplete from 'react-autocomplete';
import './../home.css';
import {connect} from "react-redux";
import {setCities} from "../data/actions/weather";
import {setActive} from "../data/actions/active";

const axios = require('axios');


class Home extends React.Component {

    state = {
        addcity: '',
        addcityData: {},
        data: [],
        bulunamadi: false,
        value: '',
        cities: {},
        updateTime: false
    };

    constructor(props) {
        super(props);
        this.addCity = this.addCity.bind(this);
        this.addBtn = this.addBtn.bind(this);
        this.kaldir = this.kaldir.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTime = this.getTime.bind(this);
        this.onGrupUpdate = this.onGrupUpdate.bind(this);
    }


    // http://api.openweathermap.org/data/2.5/find?q=Corum,Turkey&type=like&appid=d46f6610f4650c552726cd5f193b9d38&units=metric&lang=tr
    componentDidMount() {
        setActive('home');


        var kontrol;

        const kk = () => {
            kontrol = setInterval(() => {
                this.onGrupUpdate(true);

                if(this.state.updateTime) {
                    clearInterval(kontrol);
                    console.log('silinip yeniden basladi');
                    this.setState({updateTime: false});
                    kk();
                }

            },60000);
        }
        kk();

    }

    getTime() {
        var d = new Date();
        var n = d.getHours();
        var b = d.getMinutes();
        this.setState({updateTime: n + ':' + b});
    }

    addCity(e) {
        {
            this.setState({addcity: e.target.value});
            axios.get(`http://api.openweathermap.org/data/2.5/find`, {
                params: {
                    q: e.target.value,
                    type: 'like',
                    appid: 'd46f6610f4650c552726cd5f193b9d38',
                    units: 'metric',
                    lang: 'tr'
                }
            })
                .then(({data}) => {
                    console.log(data);
                    this.setState({data: data.list, bulunamadi: false});
                })
                .catch((error) => {
                    /*
                    this.setState({
                        data: [{
                            id: 0,
                            name: 'Sonuç bulunamadı'
                        }]
                    });
                     */
                    this.setState({bulunamadi: true});
                })
                .then(function () {
                    // always executed

                });
        }
    }


    kaldir(id) {
        const {cities} = this.props;
        let vt = cities;

        //    alert(id);

        if (vt[id]) {
            delete vt[id];
            setCities(Object.assign({}, vt));
            this.setState({cities: Object.assign({}, vt)});
        }


    }

    addBtn(e) {
        e.preventDefault();
        let {addcity, addcityData} = this.state;
        const {cities} = this.props;

        addcity = addcity.trim();

        let vt = cities;

        if ("name" in addcityData) {

            if (vt[addcityData.id]) {
                delete vt[addcityData.id];
            }

            vt[addcityData.id] = addcityData;

            setCities(vt);
            this.setState({addcity: '', addcityData: {}, cities: vt});

            //    console.log(cities);

        } else {
            alert('Şehir geçerli değil veya boş');
        }

    }

    onGrupUpdate(oto = false) {
        const {cities} = this.props;
        console.log('calisti');

        if (Object.keys(this.state.cities).length > 0) {
            let newlist = [];

            this.setState({value: ''});
            this.handleChange({target: {value: ''}});

            Object.keys(cities).map((key) => {
                let id = cities[key].id;

                newlist.push(id);
            });

            let newl = newlist.join();

            console.log('newl',newl);

            axios.get(`http://api.openweathermap.org/data/2.5/group`, {
                params: {
                    appid: 'd46f6610f4650c552726cd5f193b9d38',
                    units: 'metric',
                    lang: 'tr',
                    id: newl
                }
            })
                .then(({data}) => {
                    console.log('donenveri',data);
                    if (data.list) {
                        let newt = {};
                        data.list.map((item) => {
                            newt[item.id] = item;
                        });
                        setCities(newt);
                    }
                })
                .catch((error) => {
                })
                .then(() => {
                    if(oto) {
                        this.setState({updateTime: false});
                    } else {
                        this.setState({updateTime: true});
                    }
                });

        }
    }

    handleChange(event) {
        let text = event.target.value;
        const {cities} = this.state;
        // veri
        this.setState({value: text});
        console.log('textlengt', text.length);
        let citiesList = cities;

        if (text.length <= 0) {
            console.log('0li');
            setCities(Object.assign({}, this.state.cities));
        } else {

            if (Object.keys(cities).length > 0) {
                var newlist = {};
                Object.keys(citiesList).map((key) => {
                    let item = citiesList[key];
                    let nm = item.name.toLowerCase();
                    if (nm.indexOf(text.toLowerCase()) > -1) {
                        newlist[item.id] = item;
                    }

                });
                setCities(Object.assign({}, newlist));
            }

        }


    }


    render() {
        const {addcity, data, bulunamadi} = this.state;
        const {cities} = this.props;


        console.log('say', Object.keys(this.props.cities).length);

        return (
            <div className="Home">
                <div className="container" style={{paddingTop: 100}}>
                    <div>
                        <label htmlFor="te">Yeni şehir ekle:</label>
                        <div className="form-group mb-3">
                            <div className="row">
                                <div className="col-8 col-md-11">
                                    <Autocomplete
                                        wrapperStyle={{display: 'block'}}
                                        renderInput={(props) => {
                                            return <input className={"form-control"} {...props}
                                                          style={{width: '100%'}}/>
                                        }}
                                        getItemValue={(item) => item.name}
                                        items={data}
                                        renderItem={(item, isHighlighted) =>
                                            <div key={item.id}
                                                 style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                                                {item.name},{item.sys.country}
                                            </div>
                                        }
                                        value={addcity}
                                        onChange={(e) => this.addCity(e)}
                                        onSelect={(val, item) => {
                                            this.setState({addcity: val, addcityData: item});

                                        }}
                                    />
                                    {bulunamadi &&
                                    <small style={{color: 'green', fontWeight: 'bold'}}>Bir şehir bulunamadı.(Şehir
                                        adını doğru yazdığınıza emin olun.)</small>
                                    }
                                </div>
                                <div className="col-md-1 col-4">
                                    <button onClick={this.addBtn} className="btn btn-success">Ekle</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: 75}}>
                        <div className="row">
                            <div className="col-5 col-md-5">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    this.onGrupUpdate();
                                }} type="button" className="btn btn-primary">Yenile</button>
                            </div>
                            <div className="col-7 col-md-7">
                                <div style={{float: 'right'}}>
                                    <input value={this.state.value} onChange={this.handleChange} type="text"
                                           className="form-control"
                                           placeholder="Arama yap"/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div>
                                {Object.keys(cities).length > 0 ? <div className="row">
                                    {Object.keys(cities).map((i) => {
                                        let item = cities[i];
                                        return (
                                            <div key={i} className="col-md-4 col-12 p-3 pt">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <b>{item.name},{item.sys.country}</b>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <img
                                                            src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}/>
                                                    </div>
                                                </div>
                                                <div>{item.weather[0].description}</div>
                                                <div className={"text-center"}>
                                                    <h1 className={"havadrm"}>
                                                     {item.main.temp} °C
                                                    </h1>
                                                </div>
                                                <div className="text-right m-1">
                                                    <button className={"kaldir"} onClick={(e) => {
                                                        e.preventDefault();
                                                        this.kaldir(item.id);
                                                    }}>Kaldır
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div> : <div>Hiç şehir eklenmemiş.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    cities: state.weather.cities,
});

Home = connect(mapStateToProps)(Home);

export default Home;
