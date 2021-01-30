import React from 'react'
import image from '../image.jpg'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';


const ETCTicket = (props) => {
    console.log(props.etc)
    const etc = props.etc
    console.log(etc)
    const etcFalseRender = () => {
        return (
            <div className="ticket__etc__container">
                <div className='music-card playing'>
                    <div className='image'>
                        < img className="image__background" src={image} />
                    </div>
                    <div className='wave'></div>
                    <div className='wave'></div>
                    <div className='wave'></div>
                    <div className='info'>
                        <h2 className='title'>기타 게임</h2>
                        <div className='artist'>등록되지않음</div>
                        <div className="icon">
                            <Link to="/etc-form">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<AddIcon />}
                                >
                                    등록
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>)
    }

    if (!props.etc) return etcFalseRender()
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={1}>
                        {props.etc.map(usergame => (
                            <div className='music-card playing' key={usergame.id}>
                                <div className='image'>
                                    < img className="image__background" src={image}/>
                                </div>
                                <div className='wave'></div>
                                <div className='wave'></div>
                                <div className='wave'></div>
                                <div className='info'>
                                    <h2 className='title'>타이틀</h2>
                                    <div className='artist'>
                                        <div className="artist__check"><CheckCircleIcon fontSize="small" /></div> {usergame.game_nickname}
                                    </div>
                                    <div className="icon"></div>
                                </div>
                            </div>
                        ))}
                </Grid>
            </Grid>
        </Grid>

    )
}

export default ETCTicket