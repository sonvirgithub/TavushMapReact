import React from 'react'

const LoginLayout = props => {
    const { children } = props;

    return (
        <div>

           
            <main >{children}</main>
        </div>
    );
};



export default LoginLayout;