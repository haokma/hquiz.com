import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import topicApi from '../../apis/topicApi';
import QuestionSvg from '../../components/svg/questionSvg';
import TimeSvg from '../../components/svg/time';
import ViewSvg from '../../components/svg/viewSvg';

const TopicDetails: NextPage = () => {
  const [topic, setTopic] = useState<any>([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchTopicSlug = async (slug: string | string[]) => {
      try {
        const res = await topicApi.getBySlug(slug);
        setTopic(res.data.topic);
      } catch (error) {}
    };
    if (slug) {
      fetchTopicSlug(slug);
    }
  }, [slug]);
  return (
    <>
      <Head>
        <title>Đề thi trắc nghiệm THPT Quốc Gia mới nhất</title>
      </Head>
      <div className="topic-details">
        <div className="container m-l-auto">
          <div className="row ">
            <div className="topic-details-left ">
              <div className="topic-details-content">
                <h2 className="topic-details-title">{topic.name}</h2>
                <img className="topic-details-img" src={topic.image} alt="" />
                <p className="topic-details-desc">{topic.description}</p>
              </div>
            </div>
            <div className="topic-details-right ">
              <div className="topic-details-info">
                <div className="topic-details-info-heading">
                  <span>Thông tin đề thi</span>
                </div>
                <div className="topic-details-info-content">
                  <p className="topic-details-description">{topic.description}</p>
                  <div className="topic-info">
                    <div>
                      <QuestionSvg />
                      <span>20 câu</span>
                    </div>
                    <div>
                      <TimeSvg />
                      <span>30:00</span>
                    </div>
                    <div>
                      <ViewSvg />
                      <span>{topic.views}</span>
                    </div>
                  </div>
                  <div className="topic-details-exam">
                    <Link href={`/attempt/${slug}`}>
                      <a>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                        </svg>
                        <span>Bắt đầu thi</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="topic-details-ranking">
                <div>Bảng xếp hạng</div>
                <ul>
                  <li className="head">
                    <span>Tên</span>
                    <span>Điểm thi</span>
                    <span>Thời gian</span>
                  </li>
                  <li>
                    <span>Chi Hao</span>
                    <span>10d</span>
                    <span>15:00</span>
                  </li>
                  <li>
                    <span>Nhu Quynh</span>
                    <span>9.5d</span>
                    <span>15:00</span>
                  </li>
                  <li>
                    <span>Nhu Tuoi</span>
                    <span>9d</span>
                    <span>15:00</span>
                  </li>
                  <li>
                    <span>Thuy Linh</span>
                    <span>9d</span>
                    <span>15:00</span>
                  </li>
                  <li>
                    <span>Phuong Anh</span>
                    <span>8d</span>
                    <span>15:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicDetails;
