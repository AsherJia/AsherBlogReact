import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

class PostPage extends Component {
    static propTypes = {
        // enableTableSelection: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        return (
            <div>
                <h1>Postsasd0000 Page...</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
