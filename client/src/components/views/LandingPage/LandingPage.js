import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    axios
      .get("/api/users/logout", {
        withCredentials: true, // 쿠키를 포함하여 요청
      })
      .then((response) => {
        if (response.data.success) {
          console.log("로그아웃 성공");
          // 로그아웃 성공 시 로그인 페이지로 이동
          navigate("/login");
        } else {
          alert("로그아웃에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error("로그아웃 에러:", err);
        alert("로그아웃 중 오류가 발생했습니다.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <button onClick={onLogoutClick}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
