const MyHeader = ({headTitle, headLeftChild, headRightChild}) => {
    return (
        <header>
            <div className="head_button_left">{headLeftChild}</div>
            <div className="head_title">{headTitle}</div>
            <div className="head_button_right">{headRightChild}</div>
        </header>
    )
};

export default MyHeader;