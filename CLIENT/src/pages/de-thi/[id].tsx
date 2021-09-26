import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import data from '../../data/topic.json';

const TopicDetails: NextPage = () => {
  const [topic, setTopic] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const index = data.topic.findIndex((item) => item._id === Number(id));
      setTopic(data.topic[index]);
    }
  }, [id]);
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
                <h2 className="topic-details-title">{topic?.title}</h2>
                <img className="topic-details-img" src={topic.image} alt="" />
                <p className="topic-details-desc">
                  20 câu hỏi, bài tập Javascript giúp bạn có thể thử thách bản thân để củng cố, phát
                  triển thêm các nội dung về Javascript. Các câu hỏi sau đây nhằm mục đích thách
                  thức và hướng dẫn. 20 câu hỏi trong đề gồm 5 câu dễ, 5 câu trung bình và 10 câu ở
                  mức khó. Thật tuyệt vời nếu bạn dành thời gian để thực hiện nghiêm túc bài kiểm
                  tra này. Nếu bạn biết chính xác cách trả lời từng câu, điều đó thật tuyệt, nhưng
                  nếu bạn sai một số câu và tìm hiểu lý do tại sao bạn sai, mình cho rằng điều đó
                  thậm chí còn tốt hơn!
                </p>
              </div>
            </div>
            <div className="topic-details-right ">
              <div className="topic-details-info">
                <div className="topic-details-info-heading">
                  <span>Thông tin đề thi</span>
                </div>
                <div className="topic-details-info-content">
                  <p className="topic-details-description">
                    20 câu hỏi, bài tập Javascript giúp bạn có thể thử thách bản thân để củng cố,
                    phát triển thêm các nội dung về Javascript. Các câu hỏi sau đây nhằm mục đích
                    thách thức và hướng dẫn. 20 câu hỏi trong đề gồm 5 câu dễ, 5 câu trung bình và
                    10 câu ở mức khó. Thật tuyệt vời nếu bạn dành thời gian để thực hiện nghiêm túc
                    bài kiểm tra này. Nếu bạn biết chính xác cách trả lời từng câu, điều đó thật
                    tuyệt, nhưng nếu bạn sai một số câu và tìm hiểu lý do tại sao bạn sai, mình cho
                    rằng điều đó thậm chí còn tốt hơn!
                  </p>
                  <div className="topic-info">
                    <div>
                      <span>
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                      </span>
                      <span>20 câu</span>
                    </div>
                    <div>
                      <span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                          <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                        </svg>
                      </span>
                      <span>30:00</span>
                    </div>
                    <div>
                      <span>
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </span>
                      <span>9</span>
                    </div>
                  </div>
                  <div className="topic-details-exam">
                    <Link href={`/attempt/${id}`}>
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
