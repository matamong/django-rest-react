import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux';
import LOLCard from './LOLCard'

// Loading 만들기
// 등록하기 만들기

// user id 가져오고 
    // .then lolProfile 가져오고
    // .then data dragon (img, 설명등등) 가져오기.

// Redux state에 의존하지말자. async라서 바로바로 못 쓰고 걍 잘 쓰지도 못할꺼,,,그냥 하나씩 데려와
// https://stackoverflow.com/questions/61703393/react-useeffect-and-axios-making-chained-api-calls-within-then
// https://stackoverflow.com/questions/57376297/how-to-make-a-second-api-call-based-on-the-first-response

// 아니면 !!!
// 그냥 action에서 dataDragon으로 main champ url처리를 해버려
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
                    main_champion_name={profile.main_champ_info.name}
                    main_champion_avatar={profile.main_champ_info.champion_avatar}
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