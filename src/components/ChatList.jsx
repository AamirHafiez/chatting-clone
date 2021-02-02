import React, { Component } from 'react';

class ChatList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             notificationCount: 20
        }
    }
    
    onCLickChat = () => {
        this.setState({
            notificationCount: 0
        });
        this.props.toggleChatBox(this.props.friend.email);
    }

    render() {

        const {
            notificationCount
        } = this.state;

        const {
            friend
        } = this.props;

        let showNotifications = notificationCount === 0 ? false : true; 

        return (
            <div onClick={this.onCLickChat} className="chat-list col-12 bg-very-light-gray pt-2 pb-2 rounded pointer mb-2 d-flex justify-content-center align-items-center">
                <div className="col-2">
                    <img className="rounded-circle shadow" height={50} width={50} src={'https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-edit-profile-icon-png-image_4101421.jpg'} alt="profile"/>
                </div>
                <div className="col-8 ml-2 overflow-hidden font-medium overflowed-text">
                    {friend.email}
                </div>
                <div className="col-2">
                    {
                        showNotifications &&
                        <div style={{height: 30, width: 30, overflow: 'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}} className="bg-success rounded-circle d-flex justify-content-center align-items-center">
                            <p className="p-0 m-0 text-light font-weight-bold">{notificationCount}</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ChatList
