import { NextPage } from 'next';
import { useState } from 'react';
import data from '../../data/numberQuestion.json';

const Sidebar: NextPage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [numberQuestion, setNumberQuestion] = useState(0);

  return (
    <div className="sidebar-content">
      <div className="sidebar-search">
        <h4>Tìm kiếm bằng từ khóa</h4>
        <input type="text" placeholder="Tìm kiếm" />
      </div>
      <div className={isSelected ? 'sidebar-select active' : 'sidebar-select'}>
        <h4>Chọn số lượng câu hỏi</h4>
        <div
          onClick={() => {
            setIsSelected(!isSelected);
          }}
        >
          <span>{numberQuestion ? `${numberQuestion} câu` : 'Chọn số lượng'}</span>
          <span>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
        <ul>
          <li
            onClick={() => {
              setNumberQuestion(0);
              setIsSelected(false);
            }}
          >
            Chọn số lượng
          </li>
          {data.numberQuestion.map((number) => (
            <li
              onClick={() => {
                setNumberQuestion(number);
                setIsSelected(false);
              }}
            >
              {number} câu
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
