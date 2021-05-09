import { useState, useEffect } from 'react'
import api from '../services/api'


//IMPORT STYLES
import './Carousel.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



type ResponseDATA = {
    id: number,
    title: string,
    thumbnail: {
        path: string;
        extension: string;
    };
}


function Carousel() {


    const [comics, setComics] = useState<ResponseDATA[]>([]);
    const [currentImg, setCurrentImg] = useState(4)


    useEffect(() => {
        api.get('/comics')
            .then((response) => {
                setComics(response.data.data.results)
                console.log(response.data.data.results)
            })
            .catch(err => console.log(err))
    }, []);


    const images = comics.map(comic => comic.thumbnail.path + '.' + comic.thumbnail.extension)
    const title = comics.map(comic => comic.title)
    const identify = comics.map(comic => comic.id)

    return (
        <div className="carousel">


            <div className="carouselInner" style={{ backgroundImage: `url(${images[currentImg]})` }} >
                <div className="left" onClick={() => { currentImg === 0 ? setCurrentImg(images.length - 1) : setCurrentImg(currentImg - 1) }}>
                    <ArrowBackIosIcon />
                </div>
                <div className="center">

                </div>
                <div className="right" onClick={() => { currentImg === images.length - 1 ? setCurrentImg(0) : setCurrentImg(currentImg + 1) }}>
                    <ArrowForwardIosIcon />
                </div>


            </div>
            <div className="titles">
                <a href={`/Comic/${identify[currentImg]}`}>{title[currentImg]}</a >
            </div>
        </div>
    )
}

export default Carousel
