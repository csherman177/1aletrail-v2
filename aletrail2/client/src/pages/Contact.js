import React from 'react';
import '../styles/Card.css';

export default function Contact () {
    return (
        <div>
            <h1>Contact</h1>
            <h5>
                Questions? Comments? Suggestions? <br />
                Please enter and submit your information below. 
                We should be able to return your queries within 1-2 business days.
            </h5>
            <div className='form-card'>
                <form>
                    <div className='form-item row'>
                        <input 
                            className='form-input'
                            placeholder='Name' 
                            required
                        ></input>
                    </div>
                    <div className='form-item row'>
                        <input 
                            className='form-input' 
                            placeholder='Email' 
                            required
                        ></input>
                    </div>
                    <div className='form-item row'>
                        <textarea 
                            className='form-textarea' 
                            placeholder='Message' 
                            required
                        ></textarea>
                    </div>
                    <button className='form-btn'>Submit</button>
                </form>
            </div>            
        </div>

    )
}