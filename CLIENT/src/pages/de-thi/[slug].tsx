import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import rankingApi from 'src/apis/rankingApi';
import topicApi from 'src/apis/topicApi';
import Loading from 'src/components/common/Loading/Loading';
import { QuestionSvg, TimeSvg } from 'src/components/svg';
import { TopicDetailRanking, TopicDetailsInfo } from 'src/components/topic';
import { RANKING } from 'src/interfaces';
import { getLocalStorage } from 'src/utils';
import { toast } from 'react-toastify';

const TopicDetails: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [topic, setTopic] = useState<any>([]);
  const [rankingList, setRankingList] = useState<RANKING[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

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
        toast.error('Có lỗi xảy ra!');
        router.push('/');
        setLoading(false);
      }
    };
    if (slug) {
      fetchTopicSlug(slug);
    }
  }, [slug]);

  const startTopic = () => {
    const user = getLocalStorage('user');
    if (!user) {
      router.push('/authentication/login');
      return;
    }
    setIsModal(true);
  };
  const handleAgreed = () => {
    setIsModal(false);
    router.push(`/attempt/${slug}`);
  };

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
              <TopicDetailsInfo
                slug={slug as string}
                topic={topic}
                startTopic={startTopic}
              />
              <TopicDetailRanking rankingList={rankingList} />
            </div>
          </div>
        </div>
        <div className={isModal ? 'modal-confirm active' : 'modal-confirm'}>
          <div
            className="modal-confirm-overlay"
            onClick={() => setIsModal(!false)}
          ></div>
          <div className="modal-confirm-content">
            <div className="modal-confirm-heading">
              <h4>Thông tin</h4>
            </div>
            <div className="modal-confirm-info">
              <h3>{topic.name}</h3>
              <div>
                <p>
                  <QuestionSvg />
                  <span>Số lượng câu hỏi</span>
                </p>
                <p>{topic.questionCount}</p>
              </div>
              <div>
                <p>
                  <TimeSvg />
                  <span>Thời gian</span>
                </p>
                <p>{topic.time / 60} phút</p>
              </div>
            </div>
            <div className="modal-confirm-button">
              <button className="cancle" onClick={() => setIsModal(false)}>
                Hủy
              </button>
              <button className="agreed" onClick={() => handleAgreed()}>
                Thi ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicDetails;
