import React, { Component } from 'react';
import ChatsContainer from './ChatsContainer';

class ChatBoxContainer extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             animation: 'down-to-up'
        }
    }
    

    onClickBackToChats = () => {
        this.setState({
            animation: 'up-to-down'
        });
        setTimeout(() => {
            this.props.toggleChatBox();
        } ,1000);
    }

    render() {

        const {
            animation
        } = this.state;

        return (
            <div>
                <div className={`chatbox-conatiner hv100-wv100 bg-light fixed-top overflow-hidden shadow-at-top rounded-top-20 ${animation}`}>
                    <div className="chatbox-header bg-very-light-gray shadow pt-3 pb-3">
                        <div onClick={this.onClickBackToChats} className="col-11 d-flex align-items-center justify-content-between font-medium mx-auto pointer text-primary">
                            <p className="p-0 m-0">Back to chats</p>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="mt-1 mx-auto pt-2 pb-2 d-flex align-items-center">
                            <div className="d-flex col-11 mx-auto">
                                <div className="">
                                    <img className="rounded-circle shadow" height={50} width={50} src={'https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-edit-profile-icon-png-image_4101421.jpg'} alt=""/>
                                </div>
                                <div className="ml-2">
                                    <p className="p-0 m-0 font-medium">Friend name</p>
                                    <p className="p-0 m-0 text-muted font-small">online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ChatsContainer/>
                    <div className="font-medium d-flex align-items-center justify-content-center chat-input-container bg-primary shadow-at-top">
                        <input className="form-control chat-input col-10 bg-transparent border-0 text-light" placeholder="Type to send..." type="text" name="" id=""/>
                        <button className="chat-send col-2 btn btn-primary p-2">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatBoxContainer
