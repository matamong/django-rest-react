import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux';
import LOLCard from './LOLCard'


const MyLOLCard = ({ lolProfile }) => {
    const profile = lolProfile

    return (
        <div>
            {profile !== null ? 
                <LOLCard 
                    name={profile.lol_name}
                    region={profile.region}
                    intro={profile.intro}
                    prefer_style={profile.prefer_style}
                    prefer_time={profile.prefer_time}
                />
            :
                <div>등록하세요!</div>
            }
        
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        lolProfile: state.lolMatching.lolProfile
    }
}

export default connect(mapStateToProps)(MyLOLCard)