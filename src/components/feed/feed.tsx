import React from 'react';
import './feed.css';
import Moment from 'react-moment';

const Feed = (props: any) => {
    return (
        <div className="feed-container">
            <div className="logo-bar">
                <div className="news-img">
                    <img src={props.data.urlToImage} alt=""/>
                </div>
                <div className="title">
                    {props.data.title}
                    <div className="publishing-details">
                        <Moment format="Do MMMM YYYY - HH:mm" className="article-date">
                            {props.data.publishedAt}
                        </Moment>
                        <a href={props.data.url} target='_blank'>Link to article</a>
                    </div>
                    <p className="description">{props.data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Feed;