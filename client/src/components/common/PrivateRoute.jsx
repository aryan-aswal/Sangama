import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({element}) => {
    const { token } = useSelector((state) => state.auth);
    return (
        <div>
            {
                token ? (<>{element}</>) : (<Navigate to={'/auth'} />)
            }
        </div>
    )
}

export default PrivateRoute