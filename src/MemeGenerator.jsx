import './MemeGenerator.css';
import Button from "./Button";
import NavBar from "./NavBar";
import Input from './Input';
import { useState, useEffect } from 'react';
import lodash from 'lodash';
import * as htmlToImage from 'html-to-image';

export const MemeGenerator = () => {
    const [memes, setMemes] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [textAbove, setTextAbove] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [textBellow, setTextBellow] = useState('');

    useEffect(() => {
        const fetchMemes = async () => {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            const memesData = data.data.memes;
            const memeimages = memesData.map((meme) => meme.url);
            setMemes(memeimages);
        };
        fetchMemes();
    }, []);
    
    const handleGetNewImage = () => {
        const newMemes = lodash.shuffle(memes);
        setMemes(newMemes);
    };

    const handleDownload = async () => {
        const memeImgContainer = document.querySelector('.memeimg');
        const dataUrl = await htmlToImage.toJpeg(memeImgContainer);
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    };

    return (
        <div className="meme-generator">
            <header>
                <NavBar />
            </header>
            <main>
                <div className='input-text'>
                    <Input placeholder='Above...' onChange={(event) => setTextAbove(event.target.value)} />
                    <Input placeholder='Bellow...' onChange={(event) => setTextBellow(event.target.value)} />
                </div>
                <div className='primary-button'>
                    <Button handleClick={handleGetNewImage} text='Get a new meme image  🖼' />
                </div>
                <div className='memeimg'>
                    <img src={memes[0]} alt='' />
                    <div>{textAbove}</div>
                    <div>{textBellow}</div>
                </div>
                <div className='download-button' onClick={handleDownload}>
                    <Button text='Download' />
                </div>
            </main>
        </div>
    );
};