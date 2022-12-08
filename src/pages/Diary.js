import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/data";
import { emotionList } from "../util/emotion";

const Diary = () => {

    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(()=> {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            )

            if (targetDiary) {
                //일기가 존재할 때
                setData(targetDiary);
            } else {
                //일기가 존재하지 않을 때
                alert("없는 일기입니다.");
                navigate('/', {replace: true});
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return (
            <div className="DiaryPage"></div>
        )
    } else {
        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        )

        return (
            <div className="DiaryPage">
                <MyHeader 
                    headTitle={`${getStringDate(new Date(data.date))}의 기록`}
                    headLeftChild={
                        <MyButton 
                            text={<i className="fa-solid fa-chevron-left"></i>}
                            onClick={() => navigate(-1)}
                        />
                    }
                    headRightChild={
                        <MyButton 
                            text={"수정하기"}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className="diary_icon_wrapper">
                            <div className={["emotion_icon", `emotion_icon_${curEmotionData.emotion_id}`].join(" ")}>
                                <i className={curEmotionData.emotion_class}></i>
                            </div>
                            {/* <div className="emotion_description">
                                {curEmotionData.emotion_description}
                            </div> */}
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}

export default Diary;