import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import { Button, ButtonToolbar } from 'react-bootstrap';

import classNames from 'classnames'
import '../../../scss/home.scss'

class HomePage extends Component {
    static propTypes = {
        // enableTableSelection: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { }
    }

    redirectTo = (urlKey) => {
        switch (urlKey) {
            case 'aplayer':
                this.props.push('/aplayer')
                break
            case 'dplayer':
                this.props.push('/dplayer')
                break
        }
    }

    componentDidMount = () => {
        //document.addEventListener('visibilitychange', this.handleVisibilityChange())
    }

    handleVisibilityChange = () => {
        console.log('tragger~~~~~~~')
        const OriginTitile = document.title;
        let titleTime;

        if (document.hidden) {
            document.title = '(つェ⊂)我藏好了哦~ ' + OriginTitile;
            clearTimeout(titleTime);
        } else {
            document.title = '(*´∇｀*) 被你发现啦~ ' + OriginTitile;
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            }, 2000);
        }
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                    <Button onClick = { () => { this.redirectTo('aplayer') } }>Aplayer</Button>
                    <Button onClick = { () => { this.redirectTo('dplayer') } }>Dplayer</Button>
                </ButtonToolbar>
                { this.props.children }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: bindActionCreators(push, dispatch),
    }
}

const connectHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage)
module.exports = connectHomePage
