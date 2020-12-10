import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './lolform.scss';
import { connect } from 'react-redux';
import { update_lol_usergame, delete_lol_usergame } from '../actions/matching';
import { setAlert } from '../actions/alert'
import axios from 'axios'
import './lolform.scss'
import { TextField, Select, MenuItem, FormControl, InputLabel, Typography, Slider } from '@material-ui/core'

const LolUpdateForm = ({ history, setAlert, update_lol_usergame, delete_lol_usergame }) => {
    
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isChanged, setIsChanged] = useState(false)

    const [generalFormData, setGeneralFormData] = useState({
        lol_name: '',
        region: 'KR',
        prefer_style: 1,
        prefer_time: '',
        intro: ''
    })

    const { lol_name, region, prefer_style, prefer_time, intro } = generalFormData

    const [positionFormData, setPositionFormData] = useState({
        is_top_possible: 0,
        is_jungle_possible: 0,
        is_mid_possible: 0,
        is_ad_possible: 0,
        is_sup_possible: 0
    })

    const { is_top_possible, is_jungle_possible, is_mid_possible, is_ad_possible, is_sup_possible } = positionFormData

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


    // 1. data fetch 해서 setState에 넣기 -> 

    const fetchProfile = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            setError(null);
            setProfile(null);
            setLoading(true);
            
            axios.get(`${process.env.REACT_APP_API_URL}/api/matching/lol/my/usergame`, config)
            .then(function (response) {
                console.log(response);
                setProfile(response.data)
                //////////////////////////////////////////////////
                setGeneralFormData({
                    lol_name: response.data.lol_name,
                    region: response.data.region,
                    prefer_style: response.data.prefer_style,
                    prefer_time: response.data.prefer_time,
                    intro: response.data.intro
                })
                setPositionFormData({
                    is_top_possible: response.data.lol_position.is_top_possible,
                    is_jungle_possible: response.data.lol_position.is_jungle_possible,
                    is_mid_possible: response.data.lol_position.is_mid_possible,
                    is_ad_possible: response.data.lol_position.is_ad_possible,
                    is_sup_possible: response.data.lol_position.is_sup_possible
                })
                setModeFormData({
                    ai: response.data.lol_prefer_mode.ai,
                    normal: response.data.lol_prefer_mode.flex_rank,
                    solo_duo_rank: response.data.lol_prefer_mode.solo_duo_rank,
                    flex_rank: response.data.lol_prefer_mode.flex_rank,
                    howling_abyss: response.data.lol_prefer_mode.howling_abyss,
                    team_fight_tactics: response.data.lol_prefer_mode.team_fight_tactics,
                    team_fight_tactics_rank: response.data.lol_prefer_mode.team_fight_tactics_rank
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        } catch (e) {
            setError(e);
            console.log(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    // 2. data onChange( update ) 적용

    const renderSubmitBtn = () => {
        if (isChanged === true) {
            return (
                <button type="submit">등록하기</button>
            )
        }
        return (
            <button type="submit" disabled>
                등록하기
            </button>
        )
    }
    const onChange = (set, field, value) => {
        set(state => ({
            ...state,
            [field]: value
        }));
        console.log('field : ' + field, 'value : ' + value)
        setIsChanged(true)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        update_lol_usergame(
            generalFormData.lol_name,
            generalFormData.region,
            generalFormData.prefer_style,
            generalFormData.prefer_time,
            generalFormData.intro,
            positionFormData,
            modeFormData
        ).then(function(result){
            if(result == true) {
                setAlert('성공적으로 수정되었습니다!', 'Udate Success', 1500)
            }
        }).then(function(result){
            setTimeout(function() {
                history.goBack()
              }, 1500);
        })
    }

    const onDelete = () => {
        delete_lol_usergame().then(function(result){
            if(result == true) {
                setAlert('성공적으로 삭제되었습니다!', 'Delete Success', 1500)
            }
        }).then(function(result){
            setTimeout(function() {
                history.goBack()
              }, 1500);
        })
    }


    // 3. data delete function 생성

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <TextField
                    type='text'
                    placeholder='lol_name'
                    name='lol_name'
                    value={lol_name}
                    label="롤 닉네임"
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                      }}
                />
                <FormControl variant="outlined">
                    <InputLabel id="region-select-label">지역</InputLabel>
                    <Select
                        labelId="region-select-label"
                        value={region}
                    >
                        <MenuItem value={region}>{region}</MenuItem>
                    </Select>

                </FormControl>
                <Typography id="discrete-slider" gutterBottom>
                    게임성향
                </Typography>
                <input
                    type='text'
                    placeholder='prefer_style'
                    name='prefer_style'
                    value={prefer_style}
                    onChange={e => onChange(setGeneralFormData, 'prefer_style', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='prefer_time'
                    name='prefer_time'
                    value={prefer_time}
                    onChange={e => onChange(setGeneralFormData, 'prefer_time', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='intro'
                    name='intro'
                    value={intro}
                    onChange={e => onChange(setGeneralFormData, 'intro', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='is_top_possible'
                    name='is_top_possible'
                    value={is_top_possible}
                    onChange={e => onChange(setPositionFormData, 'is_top_possible', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='is_jungle_possible'
                    name='is_jungle_possible'
                    value={is_jungle_possible}
                    onChange={e => onChange(setPositionFormData, 'is_jungle_possible', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='is_mid_possible'
                    name='is_mid_possible'
                    value={is_mid_possible}
                    onChange={e => onChange(setPositionFormData, 'is_mid_possible', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='is_ad_possible'
                    name='is_ad_possible'
                    value={is_ad_possible}
                    onChange={e => onChange(setPositionFormData, 'is_ad_possible', e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='is_sup_possible'
                    name='is_sup_possible'
                    value={is_sup_possible}
                    onChange={e => onChange(setPositionFormData, 'is_sup_possible', e.target.value)}
                    required
                />
                {renderSubmitBtn()}
                <button type="button" onClick={onDelete}>삭제</button>
            </form>
        </div>
    )
}

export default connect(null, { setAlert, update_lol_usergame, delete_lol_usergame })(LolUpdateForm)
