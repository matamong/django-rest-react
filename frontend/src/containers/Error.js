import React from 'react'
import ErrorSVG from '../components/ErrorSVG'

const Error = (props) => {
    return (
        <div style={{ textAlign: "center"}}>
            <div>
                <ErrorSVG width="50%" height="50%" />
            </div>
            <div style={{ margin: "1.5rem 0 1.5rem 0 ", padding: "1rem"}}>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <span style={{ fontSize:"x-large", marginTop: "0.3rem", marginRight: "0.5rem"}}>&#129318;</span>
                    <h1>문제가 생겼습니다.</h1>
                </div>
                {
                    props.text ? <h5>{props.text}</h5> 
                : 
                    <div>
                        <h5>이런, 문제가 생겼네요. </h5>
                        <h5>괜찮으시다면 무엇을 하셨는지 알려주세요.</h5>
                        <h5>gameduosdev@gmail.com</h5>
                    </div>
                }
            </div>
        </div>
    )
}

export default Error