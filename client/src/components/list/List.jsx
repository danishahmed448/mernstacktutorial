import { useRef,useState } from "react";
import "./list.scss";
import ListItem from '../listItem/ListItem';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";

const List = ({list,search}) => {
    
    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const [clicklimit, setclicklimit] = useState(window.innerWidth/230)
    const listRef = useRef();
    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x-50;
        if (direction === "left" && slideNumber>0) {
            setSlideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${230+distance}px)`;
        }
        if (direction === "right" && slideNumber<list?.content.length-clicklimit) {
            setSlideNumber(slideNumber+1);
            listRef.current.style.transform = `translateX(${-230+distance}px)`;
        }
    }
    if(search){
        return (
            <div className="list">
                <div className="wrapper">
                <span className="listTitle">{list.title}</span>
                    <div className="container_search" ref={listRef}>
                        {list.content.map((item,i)=><ListItem key={i} index={i} item={item} search/>)}
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="list">
                <div className="wrapper">
                <span className="listTitle">{list.title}</span>
                    <ArrowBackIosOutlined
                        className="sliderArrow left"
                        onClick={() => handleClick("left")}
                        style={{display:!isMoved&&"none"}}
                    />
                    <div className="container" ref={listRef}>
                        {list.content.map((item,i)=><ListItem key={i} index={i} item={item}/>)}
                    </div>
                    <ArrowForwardIosOutlined
                        className="sliderArrow right"
                        onClick={() => handleClick("right")}
                    />
                </div>
            </div>
        )
    }
    
}

export default List     