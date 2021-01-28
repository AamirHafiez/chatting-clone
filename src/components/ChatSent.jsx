import React from 'react'

const ChatSent = ({message}) => {
    return (
        <div className="d-flex justify-content-end mb-2">
            <div className="col-7 col-lg-4 p-2 rounded bg-blue">
                <p className="p-0 m-0 text-light">{message}</p>
            </div>
        </div>
    )
}

export default ChatSent
