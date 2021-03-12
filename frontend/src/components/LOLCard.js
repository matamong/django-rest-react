import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/Comment';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import SportsMmaIcon from '@material-ui/icons/SportsMma';

// Loading / Error / 등록 각각 만들기
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
    console.log(props)
    return (
        <Card className={classes.root}>
      <CardContent>
      <Avatar alt={props.profile.main_champ_info.name} src={props.profile.main_champ_info.champion_avatar} /> 
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.profile.region}
        </Typography>
        <Typography variant="h5" component="h2">
            {props.profile.user.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {props.profile.solo_tier} {props.profile.solo_rank}
        </Typography>
        <Typography variant="body2" component="p">
          <CommentIcon /> {props.profile.intro}
          <br />
          <SportsMmaIcon /> {props.profile.prefer_style}
          <br />
          <AccessTimeIcon /> {props.profile.prefer_time}
          <br />          
        </Typography>
        <HeadsetMicIcon />
      </CardContent>
    </Card>
    )
}

export default LOLCard