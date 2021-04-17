import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { save_lol_usergame } from '../actions/matching';
import Card from '../components/LOLCard'
import './lolform.scss'
import { TextField, Select, MenuItem, FormControl, InputLabel, Typography, Chip, Button } from '@material-ui/core'
import { DoneIcon, HeadsetMic, HeadsetMicOutlined, Hearing , KeyboardVoice, AccessTime } from '@material-ui/icons';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import LOLMatchingList from '../components/LOLMatchingList'


// https://stackoverflow.com/questions/58889116/updating-nested-object-in-react-hooks
const useStyles = makeStyles((theme) => ({
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const LolForm = ({ save_lol_usergame }) => {
    const classes = useStyles();

    const [profile, setProfile] = useState(null)
    const [cardCreated, setCardCreated] = useState(false)
    const [loading, setLoading] = useState(false)

    const [valueData, setValueData] = useState({
        nameEntered: '',
        isNameValid: false
    })

    const [isNameDuplicated, setIsNameDuplicated] = useState(false)

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

    const checkDuplicatedName = (nickname) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            axios.get(
                "/api/matching/lol/usergame/" + nickname,
                config
            ).then(response => {

                const profile = response.data

                if (profile.lol_name === nickname) {
                    console.log('중복 있어용' + profile.lol_name + nickname)
                    setIsNameDuplicated(true)
                } else {
                    console.log('중복 없어용' + profile.name)
                    setIsNameDuplicated(false)
                }
            })
        } catch (e) {
            console.log('error!')
            return false
        }
    }

    const validateName = (set, field, value) => {
        checkDuplicatedName(value)
        var nickLength = changeEngKorLength(value)
        if (nickLength > 2 && nickLength <= 18) {
            setValueData({
                ...valueData,
                nameEntered: value,
                isNameValid: true
            })
            onChange(set, field, value)
        } else {
            setValueData({
                ...valueData,
                nameEntered: value,
                isNameValid: false
            })
            onChange(set, field, value)
        }
    }

    function changeEngKorLength(str) {
        var nickLength = 0
        for (var i = 0; i < str.length; i++) { //한글은 2, 영문은 1로 치환 
            var charStr = str.charAt(i);

            if (escape(charStr).length > 4) {
                nickLength += 2;
            } else {
                nickLength += 1;
            }
        }
        return nickLength
    }

    const isEnteredNameValid = () => {
        const { nameEntered, isNameValid } = valueData
        if (nameEntered) return isNameValid
    }

    const isNameFieldValid = () => {
        const isNameValid = valueData.isNameValid
        if (isNameValid === true && isNameDuplicated === false)
            return true
        else
            return false
    }

    const renderSubmitBtn = () => {
        if (isNameFieldValid() && cardCreated === false) {
            return (
                <Button variant="contained" color="primary" type="submit">등록하기</Button>
            )
        } else {
            return (
                <Button variant="contained" color="primary" type="submit" disabled>
                    등록하기
                </Button>
            )
        }
    }

    const onChange = (set, field, value) => {
        set(state => ({
            ...state,
            [field]: value
        }));
        console.log('field : ' + field, 'value : ' + value)
    };

    const onSliderChange = value => {
        console.log(value)
        setGeneralFormData({ ...generalFormData, prefer_style: value })
    }

    const onSliderPositionChange = (field, value) => {
        console.log(value)
        setPositionFormData({ ...positionFormData, [field]: value })
    }

    const onChipChange = (field, value) => {
        console.log('들어온 필드 :' + field)
        console.log('들어온 필드의 값 : ' + value)

        var changedValue = changeValue(value)
        setModeFormData({ ...modeFormData, [field]: changedValue})
        
        console.log('시도한 value : ' + changedValue)
        console.log('---------------------------------')
    }

    const onMicChipChange = (str) => {
        console.log('들어온 str :' + str)

        setMicFormData({mic: str})
        
        console.log('---------------------------------')
    }

    const changeValue = (value) => { 
        if(value) 
            return 0
        else 
            return 1
    }


    const onSubmit = (e) => {
        e.preventDefault();

        try{
            setLoading(true)
            save_lol_usergame(
                generalFormData.lol_name,
                generalFormData.region,
                generalFormData.prefer_style,
                generalFormData.prefer_time,
                generalFormData.intro,
                positionFormData,
                modeFormData,
                micFormData.mic
            ).then(function (result) {
                setLoading(false)
                setProfile(result)
                setCardCreated(true)
            })
        } catch(e) {
            setLoading(false)
        }
    }


    return (
        <div className="lolform__container">
            <form onSubmit={e => onSubmit(e)}>
                <div className="lolform__nicknameregion__container">
                    <h2 className="lolform__title">LOL 닉네임</h2>
                    <div className="lolform__nickname__message">
                        {isNameDuplicated === true ? '있는 닉넴!!' : 'ㅇㅋㅇㅋ 써도 됨'}
                    </div>
                    <div className="lolform__nicnknameregion__items">
                        <div className="lolform__nickname">
                            <TextField
                                type='text'
                                placeholder='lol_name'
                                name='lol_name'
                                value={lol_name}
                                label="롤 닉네임"
                                error={isEnteredNameValid() === false}
                                helperText={isEnteredNameValid() === false ? '닉네임은 3글자 이상이어야 합니다.' : ''}
                                onChange={e => validateName(setGeneralFormData, 'lol_name', e.target.value)}
                                variant="outlined"
                                required
                            />
                        </div>
                        <div className="lolform__region">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="region-select-label">지역</InputLabel>
                                <Select
                                    labelId="region-select-label"
                                    value={region}
                                    onChange={e => onChange(setGeneralFormData, 'region', e.target.value)}
                                >
                                    <MenuItem value="KR">한국</MenuItem>
                                    <MenuItem value="NA">북아메리카</MenuItem>
                                    <MenuItem value="JP1">일본</MenuItem>
                                    <MenuItem value="BR">브라질</MenuItem>
                                    <MenuItem value="EUW1">서유럽</MenuItem>
                                    <MenuItem value="EUN1">동유럽/노르딕</MenuItem>
                                    <MenuItem value="LA1">라틴 아메리카(북)</MenuItem>
                                    <MenuItem value="LA2">라틴 아메리카(남)</MenuItem>
                                    <MenuItem value="OC1">오세아니아</MenuItem>
                                    <MenuItem value="RU1">러시아</MenuItem>
                                    <MenuItem value="TR">터키</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="lolform__bias__container">
                    <h2 className="lolform__title">게임성향</h2>
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
                        <Chip label="AI대전" variant={ai === 0 ? "outlined" : "default"} color={ai === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('ai', ai)} />
                        <Chip label="빠른 대전" variant={normal === 0 ? "outlined" : "default"} color={normal === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('normal', normal)} />
                        <Chip label="솔로/듀오 랭크" variant={solo_duo_rank === 0 ? "outlined" : "default"} color={solo_duo_rank === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('solo_duo_rank', solo_duo_rank)} />
                        <Chip label="자유 랭크" variant={flex_rank === 0 ? "outlined" : "default"} color={flex_rank === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('flex_rank', flex_rank)} />
                        <Chip label="칼바람 나락" variant={howling_abyss === 0 ? "outlined" : "default"} color={howling_abyss === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('howling_abyss', howling_abyss)} />
                        <Chip label="TFT(롤토체스)" variant={team_fight_tactics === 0 ? "outlined" : "default"} color={team_fight_tactics === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('team_fight_tactics', team_fight_tactics)} />
                        <Chip label="TFT(롤토체스) 랭크" variant={team_fight_tactics_rank === 0 ? "outlined" : "default"} color={team_fight_tactics_rank === 0 ? "default" : "primary"} clickable={true} onClick={() => onChipChange('team_fight_tactics_rank', team_fight_tactics_rank)} />
                    </div>
                    <div className="lolform__bias__mic">
                        <h5>소통은 어떻게 하시나요?</h5>
                        <Chip label="마이크가능" icon={<KeyboardVoice/>} variant={mic !== 'MIC' ? "outlined" : "default"} color={mic !== 'MIC' ? "default" : "primary"} clickable={true} onClick={() => onMicChipChange('MIC')} />
                        <Chip label="듣기만" icon={<Hearing/>} variant={mic !== 'HEARING' ? "outlined" : "default"} color={mic !== 'HEARING' ? "default" : "primary"} clickable={true} onClick={() => onMicChipChange('HEARING')} />
                        <Chip label="그때마다 달라요" icon={<AccessTime />}variant={mic !== 'RANDOM_MIC' ? "outlined" : "default"} color={mic !== 'RANDOM_MIC' ? "default" : "primary"} clickable={true} onClick={() => onMicChipChange('RANDOM_MIC')} />
                    </div>
                </div>
                <div className="lolform__preferTime">
                    <h2 className="lolform__title">선호 시간대</h2>
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
                    <h2 className="lolform__title">자기소개</h2>
                    <TextField
                        id="outlined-multiline-static"
                        label="자기소개"
                        multiline
                        rowsMax={4}
                        defaultValue="Default Value"
                        variant="outlined"
                        name="intro"
                        value={intro}
                        placeholder='intro'
                        onChange={e => onChange(setGeneralFormData, 'intro', e.target.value)}
                        required
                    />
                </div>
                <div className="lolform__lane__container">
                    <h2 className="lolform__title">라인 숙련도</h2>
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
                    {loading === true ?  <div><CircularProgress /></div> : renderSubmitBtn() }
                </div>
            </form>
            {profile == null ? '' :
                <div className='pow'>
                    <div className="lolform__profile">
                    <LOLMatchingList
                    isMyUsergame={true}
                    name={profile.user.name}
                    odds={profile.odds.odds}
                    intro={profile.intro}
                    main_champ_info={profile.main_champ_info}
                    lol_position={profile.lol_position}
                    lol_prefer_mode={profile.lol_prefer_mode}
                    prefer_style={profile.prefer_style}
                    prefer_time={profile.prefer_time}
                    region={profile.region}
                    solo_rank={profile.solo_rank}
                    solo_tier={profile.solo_tier}
                    profile={profile.user.profile}
                    mic={profile.mic}
                />
                    <Card profile={profile} />
                </div>
                </div>
            }
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


export default connect(null, { save_lol_usergame })(LolForm);
