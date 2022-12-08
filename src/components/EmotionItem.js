const EmotionItem = ({
    emotion_id, 
    emotion_class, 
    emotion_description, 
    onClick,
    isSelected,
}) => {
    return (
        <div 
            onClick={()=> onClick(emotion_id)} 
            className={["EmotionItem",
                isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`
            ].join(" ")}>
            <div className={[`icon_box`, `icon_box_${emotion_id}`].join(" ")}>
                <i className={emotion_class}></i>
            </div>
            <span>{emotion_description}</span>
        </div>
    )
};

export default EmotionItem;