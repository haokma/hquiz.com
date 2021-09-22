import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/common/Banner';
import PostHightLight from '../components/home/postHighlight';
import TopicHighlight from '../components/home/topicHighlight';
import TopicWork from '../components/home/topicWork';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trắc nghiệm Online – Luyện thi Online miễn phí</title>
      </Head>
      <Banner />
      <div className="home-wrap">
        <TopicWork />
        <TopicHighlight />
        <PostHightLight />
      </div>
    </>
  );
};

export default Home;
