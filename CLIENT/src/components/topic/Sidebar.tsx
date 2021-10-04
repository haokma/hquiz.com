import { Dispatch, useState } from 'react';
import { CATEGORY, FILTERCATEGORY, TOPICTYPE } from 'src/interfaces/category';

interface SIDEBARPROPS {
  filter: FILTERCATEGORY;
  setFilter: Dispatch<any>;
  categories: CATEGORY[];
  topicType: TOPICTYPE;
  setTopicType: Dispatch<any>;
}

const Sidebar = (props: SIDEBARPROPS) => {
  const [isSelectedType, setIsSelectedType] = useState(false);

  const { setFilter, categories, setTopicType, topicType } = props;
  return (
    <div className="sidebar-content">
      <div className="sidebar-search">
        <h4>Tìm kiếm bằng từ khóa</h4>
        <input type="text" placeholder="Tìm kiếm" />
      </div>
      <div
        className={isSelectedType ? 'sidebar-select active' : 'sidebar-select'}
      >
        <h4>Chọn loại đề thi</h4>
        <div
          onClick={() => {
            setIsSelectedType(!isSelectedType);
          }}
        >
          <span>{topicType?.name ? `${topicType?.name}` : 'Chọn loại đề'}</span>
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
              setFilter((prev: FILTERCATEGORY) => ({
                ...prev,
                categoryId: '',
                page: 1,
              }));
              setTopicType((prev: TOPICTYPE) => ({
                ...prev,
                _id: '',
                name: '',
              }));
              setIsSelectedType(false);
            }}
          >
            Chọn loại đề
          </li>
          {categories.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => {
                setIsSelectedType(false);
                setTopicType(item);
                setFilter((prev: FILTERCATEGORY) => ({
                  ...prev,
                  categoryId: item._id,
                  page: 1,
                }));
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-button">
        <button>Tìm đề thi</button>
      </div>
    </div>
  );
};

export default Sidebar;
