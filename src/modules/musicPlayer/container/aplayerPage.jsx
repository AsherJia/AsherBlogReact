import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import APlayer from 'APlayer'

import classNames from 'classnames';
import './aplayerPage.scss';

// http://aplayer.js.org/docs/
// https://github.com/DIYgod/APlayer
class APlayerContainer extends Component {
    static propTypes = {
        // enableTableSelection: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { }
    }

    componentDidMount = () => {
        this.renderAplayerPanel()
    }

    renderAplayerPanel = () => {
        const ap1 = new APlayer({
            element: document.getElementById('player1'),
            narrow: false,
            autoplay: true,
            showlrc: false,
            mutex: true,
            theme: '#e6d0b2',
            preload: 'metadata',
            mode: 'circulation',
            music: {
                title: 'Preparation',
                author: 'Hans Zimmer/Richard Harvey',
                url: 'http://devtest.qiniudn.com/Preparation.mp3',
                pic: 'http://devtest.qiniudn.com/Preparation.jpg'
            }
        })

        ap1.on('play', function () {
            console.log('play')
        })
        ap1.on('play', function () {
            console.log('play play')
        })
        ap1.on('pause', function () {
            console.log('pause')
        })
        ap1.on('canplay', function () {
            console.log('canplay')
        })
        ap1.on('playing', function () {
            console.log('playing')
        })
        ap1.on('ended', function () {
            console.log('ended')
        })
        ap1.on('error', function () {
            console.log('error')
        })

        const ap2 = new APlayer({
            element: document.getElementById('player3'),
            narrow: false,
            autoplay: false,
            showlrc: false,
            mutex: true,
            theme: '#615754',
            mode: 'circulation',
            music: {
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
            }
        });
    }
    render() {
        return (
            <div>
                <h1>APlayer</h1>
                <h2>Wow, such a beautiful html5 music player</h2>
                <div className='playerWidth'>
                    <div id='player1' className='aplayer'></div>
                    <div id='player3' className='aplayer'></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(APlayerContainer)
