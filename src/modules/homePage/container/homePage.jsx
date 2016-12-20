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
