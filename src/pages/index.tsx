import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { topicApi } from 'src/apis';
import Banner from 'src/components/common/Layout/Banner';
import PostHightLight from 'src/components/Home/PostHighlight';
import TopicHighlight from 'src/components/Home/TopicHighlight';
import TopicWork from 'src/components/Home/TopicWork';
import { TOPIC } from 'src/interfaces';

interface PROPS {
  topicList: TOPIC[];
}

const Home: NextPage<any> = (props: PROPS) => {
  const { topicList } = props;
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
        <meta
          property="og:image"
          content="https://s.tracnghiem.net/assets/images/fb-trac-nghiem.jpg"
        />
      </Head>
      <Banner />
      <div className="home-wrap">
        <TopicWork />
        <TopicHighlight topicList={topicList} />
        <PostHightLight />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await topicApi.getList({
    limit: 10,
    page: 1,
  });
  const { topicList } = res.data;
  return {
    props: {
      topicList,
    },
  };
};

export default Home;
