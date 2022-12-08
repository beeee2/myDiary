import { useNavigate } from "react-router-dom";
import {useRef, useState, useContext,useEffect} from 'react';
import {DiaryDispatchContext} from './../App.js';

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

//                 {emotion == 1 ? <i className="fa-regular fa-face-grin-beam"></i> : ""}
//                 {emotion == 2 ? <i className="fa-regular fa-face-grin"></i> : ""}
//                 {emotion == 3 ? <i className="fa-regular fa-face-meh"></i> : ""}
//                 {emotion == 4 ? <i className="fa-regular fa-face-frown-open"></i> : ""}
//                 {emotion == 5 ? <i className="fa-regular fa-face-angry"></i> : ""}

const emotionList = [
    {
        emotion_id: 1,
        emotion_class: `fa-regular fa-face-grin-beam`,
        emotion_description:'완전 좋음'
    },
    {
        emotion_id: 2,
        emotion_class: 'fa-regular fa-face-grin',
        emotion_description:'좋음'
    },
    {
        emotion_id: 3,
        emotion_class: "fa-regular fa-face-meh",
        emotion_description:'보통'
    },
    {
        emotion_id: 4,
        emotion_class: 'fa-regular fa-face-frown-open',
        emotion_description:'나쁨'
    },
    {
        emotion_id: 5,
        emotion_class: 'fa-regular fa-face-angry',
        emotion_description:'완전 나쁨'
    }
]

const getStringDate = (date) => { 
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

const DiaryEditor = ({isEdit, originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit} = useContext(DiaryDispatchContext);

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

        onCreate(date, content, emotion);
        navigate('/', {replace:true})
    }

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