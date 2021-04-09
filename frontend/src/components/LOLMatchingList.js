import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import './lolmatchinglist.scss'
import { create_matching_message_room, send_matching_message } from '../actions/matching';
import { setAlert } from '../actions/alert';
import { Chip } from '@material-ui/core'
import ProgressBarLinePlain from './ProgressBarLinePlain'
import Avatar from '@material-ui/core/Avatar';
import Modal from './Modal'
import { Hearing, KeyboardVoice, AccessTime } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const LOLMatchingList = ({
    name, odds, intro, lol_prefer_mode, lol_position, prefer_style, prefer_time, region,
    solo_rank, solo_tier, mic, main_champ_info, profile}) => {

    const preferStyle = prefer_style
    const tier = solo_tier
    const ai = lol_prefer_mode.ai
    const flex_rank = lol_prefer_mode.flex_rank
    const howling_abyss = lol_prefer_mode.howling_abyss
    const normal = lol_prefer_mode.normal
    const solo_duo_rank = lol_prefer_mode.solo_duo_rank
    const team_fight_tactics = lol_prefer_mode.team_fight_tactics
    const team_fight_tactics_rank = lol_prefer_mode.team_fight_tactics_rank
    const avatarUrl = profile.avatar_url

    const top = lol_position.is_top_possible
    const jungle = lol_position.is_jungle_possible
    const mid = lol_position.is_mid_possible
    const ad = lol_position.is_ad_possible
    const sup = lol_position.is_sup_possible

    const [active, handleActive] = useState(false);
    const [saw, setSaw] = useState(false);

    const [modalForm, setModalForm] = useState({
        receiver: name,
        content: ''
    })
    const { receiver, content } = modalForm

    const modalRef = useRef();

    
    const onChange = e => {
        setModalForm({
            ...modalForm,
            [e.target.name]: e.target.value
        })
    }

    const onCancle = (e) => {
        e.preventDefault();
        modalRef.current.close()
    }

    const handleModal = () =>{
        modalRef.current.open()
    }

    const onSubmit = e => {
        e.preventDefault();
        // 500 에러 났을 때 핸들링 해야함!
        create_matching_message_room(name, 'lol').then(function (result) {
            if (result !== undefined) { send_matching_message(result.id, content) }
        }).then(modalRef.current.close())
    }


    const renderTopPreferStyle = () => {
        if (preferStyle === 0 || preferStyle === 1) {
            return <span className="lolmatchinglist__gameSkill__emoji" >&#129336;</span>
        } else if (preferStyle === 2 || preferStyle === 3) {
            return <span className="lolmatchinglist__gameSkill__emoji" >&#127939;</span>
        } else if (preferStyle === 4 || preferStyle === 5) {
            return <span className="lolmatchinglist__gameSkill__emoji" >&#129340;</span>
        }
    }

    const renderPreferStyle = () => {
        if (preferStyle === 0 || preferStyle === 1) {
            return <div className="lolmatchinglist__gameSkill__bar">
                <span className="lolmatchinglist__gameSkill__emoji" >&#129336;</span>
                <h3>즐겜러</h3>
            </div>
        } else if (preferStyle === 2 || preferStyle === 3) {
            return <div className="lolmatchinglist__gameSkill__bar">
                <span className="lolmatchinglist__gameSkill__emoji" >&#127939;</span>
                <h3>승리지향 즐겜러</h3>
            </div>
        } else if (preferStyle === 4 || preferStyle === 5) {
            return <div className="lolmatchinglist__gameSkill__bar">
                <span className="lolmatchinglist__gameSkill__emoji" >&#129340;</span>
                <h3>빡겜러</h3>
            </div>
        }
    }


    return (
        <div>
            <Modal ref={modalRef}>
                <div className="matchingmodals__item">
                    <span className="matchingmodals__item__emoji">&#128588;</span><h3>상대방에게 인삿말을 보내주세요!</h3>
                    <p>상대방도 매칭을 수락할 수 있게 간단한 인삿말을 보내주세요.</p>
                    <form className="matchingmodals__item__form" onSubmit={e => onSubmit(e)}>
                        <div className="matchingmodals__item__input">
                            <TextField
                                type="text"
                                name='content'
                                value={content}
                                id="outlined-basic" 
                                label="인삿말" 
                                variant="outlined" 
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className="matchingmodals__item__buttons">
                            <div className="matchingmodals__item__button"><Button variant="contained" color="primary" type="submit">보내기</Button></div>
                            <div className="matchingmodals__item__button"><Button variant="contained" color="secondary" onClick={(e) => onCancle(e)}>취소</Button></div>
                        </div>
                    </form>
                </div>
            </Modal>
        <div
            className="lolmatchinglist__content"
            style={{
                height: active ? `64rem` : `3.5rem`,
                transition: "0.5s",
            }}
            onClick={() => {
                handleActive(!active);
                setSaw(true);
            }}
        >
            <div
                className="lolmatchinglist__content__top"
                style={{
                    transition: "0.5s",
                    backgroundColor: saw ? '#3f6ab58f' : 'aliceblue'
                }}
            >
                <div className="lolmatchinglist__top__info">
                    <Avatar src={avatarUrl} />
                    <div className="lolmatching__info__name">{name}</div>
                    <div className="lolmatching__info__lane">
                        {top >= 3 ? <img className="lolmatching__lane__item" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/unranked-top.png'} /> : ""}
                        {jungle >= 3 ? <img className="lolmatching__lane__item" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/unranked-jungle.png'} /> : ""}
                        {mid >= 3 ? <img className="lolmatching__lane__item" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/unranked-mid.png'} /> : ""}
                        {ad >= 3 ? <img className="lolmatching__lane__item" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/unranked-bot.png'} /> : ""}
                        {sup >= 3 ? <img className="lolmatching__lane__item" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/unranked-support.png'} /> : ""}
                    </div>
                </div>
                <div className="lolmatchinglist__top__gameSkill">
                    {renderTopPreferStyle(preferStyle)}
                </div>
            </div>
            <div
                className="lolmatchinglist__content__bottom"
                style={{
                    display: active ? `inline-block` : `none`,
                    transition: "0.5s"
                }}
            >
                <div className="lolmatchinglist__bottom__detail">
                    <div className="lolmatchinglist__detail__kda">
                        <div className="lolmatchinglist__kda__title">승률</div>
                        <div>{odds}</div>
                    </div>
                    <div className="lolmatchinglist__detail__skill">
                        <div className="lolmatchinglist__skill__gameSkill">
                            <div className="lolmatchinglist__gameSkill__item">
                                <div className="lolmatchinglist__skill__title">
                                    게임 성향
                                </div>
                                {renderPreferStyle(preferStyle)}
                            </div>
                            <div className="lolmatchinglist__gameSkill__item">
                                <div className="lolmatchinglist__skill__title">
                                    티어
                                </div>
                                <div className="lolmatchinglist__gameSkill__bar">
                                    <span className="lolmatchinglist__gameSkill__emoji" >
                                        <img className="lolmatchinglist__gameSkill__rank" src={"https://raw.githubusercontent.com/matamatamong/img/main/Django-rest-React/lol_static/Rank/emblems/" + tier + ".png"} />
                                        <div className="lolmatchinglist__gameSkill__rank__name">{tier}</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="lolmatchinglist__skill__laneSkill">
                            <div className="lolmatchinglist__skill__title">
                                라인 숙련도
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-top.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={lol_position.is_top_possible * 0.1} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-jungle.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={lol_position.is_jungle_possible * 0.1} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-mid.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={lol_position.is_mid_possible * 0.1} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-bot.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={lol_position.is_ad_possible * 0.1} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-support.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={lol_position.is_sup_possible * 0.1} />
                                </div>
                            </div>
                        </div>
                        <div className="lolmatchinglist__skill__OtherSkill">
                            <div className="lolmatchinglist__skill__mic">
                                <div className="lolmatchinglist__skill__title">마이크 여부</div>
                                {mic === 'MIC' ? <div className="lolmatchinglist__mic__icon"> <KeyboardVoice fontSize="small" /> </div> : ''}
                                {mic === 'HEARING' ? <div className="lolmatchinglist__mic__icon"> <Hearing fontSize="small" /> </div>: ''}
                                {mic === 'RANDOM_MIC' ? <div className="lolmatchinglist__mic__icon"> <AccessTime fontSize="small" /> </div>: ''}
                                {mic === "MIC" ? <div className="lolmatchinglist__mic__text">마이크 사용해요.</div> : ""}
                                {mic === "HEARING" ? <div className="lolmatchinglist__mic__text">듣기만 가능해요.</div> : ""}
                                {mic === "RANDOM_MIC" ? <div className="lolmatchinglist__mic__text">때 마다 달라요.</div> : ""}
                            </div>
                            <div className="lolmatchinglist__skill__champion">
                                <div className="lolmatchinglist__skill__title">주 챔피언</div>
                                <div className="lolmatchinglist__champion__container">
                                    <div className="lolmatchinglist__champion__item">
                                        {`${main_champ_info.name}` === "Newbie" ? <div className="lolmatchinglist__champion__none">챔피언 데이터가 없어요 </div>:
                                            <img
                                                className="lolmatchinglist__champion__img"
                                                src={main_champ_info.champion_avatar}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lolmatchinglist__detail__info">
                        <div className="lolmatchinglist__info__intro">
                            <div className="lolmatchinglist__skill__title">선호 시간대</div>
                            <p className="lolmatchinglist__intro__content">{prefer_time}</p>
                        </div>
                        <div className="lolmatchinglist__info__intro">
                            <div className="lolmatchinglist__skill__title">자기소개</div>
                            <p className="lolmatchinglist__intro__content">{intro}</p>
                        </div>
                        <div className="lolmatchinglist__info__intro">
                            <div className="lolmatchinglist__skill__title">선호 모드</div>
                            <div className="lolmatchinglist__info__intro">
                                {ai === true ? <Chip label="AI대전" /> : ""}
                                {normal === true ? <Chip label="빠른 대전" /> : ""}
                                {solo_duo_rank === true ? <Chip label="솔로/듀오 랭크" /> : ""}
                                {flex_rank === true ? <Chip label="자유 랭크" /> : ""}
                                {howling_abyss === true ? <Chip label="칼바람 나락" /> : ""}
                                {team_fight_tactics === true ? <Chip label="TFT(롤토체스)" /> : ""}
                                {team_fight_tactics_rank === true ? <Chip label="TFT(롤토체스) 랭크" /> : ""}
                            </div>
                        </div>
                    </div>
                        <div className="lolmatchinglist__detail__button">
                                <Button variant="contained" color="primary" disableElevation fullWidth onClick={handleModal}>매칭 신청</Button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { create_matching_message_room, send_matching_message, setAlert })(LOLMatchingList)
