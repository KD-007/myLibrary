import React from 'react';

const Alert = (props) => {
    const {type , message , reaction} = props;
    return <div className='position-fixed ' style={{width:"100%" , zIndex:6}}>
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        <strong>{reaction}</strong> {message}
        </div>
    </div>;
}


export default Alert;