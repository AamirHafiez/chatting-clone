import React, { Component, createRef } from 'react'
import ChatSent from './ChatSent';
import ChatReceived from './ChatReceived';
import fire from '../config/firebaseConfig';

const messagesEndRef =  createRef();

class ChatsContainer extends Component {

    componentDidMount () {
        this.scrollToBottom()
    }
    componentDidUpdate () {
        this.scrollToBottom()
    }
    scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const {
            specificChats
        } = this.props;

        return (
            <div className="chats-container p-2">
                <div>
                    {
                        specificChats.map(chat => {
                            if(chat.from === fire.auth().currentUser.email){
                                return <ChatSent message={chat.message}/>
                            }else{
                                return <ChatReceived message={chat.message}/>
                            }
                        })
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>
        )
    }
}

export default ChatsContainer
