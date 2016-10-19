import React from 'react';
import Icon from 'ffe-icons-react/utropstegn-ikon';
import MessageBox from './message-box';

const iconStyles = {
    width: '40px',
    height: '40px'
};

const ErrorMessage = ({ title, content, style, children }) => MessageBox({
    type: 'error',
    icon: <Icon style={ iconStyles }/>,
    title,
    content,
    style,
    children
});

export default ErrorMessage;
