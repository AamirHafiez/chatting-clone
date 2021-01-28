import React, { Component, createRef } from 'react'
import ChatSent from './ChatSent';
import ChatReceived from './ChatReceived';

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
        return (
            <div className="chats-container p-2">
                <div>
                    <ChatSent message={'This is a dummy message sent'}/>
                    <ChatReceived message={'This is a dummy message received'}/>
                    <ChatSent message={'This is a long, really, very long dummy message that has been sent to someone'}/>
                    <ChatReceived message={'This is a long, really, very long dummy message that has been received to someone'}/>
                    <ChatSent message={'This is a dummy message sent'}/>
                    <ChatSent message={'This is a long, really, very long dummy message that has been sent to someone'}/>
                    <ChatSent message={'This is a dummy message sent'}/>
                    <ChatReceived message={'This is a long, really, very long dummy message that has been received to someone'}/>
                    <ChatReceived message={'This is a long, really, very long dummy message that has been received to someone'}/>
                    <ChatReceived message={'This is a dummy message received'}/>


                    <div ref={messagesEndRef} />
                </div>
            </div>
        )
    }
}

export default ChatsContainer
