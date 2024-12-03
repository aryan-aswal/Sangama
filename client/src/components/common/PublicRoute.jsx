import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({element}) => {
    const { token } = useSelector((state) => state.auth);
    return (
        <div>
            {
                token ? (<Navigate to={'/'}/>) : (<>{element}</>)
            }
        </div>
    )
}

export default PublicRoute