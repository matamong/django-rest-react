import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import './lolcard.scss';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const LOLCard = (props) => {
    
    const classes = useStyles();

    return (
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.region}
        </Typography>
        <Typography variant="h5" component="h2">
            {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          자ㅏ기소개ㅐㅐ{props.intro}
          <br />
          빡즐겜수치: {props.prefer_style}
          <br />
          시간대ㅐㅐㅐ: {props.prefer_time}
          <br />
          메인 챔프: {props.main_champion_name}
          
        </Typography>
      </CardContent>
      <Avatar alt={props.main_champion} src={props.main_champion_avatar} />
    </Card>
    )
}

export default LOLCard