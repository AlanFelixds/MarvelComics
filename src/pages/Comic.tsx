import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import api from '../services/api'

//IMPORT STYLES
import './Comic.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



type ComicDATA = {
    id: number,
    title: string,
    description: string,
    characters: {
        items: [{
            resourceURI: string,
            name: string,
        }]
    }
}

type charDATA = {
    id: number,
    name: string,
    thumbnail: {
        path: string;
        extension: string;
    };
}

type ParamType = {
    index: string,
}



function Comic() {

    let { index } = useParams<ParamType>();
    const [comicDetail, setComicDetail] = useState<ComicDATA[]>([]);
    const [char, setChar] = useState<charDATA[]>([])

    const [currentImg, setCurrentImg] = useState(0)


    let numID = Number(index)
    useEffect(() => {
        api.get(`/comics/${numID}`).then((response) => { setComicDetail(response.data.data.results) });
        api.get(`/comics/${numID}/characters`).then((response) => { setChar(response.data.data.results) });
    }, []);


    const images = char.map(char => char.thumbnail.path + '.' + char.thumbnail.extension)

    return (
        <div className="containerDescription">

            <div className="descriptionComic">

                <div className="charactersInside">
                    <h1>Characters in comic</h1>
                    <ul>

                        {comicDetail.map((comic, index) =>
                            <div key={index}>
                                {comic.characters.items.map((nome, index) => <li key={index}>{nome.name}</li>)}
                            </div>
                        )}
                    </ul>

                </div>
                <div className="descriptionInside">
                    <h1>Description Comic</h1>
                    <p>{comicDetail.map(detail => detail.description)}</p>
                </div>



            </div>
            <div className="descriptionCharactere">
                <h1>Characters</h1>
                <div className="charThumb" style={{ backgroundImage: `url(${images[currentImg]})` }} >

                    <div className="left" onClick={() => { currentImg === 0 ? setCurrentImg(images.length - 1) : setCurrentImg(currentImg - 1) }}>
                        <ArrowBackIosIcon />
                    </div>
                    <div className="center">

                    </div>
                    <div className="right" onClick={() => { currentImg === images.length - 1 ? setCurrentImg(0) : setCurrentImg(currentImg + 1) }}>
                        <ArrowForwardIosIcon />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Comic
