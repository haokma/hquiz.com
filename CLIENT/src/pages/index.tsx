import type { NextPage } from 'next';
import Banner from '../components/common/Banner';
import TopicHighlight from '../components/home/topicHighlight';

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <div className="home-wrap">
        <TopicHighlight />
      </div>
    </>
  );
};

export default Home;
