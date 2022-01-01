import React from 'react'
import ErrorSVG from '../components/ErrorSVG'

const NotFound = () => (
    <div style={{ textAlign: 'center'}}>
        <div>
            <ErrorSVG width="50%" height="50%" /> 
        </div>
        <div style={{ margin: '1.5rem 0 1.5rem 0', padding: "1rem"}}>   
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <span style={{ fontSize:"x-large", marginTop: "0.3rem", marginRight: "0.5rem"}}>&#128581;</span>
                    <h1>404 NOT FOUND</h1>
                </div>
            <h3>페이지를 찾을 수 없어요.</h3>
        </div>
    </div>
)

export default NotFound