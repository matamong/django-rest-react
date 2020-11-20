import React, { useState } from 'react'; 
import './lolform.scss';
import { connect } from 'react-redux';
import { save_lol_usergame } from '../actions/lolMatching';
import './lolform.scss'

//const LolForm = () => {
//    const [checked, setChecked] = useState(false);
//
//
//    return (
//        <div className="checkbox">
//            <input type="checkbox" checked={checked}></input>
//            <button onClick={() => {setChecked(old => !old)}}> {checked ? 'uncheck' : 'check'} </button>
//        </div>
//    )
//}

// https://stackoverflow.com/questions/58889116/updating-nested-object-in-react-hooks

const LolForm = ({ isLolUsergameSaved, save_lol_usergame }) => {
    const [generalFormData, setGeneralFormData] = useState({
        lol_name: '',
        region: '',
        prefer_style: '',
        prefer_time: '',
        intro: ''
    })
    // 나중에 action에 들어갈때는 값을 끄집어내자.
    // cosnt body = JSON.stringify({ generalFormData.lol_name , ..., posionFormData, modeFormData}) 이렇게@

    const {lol_name, region, prefer_style, prefer_time, intro} = generalFormData

    const [positionFormData, setPositionFormData] = useState({
        is_top_possible: 0,
        is_jungle_possible: 0,
        is_mid_possible: 0,
        is_ad_possible: 0,
        is_sup_possible: 0
    })
    
    const { is_top_possible, is_jungle_possible, is_mid_possible, is_ad_possible, is_sup_possible} = positionFormData

    const [modeFormData, setModeFormData] = useState({
        ai: 0,
        normal: 0,
        solo_duo_rank: 0,
        flex_rank: 0,
        howling_abyss: 0,
        team_fight_tactics: 0,
        team_fight_tactics_rank: 0
    })

    const { ai, normal, solo_duo_rank, flex_rank, howling_abyss, team_fight_tactics, team_fight_tactics_rank } = modeFormData

    const onChange = (set, field, value) => {
        set(state => ({
          ...state,
          [field]: value
        }));
      };

      const onSubmit = (e) => {
        e.preventDefault();

        save_lol_usergame(
            generalFormData.lol_name,
            generalFormData.region,
            generalFormData.prefer_style,
            generalFormData.prefer_time,
            generalFormData.intro,
            positionFormData,
            modeFormData
        )

        console.log(
            generalFormData.lol_name,
            generalFormData.region,
            generalFormData.prefer_style,
            generalFormData.prefer_time,
            generalFormData.intro,
            positionFormData,
            modeFormData);
    }
      

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    type='text'
                    placeholder='lol_name'
                    name='lol_name'
                    value={lol_name}
                    onChange={e => onChange(setGeneralFormData, 'lol_name', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='region'
                    name='region'
                    value={region}
                    onChange={e => onChange(setGeneralFormData, 'region', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='prefer_style'
                    name='prefer_style'
                    value={prefer_style}
                    onChange={e => onChange(setGeneralFormData, 'prefer_style', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='prefer_time'
                    name='prefer_time'
                    value={prefer_time}
                    onChange={e => onChange(setGeneralFormData, 'prefer_time', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='intro'
                    name='intro'
                    value={intro}
                    onChange={e => onChange(setGeneralFormData, 'intro', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='is_top_possible'
                    name='is_top_possible'
                    value={is_top_possible}
                    onChange={e => onChange(setPositionFormData, 'is_top_possible', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='is_jungle_possible'
                    name='is_jungle_possible'
                    value={is_jungle_possible}
                    onChange={e => onChange(setPositionFormData, 'is_jungle_possible', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='is_mid_possible'
                    name='is_mid_possible'
                    value={is_mid_possible}
                    onChange={e => onChange(setPositionFormData, 'is_mid_possible', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='is_ad_possible'
                    name='is_ad_possible'
                    value={is_ad_possible}
                    onChange={e => onChange(setPositionFormData, 'is_ad_possible', e.target.value)}
                />
                <input
                    type='text'
                    placeholder='is_sup_possible'
                    name='is_sup_possible'
                    value={is_sup_possible}
                    onChange={e => onChange(setPositionFormData, 'is_sup_possible', e.target.value)}
                />
                <button type="submit">
                    submit
                </button>
            </form>
        </div>
        
        // <form>
        // <ul className="lolform__`checkbox_container">
        //     <li className="lolform__checkbox">
        //         <input type="checkbox" name="is_top_possible" id="isTopPossible" />
        //         <label for="isTopPossible"><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png" /></label>
        //     </li>
        // </ul>
        // </form>
    )
}

const mapStateToProps = state => ({
    isLolUsergameSaved: state.lolMatching.isLolUsergameSaved
})

export default connect(mapStateToProps, { save_lol_usergame })(LolForm);