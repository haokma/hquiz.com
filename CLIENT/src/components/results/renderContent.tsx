import Link from 'next/link';
import { Dispatch } from 'react';
import { History } from 'src/interfaces';
import { formatTime } from 'src/utils';
import { ArrowLeft, ArrowRight, Error, Success, Waring } from '../svg';

interface PROPS {
  history: History;
  setIsModalResult: Dispatch<boolean>;
}

export const RenderContent = (props: PROPS) => {
  const { history, setIsModalResult } = props;
  return (
    <>
      <div className="topic-result-heading">
        <Link href="/">
          <a>
            <ArrowLeft />
            <span>Trang chủ</span>
          </a>
        </Link>
      </div>
      <div className="topic-result-content">
        <div className="result">
          <div className="result-time">
            <span>{formatTime(Math.floor(history.timespan / 60))}</span>
            <span>:</span>
            <span>{formatTime(history.timespan % 60)}</span>
          </div>
          <p className="result-title">Số câu hoàn thành</p>
          <div className="result-total">
            <span>{history.totalComplete}</span>
            <span>/</span>
            <span>{history.questions?.length}</span>
          </div>
          <h5 className="result-slogan">
            Chúc mừng! Bạn đã hoàn thành bài thi!
          </h5>
          <div className="result-table">
            <div className="result-table-item">
              <p>
                <Success />
                <span>{history.totalSuccess} câu</span>
              </p>
              <div className="progress-line">
                <div
                  style={{
                    width: `${(
                      (history?.totalSuccess / history.questions?.length) *
                      100
                    ).toFixed(2)}%`,
                    backgroundColor: 'rgb(0, 168, 107)',
                  }}
                ></div>
              </div>
              <p className="process">
                {(
                  (history.totalSuccess / history.questions?.length) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
            <div className="result-table-item">
              <p>
                <Error />
                <span>{history.totalError} câu</span>
              </p>
              <div className="progress-line">
                <div
                  style={{
                    width: `${
                      (history?.totalError / history.questions?.length) * 100
                    }%`,
                    backgroundColor: 'red',
                  }}
                ></div>
              </div>
              <p className="process">
                {(
                  (history?.totalError / history.questions?.length) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
            <div className="result-table-item">
              <p>
                <Waring />
                <span>{history.totalEmpty} câu</span>
              </p>
              <div className="progress-line">
                <div
                  style={{
                    width: `${
                      (history.totalEmpty / history.questions?.length) * 100
                    }%`,
                    backgroundColor: 'yellow',
                  }}
                ></div>
              </div>
              <p className="process">
                {(
                  (history.totalEmpty / history.questions?.length) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
          <div className="result-toggle" onClick={() => setIsModalResult(true)}>
            <span>Xem kết quả chi tiết</span>
            <ArrowRight />
          </div>
          <div className="result-button">
            <Link href="/de-thi/1">
              <a>Thi lai</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
