import React, { Component } from 'react';
import ChatList from './ChatList';
import ChatBoxContainer from './ChatBoxContainer';

import { pusher } from '../config/pusherConfig';

import { Redirect, withRouter } from 'react-router-dom';
import fire from '../config/firebaseConfig';
import { NotificationManager } from 'react-notifications';

class ChatListContainer extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showChatBox: false,
             addFriendInput: '',
             friends: [],
             friendChatBoxEmail: '',
             chats: []
        }
    }
    
    componentDidMount() {
        const privateChannel = pusher.subscribe('private-chat');
        privateChannel.bind('message', data => {
            this.setState({
                chats: [...this.state.chats, data]
            });
        });
    }

    componentWillUnmount() {
        pusher.unsubscribe('private-chat');
    }

    handleLogout = () => {
        fire.auth().signOut();
        this.props.history.push('/');
    }

    toggleChatBox = (friendEmail) => {
        this.setState(prevState => {
            if(prevState.showChatBox) {
                return {
                    showChatBox: !prevState.showChatBox,
                }
            }
            return {
                showChatBox: !prevState.showChatBox,
                friendChatBoxEmail: friendEmail
            }
        });
    }

    handleAddFriendInputChange = (event) => {
        this.setState({
            addFriendInput: event.target.value
        });
    }

    handleAddFriend = (event) => {
        event.preventDefault();
        const { addFriendInput, friends } = this.state;
        if(addFriendInput === '') {
            NotificationManager.error('', 'Enter email of the friend');
            return;
        }
        if(addFriendInput === fire.auth().currentUser.email){
            NotificationManager.warning('', 'You cannot add yourself');
            return;
        }
        if(friends.find(friend => friend.email === addFriendInput)) {
            NotificationManager.warning('', 'Friend is already added');
            return;
        }
        friends.push({
            id: this.props.count,
            email: addFriendInput,
        });
        this.props.increaseCount();
        this.setState({
            friends, addFriendInput: ''
        });
    }

    render() {

        const {
            showChatBox,
            addFriendInput,
            friends,
            friendChatBoxEmail,
            chats
        } = this.state;

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
                <div>
                    <p style={{textAlign: 'center'}}>Hi {fire.auth().currentUser.email} <i className="fas fa-handshake text-warning"></i></p>
                </div>
                <form action="" onSubmit={this.handleAddFriend}>
                    <div className="col-11 mx-auto d-flex align-items-center justify-content-center mb-3">
                        <div>
                            <input value={addFriendInput} onChange={this.handleAddFriendInputChange} placeholder="Add firend via email." maxLength={40} required className="form-control" type="email" name="" id=""/>
                        </div>
                        <div className="ml-2">
                            <button className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
                <div className="col-11 mx-auto p-0 d-flex flex-column align-items-center">
                    {
                        friends.map((friend) => {
                            return <ChatList friend={friend} toggleChatBox={this.toggleChatBox} key={friend.id}/>
                        })
                    }
                </div>
                {showChatBox && <ChatBoxContainer chats={chats} toggleChatBox={this.toggleChatBox} friendChatBoxEmail={friendChatBoxEmail}/>}
            </div>
        )
    }
}

export default withRouter(ChatListContainer);
