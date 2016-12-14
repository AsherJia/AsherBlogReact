import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

class IndexPage extends Component {
    static propTypes = {
        // enableTableSelection: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { }
    }

    renderTest = () => {

    }

    render() {
        return (
            <div>
                <h1>Home Page...</h1>
                { this.props.children }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
