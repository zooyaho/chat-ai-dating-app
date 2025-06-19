import { PulseLoader } from "react-spinners";
import type { initialPartnerInfo } from "../data/initialState";

interface PartnerMessagePropsType {
  message?: string;
  partnerInfo: typeof initialPartnerInfo;
  isLoading?: boolean;
}

const PartnerMessage = ({
  message,
  partnerInfo,
  isLoading,
}: PartnerMessagePropsType) => {
  return (
    <div className="py-4 max-w-3/4 flex">
      <div className="min-w-10 h-10 bg-date-blue-500 rounded-full">
        <img
          src={`./images/${partnerInfo.gender.type}.svg`}
          className="h-[100%] w-[100%]"
          alt={partnerInfo.gender.type}
        />
      </div>
      <div className="pl-3">
        <span className="text-base font-medium">{partnerInfo.name}</span>
        <div className="pt-3 pl-2">
          <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-date-gray-100 rounded-tl-none">
            {isLoading ? (
              <PulseLoader color="#846FFE" size={5} className="inline-block" />
            ) : (
              message
            )}
          </span>
          {/* TODO :: */}
          {/* <span className="block text-right text-date-gray-400 text-xs mt-2 px-2">
            09:25 AM
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default PartnerMessage;
