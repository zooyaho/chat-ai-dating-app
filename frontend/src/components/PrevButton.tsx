import { useNavigate } from "react-router-dom";

interface PrevButtonPropsType {
  path?: string;
}

const PrevButton = ({ path }: PrevButtonPropsType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path); // 명시 경로 이동
    } else {
      navigate(-1); // 뒤로가기
    }
  };

  return (
    <button
      type="button"
      className="text-none absolute top-6 left-4 px-4 py-2"
      onClick={handleClick}
    >
      <img src="./images/arrow-prev.svg" alt="뒤로가기" className="block" />
      뒤로가기
    </button>
  );
};

export default PrevButton;
