import {useState, useContext, useEffect} from 'react';
import { DiaryStateContext } from '../App';

//Components
import MyButton from '../components/MyButton';
import MyHeader from './../components/MyHeader';
import DiaryList from './../components/DiaryList';

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headTitle = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
 
    useEffect(()=> {
        if ( diaryList.length >= 1 ) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime();
    
            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        }
    }, [diaryList, curDate])


    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
    }

    return (
        <div>
            <MyHeader 
                headTitle={headTitle}
                headLeftChild={
                    <MyButton 
                        text={<i className="fa-solid fa-chevron-left"></i>}
                        onClick={decreaseMonth}
                    />
                }
                headRightChild={
                    <MyButton 
                        text={<i className="fa-solid fa-chevron-right"></i>}
                        onClick={increaseMonth}
                    />
                }
            />
            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home;