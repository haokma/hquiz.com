const TopicItemSkeletion = () => {
  return (
    <div className="topic-skeletion">
      <div className="topic-skeletion-left">
        <div className=" skeleton topic-skeletion-img"></div>
      </div>
      <div className="topic-skeletion-right">
        <h2 className="skeleton topic-skeletion-title"></h2>
        <p className="skeleton topic-skeletion-desc"></p>
      </div>
    </div>
  );
};

export default TopicItemSkeletion;
