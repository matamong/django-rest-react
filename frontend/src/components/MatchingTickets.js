import React from 'react'
import LOLTicket from './LOLTicket'
import ETCTicket from './ETCTicket'
import './matchingTickets.scss'


const MatchingTickets = (props) => {

  //console.log(props.lol[0].main_champ_info.champion_image[0])

  console.log(props.lol[0])
  console.log(props.etc)
  return (
    <div>
      <LOLTicket lol={props.lol[0]}/>
      <ETCTicket etc={props.etc} />
    </div>
    

  )
}

export default MatchingTickets