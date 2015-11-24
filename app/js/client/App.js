/**
 * Created by jiangnan on 15/11/15.
 */
import React from 'react'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {flag: this.props.flag};
    }

    componentDidMount(){ //just when the component didmount already later do one time.
        console.log('========')
        this.setState({
            flag: 22222,
        })
        window.addEventListener('scroll', this.testScroll)
    }

    changeFlag() {
        console.log('click')
        this.setState({
            flag: 1111,
        })
    }

    testScroll() {
        console.log('scroll scroll')
    }

    render() {
        const { flag } = this.state
        return (
            <div>
                <h1>Hello World</h1>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
                <div onClick={() => this.changeFlag()}>${flag}</div>
            </div>

        );
    }
}