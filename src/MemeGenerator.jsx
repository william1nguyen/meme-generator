import './MemeGenerator.css';
import Button from "./Button";
import NavBar from "./NavBar";
import Input from './Input';
import { useState, useEffect } from 'react';
import lodash from 'lodash';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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
        const element = document.querySelector('.memeimg');
        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL('image/jpeg');
        saveAs(dataURL, 'downloaded-image.jpg');
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