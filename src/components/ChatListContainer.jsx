import React, { Component } from 'react';
import ChatList from './ChatList';
import ChatBoxContainer from './ChatBoxContainer';

import { Redirect, withRouter } from 'react-router-dom';
import fire from '../config/firebaseConfig';

class ChatListContainer extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showChatBox: false
        }
    }
    

    handleLogout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    }

    toggleChatBox = () => {
        this.setState(prevState => {
            return {
                showChatBox: !prevState.showChatBox
            }
        });
    }

    render() {

        const {
            showChatBox
        } = this.state;

        console.log('user in chatlist: ', this.props.user);

        if(this.props.user === ''){
            return <Redirect to="/" />
        }

        return (
            <div>
                <div className="shadow come-down-bounce bg-primary pt-5 pb-5 mb-4 title-container text-light text-align-center d-flex flex-column justify-content-center align-items-center">
                    <p className="font-xlarge p-0 font-weight-bold">Chatting Box</p>
                    <div onClick={this.handleLogout} title="logout" className="rounded-circle shadow d-flex justify-content-center align-items-center pointer" style={{height: 50, width: 50}}>
                        <i className="fas fa-sign-out-alt font-large"></i>
                    </div>
                </div>
                <div className="col-11 mx-auto p-0 d-flex flex-column align-items-center">
                    <ChatList toggleChatBox={this.toggleChatBox}/>
                    <ChatList toggleChatBox={this.toggleChatBox}/>
                    <ChatList toggleChatBox={this.toggleChatBox}/>
                    <ChatList toggleChatBox={this.toggleChatBox}/>
                    <ChatList toggleChatBox={this.toggleChatBox}/>
                    <ChatList toggleChatBox={this.toggleChatBox}/>
                </div>
                {showChatBox && <ChatBoxContainer toggleChatBox={this.toggleChatBox}/>}
            </div>
        )
    }
}

export default withRouter(ChatListContainer);
