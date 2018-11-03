import React from 'react';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class Footer extends React.Component {
    render() {

        const {active} = this.props;

        return (
            <div>
                <hr/>
                <nav className={"text-center"}>
                    <ul className={"list-inline"}>
                        <li className={active === 'home' ? 'list-inline-item liactive' : 'list-inline-item'}>
                            <Link to="/">Ana Sayfa</Link>
                        </li>
                        <li className={active === 'about' ? 'list-inline-item liactive' : 'list-inline-item'}>
                            <Link to="/about/">Hakkında</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    active: state.active.link,
});

Footer = connect(mapStateToProps)(Footer);

export default Footer;
