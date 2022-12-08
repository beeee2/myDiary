import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext,useEffect} from 'react';
import {DiaryDispatchContext} from './../App.js';

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { getStringDate } from "../util/data.js";
import {emotionList} from '../util/emotion.js';


const DiaryEditor = ({isEdit, originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);

    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return
        }

        if (window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }

        navigate('/', {replace:true})
    };

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate('/', {replace: true})
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if(isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader 
                headTitle={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                headLeftChild={
                    <MyButton 
                        text={<i className="fa-solid fa-chevron-left"></i>}
                        onClick={() => navigate(-1)}
                    />
                }
                headRightChild={ isEdit &&
                    <MyButton 
                        text={"삭제하기"}
                        type={"negative"}
                        onClick={handleRemove}
                    />
                }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input-box">
                        <input 
                            className="input-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem 
                                key={it.emotion_id} 
                                {...it} 
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}    
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                       <textarea 
                            placeholder="오늘은 어땠나요"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                       /> 
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton 
                            text={"취소하기"}
                            onClick={() => navigate(-1)}
                        />
                        <MyButton 
                            text={"작성완료"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
};

export default DiaryEditor;