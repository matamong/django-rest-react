import React, { useState } from 'react'
import './lolmatchinglist.scss'
import { Chip } from '@material-ui/core'
import ProgressBarLinePlain from './ProgressBarLinePlain'

const LOLMatchingList = (name, intro, lol_position, lol_prefer_mode, champion_avatar, odds, prefer_style, prefer_time, region, solo_rank, user) => {
    
    const [active, handleActive] = useState(false);
    const [saw, setSaw] = useState(false);

    const renderPreferStyle = (pr) => {
        console.log(pr)
        if(pr === 0 || pr === 1) {
            return <div className="lolmatchinglist__gameSkill__bar">
            <span className="lolmatchinglist__gameSkill__emoji" >&#129336;</span>
            <h3>즐겜러</h3>
        </div>
        }else if(pr === 2 || pr === 3 ) {
            return <div className="lolmatchinglist__gameSkill__bar">
            <span className="lolmatchinglist__gameSkill__emoji" >&#127939;</span>
            <h3>즐겜러</h3>
        </div>
        }else if(pr === 4 || pr === 5 ) {
            return <div className="lolmatchinglist__gameSkill__bar">
            <span className="lolmatchinglist__gameSkill__emoji" >&#129340;</span>
            <h3>즐겜러</h3>
        </div>
        }
            
        
    }

    return (
        <div
            className="lolmatchinglist__content"
            style={{
                height: active ? `63rem` : `3.5rem`,
                transition: "0.5s",
                backgroundColor: saw ? 'aliceblue' : 'white'
            }}
            onClick={() => {
                handleActive(!active);
                setSaw(true);
            }}
        >
            <div className="lolmatchinglist__content__top">
                <div className="lolmatchinglist__top__info">
                    <img className="lolmatching__info__avatar" src={'https://www.flaticon.com/svg/vstatic/svg/2210/2210182.svg?token=exp=1616773744~hmac=ec1e8a55c7c1133e9f55191bade0c0c5'} />
                    <div className="lolmatching__info__name">{name}</div>
                    <img className="lolmatching__info__lane" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/unranked-bot_lg.png   '} />
                </div>
                <div className="lolmatchinglist__top__gameSkill">
                    <span className="lolmatchinglist__gameSkill__emoji" >&#129336;</span>
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
                                {renderPreferStyle}
                            </div>
                            <div className="lolmatchinglist__gameSkill__item">
                                <div className="lolmatchinglist__skill__title">
                                    티어
                                </div>
                                <div className="lolmatchinglist__gameSkill__bar">
                                <span className="lolmatchinglist__gameSkill__emoji" >그머시기냐 이미지</span>
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
                                    <ProgressBarLinePlain animate={0.5} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-jungle.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={0.5} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-mid.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={1.0} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-bot.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={0.0} />
                                </div>
                            </div>
                            <div className="lolmatchinglist__laneSkill_item">
                                <img className="lolmatchinglist__laneSkill__img" src={'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/rankposition_gold-support.png'} />
                                <div className="lolmatchinglist__laneSkill__bar">
                                    <ProgressBarLinePlain animate={0.2} />
                                </div>
                            </div>
                        </div>
                        <div className="lolmatchinglist__skill__champion">
                            <div className="lolmatchinglist__skill__title">주 챔피언</div>
                            <div className="lolmatchinglist__champion__container">
                                <div className="lolmatchinglist__champion__item">
                                    <img
                                        className="lolmatchinglist__champion__img"
                                        src={champion_avatar}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lolmatchinglist__detail__info">
                        <div className="lolmatchinglist__info__intro">
                            <div className="lolmatchinglist__skill__title">선호 시간대</div>
                            <p className="lolmatchinglist__intro__content">얼마나 목숨이 트고, 눈이 무엇을 이것이다. 인간의 발휘하기 무엇을 이상을 못할 교향악이다. 인생에 이는 하는 그들에 얼마나 목숨이 트고, 얼마나 목숨이 트고,</p>
                        </div>
                        <div className="lolmatchinglist__info__intro">
                            <div className="lolmatchinglist__skill__title">자기소개</div>
                            <p className="lolmatchinglist__intro__content">얼마나 목숨이 트고, 눈이 무엇을 이것이다. 인간의 발휘하기 무엇을 이상을 못할 교향악이다. 인생에 이는 하는 그들에 얼마나 목숨이 트고, 얼마나 목숨이 트고,</p>
                        </div>
                        <div className="lolmatchinglist__info__intro">
                            <div className="lolmatchinglist__skill__title">성향</div>
                            <div className="lolmatchinglist__info__intro">
                                <Chip label="AI대전" variant={"outlined"} color={"default"} />
                                <Chip label="노말" variant={"outlined"} color={"default"} />
                                <Chip label="랭크" variant={"outlined"} color={"default"} />
                                <Chip label="성인만" variant={"outlined"} color={"default"} />
                                <Chip label="여자만" variant={"outlined"} color={"default"} />
                                <Chip label="AI대전" variant={"outlined"} color={"default"} />
                                <Chip label="AI대전" variant={"outlined"} color={"default"} />
                                <Chip label="AI대전" variant={"outlined"} color={"default"} />
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LOLMatchingList