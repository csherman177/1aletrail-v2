import React from 'react';
import '../styles/Card.css';

export default function AboutUs () {
    return (
        <div>
            <h1>About Us</h1>
            <div className='form-card'>
                <h5><b>BrewFly</b> is a social database app created by brewflies for brewflies.
                    <br />
                    <br />
                    Credits:{' '}
                        <a href="https://github.com/csherman177" className='text-info'>Courtney</a>
                        {' '}and{' '}
                        <a href="https://github.com/hipster-rufus" className='text-info'>Kali</a>
                    <br />
                    GitHub Repository:{' '}
                        <a href="https://github.com/hipster-rufus/project-3-v2" className='text-info'>Project 3</a>
                </h5>
            </div>  
        </div>
    )
}