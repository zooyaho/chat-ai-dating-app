import type { JSX } from "react";

interface TitlePropsType {
  mainTitle: string;
  subTitle?: JSX.Element | string;
}

const Title = ({ mainTitle, subTitle }: TitlePropsType) => {
  return (
    <div className="px-2 pt-4">
      <h1 className="text-3xl font-black text-white max-w-3/4">{mainTitle}</h1>
      {subTitle && (
        <span className="block text-sm mt-3 text-white break-keep pr-7">
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default Title;
