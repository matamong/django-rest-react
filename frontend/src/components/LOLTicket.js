import React from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const LOLTicket = (props) => {
  const lolTrueRender = () => {
    return (
      <div className='true__music-card playing'>
        <Link to="lol-matching">
          <div className='image'>
            < img className="image__background" src={props.lol.main_champ_info.champion_image[0]} />
          </div>
        </Link>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <Link to="lol-matching">
          <div className='info'>
            <h2 className='title'>리그 오브 레전드</h2>
            <div className='artist'>
              <div className="artist__check"><CheckCircleIcon fontSize="small" /></div> 등록됨
              </div>
            <div className="icon"></div>
          </div>
        </Link>
      </div>)
  }
  const lolFalseRender = () => {
    return (
        <div className='music-card playing'>
          <div className='image'>
            < img className="image__background" src="https://cdnb.artstation.com/p/assets/images/images/021/422/255/large/t-j-geisen-lol-icon-rendered-v001.jpg?1571640551" />
          </div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='info'>
            <h2 className='title'>리그 오브 레전드</h2>
            <div className='artist'>등록되지않음</div>
            <div className="icon">
              <Link to="/lol-form">
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
        </div>)
  }
  return (
    <div className="ticket__container">
      {props.lol === null || props.lol === undefined ? 
        lolFalseRender()
        :
        lolTrueRender()}
    </div>
  )
}

export default LOLTicket