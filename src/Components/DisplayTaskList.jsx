// import { Button } from "antd";

import { Card } from "antd";

const DisplayTaskList = (props) => {
  const { cardDetailsById } = props;
  return (
    <Card>
      {cardDetailsById.tasks.map((ele) => {
        return (
          <li key={ele.id}>
            {ele.completed ? <s>{ele.title}</s> : <span>{ele.title}</span>}
          </li>
        );
      })}
    </Card>
  );
};

export default DisplayTaskList;
