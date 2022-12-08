import {useNavigate} from 'react-router-dom';
import MyButton from "./MyButton";


const DiaryItem = ({id, emotion, content, date}) => {

    const navigate = useNavigate();
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goDetail = () => {
        navigate(`/diary/${id}`)
    }

    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className="DiaryItem">
            <div 
                onClick={goDetail}
                className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                {/* <img src={ env.PUBLIC_URL + `assets/img/emotion${emotion}.png`} /> */}
                {emotion == 1 ? <i class="fa-regular fa-face-grin-beam"></i> : ""}
                {emotion == 2 ? <i class="fa-regular fa-face-grin"></i> : ""}
                {emotion == 3 ? <i class="fa-regular fa-face-meh"></i> : ""}
                {emotion == 4 ? <i class="fa-regular fa-face-frown-open"></i> : ""}
                {emotion == 5 ? <i class="fa-regular fa-face-angry"></i> : ""}
            </div>
            <div
                onClick={goDetail} 
                className="info_wrapper">
                <div className="diary_date">{strDate}</div>
                <div className="diary_content_preview">
                    {content.slice(0,25)}
                </div>
            </div>
            <div className="btn_wrapper">
                <MyButton 
                    text={"수정하기"}
                    onClick={goEdit}
                />
            </div>
        </div>
    )
};

export default DiaryItem;