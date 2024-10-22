import React from 'react'
// images
import News1 from '../assets/news/news-1.png';

const News = () => {
  return (
    <section className='news-section'>
        <p className="news-title">News</p>

        <div className="news-cont">
            <div className="news">
                <div className="news-contents">
                    <p className="news-heading">
                        The Books You Need to Read in 2023
                    </p>
                    <div className="news-underline"></div>
                    <p className="news-desc">
                    his is the blog we know you've all been waiting for. We present the top 10 titles for 2023 in fiction, non-fiction and children's books; a glorious mix of masterful storytelling, compelling subject matter and page-turning thrills...
                    </p>
                </div>

                <img src={News1} alt="news" />
            </div>

            <div className="news">
                <div className="news-contents">
                    <p className="news-heading">
                        The Books You Need to Read in 2023
                    </p>
                    <div className="news-underline"></div>
                    <p className="news-desc">
                    his is the blog we know you've all been waiting for. We present the top 10 titles for 2023 in fiction, non-fiction and children's books; a glorious mix of masterful storytelling, compelling subject matter and page-turning thrills...
                    </p>
                </div>

                <img src={News1} alt="news" />
            </div>
            
            <div className="news">
                <div className="news-contents">
                    <p className="news-heading">
                        The Books You Need to Read in 2023
                    </p>
                    <div className="news-underline"></div>
                    <p className="news-desc">
                    his is the blog we know you've all been waiting for. We present the top 10 titles for 2023 in fiction, non-fiction and children's books; a glorious mix of masterful storytelling, compelling subject matter and page-turning thrills...
                    </p>
                </div>

                <img src={News1} alt="news" />
            </div>

        </div>
    </section>
  )
}

export default News