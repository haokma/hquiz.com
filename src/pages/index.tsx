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
