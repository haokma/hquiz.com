import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import rankingApi from 'src/apis/rankingApi';
import topicApi from 'src/apis/topicApi';
import Loading from 'src/components/common/Loading/Loading';
import { QuestionSvg, TimeSvg, ViewSvg } from 'src/components/svg';
import { formatTime } from 'src/utils';

const TopicDetails: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [topic, setTopic] = useState<any>([]);
  const [rankingList, setRankingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRanking = async (topicId: string) => {
    try {
      const res = await rankingApi.getList(topicId);
      const { rankingList } = res.data;

      setRankingList(rankingList);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchTopicSlug = async (slug: string | string[]) => {
      setLoading(true);
      try {
        const res = await topicApi.getBySlug(slug);
        const { topic } = res.data;

        fetchRanking(topic._id);
        setTopic(topic);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (slug) {
      fetchTopicSlug(slug);
    }
  }, [slug]);

  if (loading) {
    return <Loading />;
  }
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
                      <span>{topic.questionCount} câu</span>
                    </div>
                    <div>
                      <TimeSvg />
                      <span>
                        {formatTime(topic.time / 60)}:{formatTime(topic.time % 60)}
                      </span>
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
                  {rankingList.map((item: any, index: number) => (
                    <li key={index}>
                      <span>{item.username}</span>
                      <span>{item.score}đ</span>
                      <span>
                        {formatTime(Math.floor(item.time / 60))}:{formatTime(item.time % 60)}
                      </span>
                    </li>
                  ))}
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
