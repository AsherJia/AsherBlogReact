import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DPlayer from 'DPlayer'

import classNames from 'classnames';
import './videoPage.scss'

// https://github.com/DIYgod/DPlayer
class DPlayerContainer extends Component {
    static propTypes = {
        // enableTableSelection: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { }
    }

    componentDidMount = () => {
        this.renderDplayerPanel()
    }

    renderDplayerPanel = () => {
        this.dp1 = new DPlayer({
            element: document.getElementById('dplayer1'),
            autoplay: false,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            hotkey: true,
            video: {
                url: 'http://devtest.qiniudn.com/若能绽放光芒.mp4',
                pic: 'http://devtest.qiniudn.com/若能绽放光芒.png'
            },
            danmaku: {
                id: '9E2E3368B56CDBB4',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                maximum: 3000
            }
        })

        const dp2 = new DPlayer({
            element: document.getElementById('dplayer2'),
            autoplay: false,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            hotkey: true,
            video: {
                url: 'http://devtest.qiniudn.com/【微小微】玖月奇迹－踩踩踩.flv',
                pic: 'http://devtest.qiniudn.com/【微小微】玖月奇迹－踩踩踩.jpg'
            },
            danmaku: {
                id: '9E2E3368B56CDBB43',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                maximum: 3000
            }
        })
    }

    switchDPlayer = () => {
        if (this.dp1.option.danmaku.id !== '5rGf5Y2X55qu6Z2p') {
            this.dp1.switchVideo({
                        url: 'http://devtest.qiniudn.com/微小微-江南皮革厂倒闭了.mp4',
                        pic: 'http://devtest.qiniudn.com/微小微-江南皮革厂倒闭了.jpg'
                    },
                    {
                        id: '5rGf5Y2X55qu6Z2p',
                        api: 'https://api.prprpr.me/dplayer/',
                        token: 'tokendemo',
                        maximum: 3000
                    });
        }
        else {
            this.dp1.switchVideo({
                url: 'http://devtest.qiniudn.com/若能绽放光芒.mp4',
                pic: 'http://devtest.qiniudn.com/若能绽放光芒.png'
            },
            {
                id: '9E2E3368B56CDBB4',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                maximum: 3000
            });
        }
    }
    render() {
        return (
            <div>
                <h1>DPlayer</h1>
                <h2>Wow, such a lovely HTML5 danmaku video player</h2>
                <div className='videoPanel'>
                    <div id='dplayer1' className='dplayer'></div>
                    <button onClick = { () => { this.switchDPlayer() } }>Switch Video</button>
                    <div id='dplayer2' className='dplayer'></div>
                    { this.props.children }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DPlayerContainer)
