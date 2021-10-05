import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { rankingApi, topicApi } from 'src/apis';
import Loading from 'src/components/common/Loading/Loading';
import { QuestionSvg, TimeSvg } from 'src/components/common/Svg';
import { TopicDetailRanking, TopicDetailsInfo } from 'src/components/Topic';
import { RANKING } from 'src/interfaces';
import { getLocalStorage } from 'src/utils';

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
        <meta lang="UTF-8" />
        <title>Trắc nghiệm Online – Luyện thi Online miễn phí</title>
        <meta
          name="Keywords"
          content="Trắc nghiệm, Đề Thi Học Kỳ, Đề Thi THPT Quốc Gia, Đề Kiểm Tra, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức, đại cương, chuyên nghành, kết thúc học phần ĐHCĐ"
        />
        <meta
          name="Description"
          content="Tuyển tập các đề thi trắc nghiệm THPT QG 2020, ngân hàng câu trắc nghiệm các môn từ lớp 1 đến 12, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức và kết thúc học phần ĐHCĐ"
        />
        <meta
          property="og:title"
          content="Trắc nghiệm Online – Luyện thi Online miễn phí"
        />
        <meta
          property="og:description"
          content="Tuyển tập các đề thi trắc nghiệm THPT QG 2020, ngân hàng câu trắc nghiệm các môn từ lớp 1 đến 12, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức và kết thúc học phần ĐHCĐ"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/nguyenhao/image/upload/v1633446187/Tracnghiem/416613070518cc469509_oftg5t.jpg"
        />
        <meta
          property="og:image:secure_url"
          content={`https://res.cloudinary.com/nguyenhao/image/upload/v1633446187/Tracnghiem/416613070518cc469509_oftg5t.jpg`}
        />
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
            onClick={() => setIsModal(false)}
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
