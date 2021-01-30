import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './lolform.scss';
import { connect } from 'react-redux';
import { update_lol_usergame, delete_lol_usergame } from '../actions/matching';
import { TextField, Select, MenuItem, FormControl, InputLabel, Typography, Chip, Button } from '@material-ui/core'
import { DoneIcon, HeadsetMic, HeadsetMicOutlined, Hearing , KeyboardVoice, AccessTime } from '@material-ui/icons';
import { setAlert } from '../actions/alert'
import axios from 'axios'
import './lolform.scss'
import Slider, { SliderTooltip } from 'rc-slider';

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

    const [micFormData, setMicFormData] = useState({mic: 'RANDOM_MIC'})
    const { mic } = micFormData

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
                setMicFormData({mic: response.data.mic})

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
                <Button variant="contained" color="primary" type="submit">수정하기</Button>
            )
        }
        return (
            <Button variant="contained" color="primary" type="submit" disabled>
                등록하기
            </Button>
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
    const onSliderChange = value => {
        console.log(value)
        setGeneralFormData({ ...generalFormData, prefer_style: value })
        setIsChanged(true)
    }

    const onSliderPositionChange = (field, value) => {
        console.log(value)
        setPositionFormData({ ...positionFormData, [field]: value })
        setIsChanged(true)
    }

    const onChipChange = (field, value) => {
        console.log('들어온 필드 :' + field)
        console.log('들어온 필드의 값 : ' + value)

        var changedValue = changeValue(value)
        setModeFormData({ ...modeFormData, [field]: changedValue})
        
        console.log('시도한 value : ' + changedValue)
        console.log('---------------------------------')
        setIsChanged(true)
    }

    const onMicChipChange = (str) => {
        console.log('들어온 str :' + str)

        setMicFormData({mic: str})
        
        console.log('---------------------------------')
        setIsChanged(true)
    }

    const changeValue = (value) => { 
        if(value) 
            return 0
        else 
            return 1
    }

    const onSubmit = (e) => {
        e.preventDefault();

        update_lol_usergame(
            generalFormData.lol_name,
            generalFormData.region,
            generalFormData.prefer_style,
            generalFormData.prefer_time,
            generalFormData.intro,
            positionFormData,
            modeFormData,
            micFormData.mic
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
        <div className="lolform__container">
            <form onSubmit={e => onSubmit(e)}>
            <div className="lolform__nicknameregion__container">
                    <h2>LOL 닉네임</h2>
                    <div className="lolform__nicnknameregion__items">
                        <div className="lolform__nickname">
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
                        </div>
                        <div className="lolform__region">
                        <FormControl variant="outlined">
                    <InputLabel id="region-select-label">지역</InputLabel>
                    <Select
                        labelId="region-select-label"
                        value={region}
                    >
                        <MenuItem value={region}>{region}</MenuItem>
                    </Select>

                </FormControl>
                        </div>
                    </div>
                </div>
                <div className="lolform__bias__container">
                    <h2>게임성향</h2>
                    <div className="lolform__bias__preferstyle">
                        <h5>어떻게 게임을 해야 재밌으신가요?</h5>
                        <Slider
                            dots
                            step={1}
                            min={1}
                            max={5}
                            defaultValue={0}
                            marks={{ 1: '즐겜', 2: '', 3: '보통', 4: '', 5: '빡겜' }}
                            value={prefer_style}
                            onChange={onSliderChange}
                        />
                    </div>
                    <div className="lolform__bias__prefermode">
                        <h5>같이 플레이하고 싶은 대전을 선택해주세요.</h5>
                        <Chip label="AI대전" variant={ai === 0 || ai === false ? "outlined" : "default"} color={ai === 0 || ai === false ? "default" : "primary"} clickable={true} onClick={() => onChipChange('ai', ai)} />
                        <Chip label="빠른 대전" variant={normal === 0 || normal === false ? "outlined" : "default"} color={normal === 0 || normal === false? "default" : "primary"} clickable={true} onClick={() => onChipChange('normal', normal)} />
                        <Chip label="솔로/듀오 랭크" variant={solo_duo_rank === 0 || solo_duo_rank === false ? "outlined" : "default"} color={solo_duo_rank === 0 || solo_duo_rank === false ? "default" : "primary"} clickable={true} onClick={() => onChipChange('solo_duo_rank', solo_duo_rank)} />
                        <Chip label="자유 랭크" variant={flex_rank === 0 || flex_rank === false? "outlined" : "default"} color={flex_rank === 0 || flex_rank === false ? "default" : "primary"} clickable={true} onClick={() => onChipChange('flex_rank', flex_rank)} />
                        <Chip label="칼바람 나락" variant={howling_abyss === 0 || howling_abyss === false ? "outlined" : "default"} color={howling_abyss === 0 || howling_abyss === false ? "default" : "primary"} clickable={true} onClick={() => onChipChange('howling_abyss', howling_abyss)} />
                        <Chip label="TFT(롤토체스)" variant={team_fight_tactics === 0 || team_fight_tactics === false ? "outlined" : "default"} color={team_fight_tactics === 0 || team_fight_tactics === false ? "default" : "primary"} clickable={true} onClick={() => onChipChange('team_fight_tactics', team_fight_tactics)} />
                        <Chip label="TFT(롤토체스) 랭크" variant={team_fight_tactics_rank === 0 || team_fight_tactics_rank === false ? "outlined" : "default"} color={team_fight_tactics_rank === 0 || team_fight_tactics_rank === false ? "default" : "primary"} clickable={true} onClick={() => onChipChange('team_fight_tactics_rank', team_fight_tactics_rank)} />
                    </div>
                    <div className="lolform__bias__mic">
                        <h5>소통은 어떻게 하시나요?</h5>
                        <Chip label="마이크가능" icon={<KeyboardVoice/>} variant={mic !== 'MIC' ? "outlined" : "default"} color={mic !== 'MIC' ? "default" : "primary"} clickable={true} onClick={() => onMicChipChange('MIC')} />
                        <Chip label="듣기만" icon={<Hearing/>} variant={mic !== 'HEARING' ? "outlined" : "default"} color={mic !== 'HEARING' ? "default" : "primary"} clickable={true} onClick={() => onMicChipChange('HEARING')} />
                        <Chip label="그때마다 달라요" icon={<AccessTime />}variant={mic !== 'RANDOM_MIC' ? "outlined" : "default"} color={mic !== 'RANDOM_MIC' ? "default" : "primary"} clickable={true} onClick={() => onMicChipChange('RANDOM_MIC')} />
                    </div>
                </div>
                <div className="lolform__preferTime">
                    <h2>선호 시간대</h2>
                    <TextField
                        type='text'
                        placeholder='평일 저녁 8시 ~ 11시'
                        name='prefer_time'
                        value={prefer_time}
                        label="시간대"
                        onChange={e => onChange(setGeneralFormData, 'prefer_time', e.target.value)}
                        variant="outlined"
                        required
                    />
                </div>
                <div className="lolform__intro">
                    <h2>자기소개</h2>
                    <TextField
                        id="outlined-multiline-static"
                        label="자기소개"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        name="intro"
                        value={intro}
                        placeholder='intro'
                        onChange={e => onChange(setGeneralFormData, 'intro', e.target.value)}
                        required
                    />
                </div>
                <div className="lolform__lane__container">
                    <h2>라인 숙련도</h2>
                    <div className="lolform__lane__item">
                        <div className="lolform__lane__img">
                            <img src="/images/Position_Challenger-Top.png" />
                        </div>
                        <div className="lolform__lane__slider">
                            <Slider
                                dots
                                step={1}
                                min={0}
                                max={5}
                                defaultValue={0}
                                marks={{ 0: '안해봤어요.', 1: '', 2: '1인분 해요!', 3: '', 4: '', 5: '자신있어요!' }}
                                value={is_top_possible}
                                onChange={value => onSliderPositionChange('is_top_possible', value)}
                            />
                        </div>
                    </div>
                    <div className="lolform__lane__item">
                        <div className="lolform__lane__img">
                            <img src="/images/Position_Challenger-Jungle.png" />
                        </div>
                        <div className="lolform__lane__slider">
                            <Slider
                                dots
                                step={1}
                                min={0}
                                max={5}
                                defaultValue={0}
                                marks={{ 0: '안해봤어요.', 1: '', 2: '1인분 해요!', 3: '', 4: '', 5: '자신있어요!' }}
                                value={is_jungle_possible}
                                onChange={value => onSliderPositionChange('is_jungle_possible', value)}
                            />
                        </div>
                    </div>
                    <div className="lolform__lane__item">
                        <div className="lolform__lane__img">
                            <img src="/images/Position_Challenger-Mid.png" />
                        </div>
                        <div className="lolform__lane__slider">
                            <Slider
                                dots
                                step={1}
                                min={0}
                                max={5}
                                defaultValue={0}
                                marks={{ 0: '안해봤어요.', 1: '', 2: '1인분 해요!', 3: '', 4: '', 5: '자신있어요!' }}
                                value={is_mid_possible}
                                onChange={value => onSliderPositionChange('is_mid_possible', value)}
                            />
                        </div>
                    </div>
                    <div className="lolform__lane__item">
                        <div className="lolform__lane__img">
                            <img src="/images/Position_Challenger-Bot.png" />
                        </div>
                        <div className="lolform__lane__slider">
                            <Slider
                                dots
                                step={1}
                                min={0}
                                max={5}
                                defaultValue={0}
                                marks={{ 0: '안해봤어요.', 1: '', 2: '1인분 해요!', 3: '', 4: '', 5: '자신있어요!' }}
                                value={is_ad_possible}
                                onChange={value => onSliderPositionChange('is_ad_possible', value)}
                            />
                        </div>
                    </div>
                    <div className="lolform__lane__item">
                        <div className="lolform__lane__img">
                            <img src="/images/Position_Challenger-Support.png" />
                        </div>
                        <div className="lolform__lane__slider">
                            <Slider
                                dots
                                step={1}
                                min={0}
                                max={5}
                                defaultValue={0}
                                marks={{ 0: '안해봤어요.', 1: '', 2: '1인분 해요!', 3: '', 4: '', 5: '자신있어요!' }}
                                value={is_sup_possible}
                                onChange={value => onSliderPositionChange('is_sup_possible', value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="lolform__button">
                    {renderSubmitBtn()}
                    <Button  variant="contained" color="secondary" onClick={onDelete}>삭제</Button>
                </div>
            </form>
        </div>
    )
}

export default connect(null, { setAlert, update_lol_usergame, delete_lol_usergame })(LolUpdateForm)
