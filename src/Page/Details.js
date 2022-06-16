import * as React from 'react';
import { useParams } from 'react-router-dom';
const Details = () => {
  let params = useParams();
  return (
    <div>
      <h3>안녕하세요. 랭킹 페이지 입니다.</h3>
      <h2>{params.id}</h2>
    </div>
  );
};

export default Details;