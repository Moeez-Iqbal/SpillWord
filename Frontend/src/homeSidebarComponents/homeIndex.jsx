import React from "react";
import RecentReplies from "./recentReplies";
import Alerts from "./alerts";
import MessageOptimization from "./messageOptimization";
import RecommendProspect from "./recommendProspect";
import Task from "./taskAlert";

function homeIndex({ option }) {
  return (
    <>
      <div>
        {option == "recentReplies" && <RecentReplies />}
        {option == "alerts" && <Alerts />}
        {option == "messageOptimization" && <MessageOptimization />}
        {option == "recommendprospect" && <RecommendProspect />}
        {option == "task" && <Task />}
      </div>
    </>
  );
}

export default homeIndex;
