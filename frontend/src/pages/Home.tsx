import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user-info");
  };

  return (
    <div className="relative w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-[38rem] h-[38rem] sm:w-168 sm:h-168 rounded-full bg-date-pink-500 absolute -z-10 -left-60 -top-56"></i>
      <div className="absolute w-[100%] left-0 top-1/2 transform -translate-y-1/2 -z-10">
        <img className="w-[100%]" src="./images/hero.png" alt="hero" />
      </div>
      <div className="h-full flex flex-col">
        {/* 타이틀 영역 */}
        <Title
          mainTitle="1 Second Before the Date"
          subTitle={
            <>
              Not sure what to say on a first date?
              <br />
              Practice ahead and boost your confidence!
            </>
          }
        />
        {/* <Title
          mainTitle="소개팅 1초전"
          subTitle={
            <>
              소개팅 전, 어떤 얘기를 해야되나 고민되시나요?
              <br />
              미리 연습하고 가보세요!
            </>
          }
        /> */}
        {/* 시작 Button*/}
        <Button text={"Get started"} onClick={handleClick} />
      </div>
    </div>
  );
};

export default Home;
