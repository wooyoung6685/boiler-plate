import React, { useEffect, useState } from "react";
import axios from "axios";

function LandindPage() {
  const [count, setCount] = useState();

  const onPlusClick = () => {
    setCount(count + 1);
  };

  const onMinusClick = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onPlusClick}>증가</button>
      <button onClick={onMinusClick}>감소</button>
    </div>
  );
}

export default LandindPage;
