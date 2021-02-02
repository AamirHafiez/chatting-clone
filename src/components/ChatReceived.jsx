import React from 'react'

const ChatRecieved = ({message}) => {
    return (
        <div className="mb-2">
            <div className="col-7 col-md-6 col-lg-4 p-2 rounded-top-20 rounded-bottom-right-20 bg-info">
                <p className="p-0 m-0 text-light">{message}</p>
            </div>
        </div>
    )
}

export default ChatRecieved