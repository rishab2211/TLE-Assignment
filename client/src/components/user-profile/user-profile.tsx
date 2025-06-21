import ContestHistory from "./contest-history";
import ProblemSolvingData from "./problem-solving-data";

type Props = {};

const UserProfileIndex = (props: Props) => {
  return (
    <div>
      <ContestHistory  />
      <ProblemSolvingData/>
    </div>
  );
};

export default UserProfileIndex;
