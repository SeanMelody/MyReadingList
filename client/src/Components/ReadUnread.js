import React from 'react'


const ReadUnread = (props) => {

    let backgroundColor = "green"

    if (props.color === false) {
        backgroundColor = "red"
    }

    const buttonStyle = {
        backgroundColor: backgroundColor,
    };

    return (
        <button
            styles={buttonStyle.backgroundColor}
            onClick={() => console.log(props)}>
            {backgroundColor}
        </button >
    )
}

export default ReadUnread
