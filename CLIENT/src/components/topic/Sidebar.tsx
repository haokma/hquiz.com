import { useState } from 'react';
import dataType from '../../data/topicType.json';

interface PROPS {
  topicType: any;
  setTopicType: any;
}

const Sidebar = (props: PROPS) => {
  const [isSelectedType, setIsSelectedType] = useState(false);

  const { topicType, setTopicType } = props;
  return (
    <div className="sidebar-content">
      <div className="sidebar-search">
        <h4>Tìm kiếm bằng từ khóa</h4>
        <input type="text" placeholder="Tìm kiếm" />
      </div>
      <div className={isSelectedType ? 'sidebar-select active' : 'sidebar-select'}>
        <h4>Chọn loại đề thi</h4>
        <div
          onClick={() => {
            setIsSelectedType(!isSelectedType);
          }}
        >
          <span>{topicType.type ? `${topicType.type}` : 'Chọn loại đề'}</span>
          <span>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
        <ul>
          <li
            onClick={() => {
              setTopicType('');
              setIsSelectedType(false);
            }}
          >
            Chọn loại đề
          </li>
          {dataType.listType.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setIsSelectedType(false);
                setTopicType(item);
              }}
            >
              {item.type}
            </li>
          ))}
        </ul>
      </div>
      {/* <ul className="sidebar-type">
        {dataType.listType
          .filter((item) => item.typeId === topicType._id)
          .map((item, index) => {
            return (
              <li key={item._id}>
                <input type="radio" name={`${item.typeId}`} id={`${index}`} />
                <label htmlFor={`${index}`}>{item.type}</label>
              </li>
            );
          })}
      </ul> */}
      <div className="sidebar-button">
        <button>Tìm đề thi</button>
      </div>
    </div>
  );
};

export default Sidebar;
