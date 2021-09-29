import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import topicApi from '../apis/topicApi';
import Banner from '../components/common/Banner';
import PostHightLight from '../components/home/postHighlight';
import TopicHighlight from '../components/home/topicHighlight';
import TopicWork from '../components/home/topicWork';
import { Topic } from '../interfaces';

interface PROPS {
  topicList: Topic[];
}

const Home: NextPage<any> = (props: PROPS) => {
  const { topicList } = props;
  return (
    <>
      <Head>
        <title>Trắc nghiệm Online – Luyện thi Online miễn phí</title>
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

export const getStaticProps: GetStaticProps = async (context) => {
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

export default Home;
