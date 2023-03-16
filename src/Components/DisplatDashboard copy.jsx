import { Card } from "antd";
import {
  DeleteFilled,
  SettingOutlined,
  // EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const DisplatDashboard = (props) => {
  const { teamMembers, data } = props;

  return (
    <div>
      <Card
        style={{ width: 200 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined style={{ color: "#7cb305" }} key="edit" />,
          // <EllipsisOutlined key="ellipsis" />,
          <DeleteFilled key="delete" style={{ color: "#f5222d" }} />,
        ]}
      >
        <Meta
          title="Assigned Work"
          description={
            <div>
              {teamMembers.map((member) => (
                <div key={member.id}>
                  <h3>{member.name}</h3>
                  {data.map((project) => {
                    const tasks = project.tasks.filter((task) =>
                      task.members.includes(member.id)
                    );
                    return (
                      <div key={project.id}>
                        {tasks.length > 0 &&
                          tasks.map((task) => (
                            <li key={task.id}>{task.title}</li>
                          ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          }
        ></Meta>
      </Card>
      {/**/}
    </div>
  );
};

export default DisplatDashboard;
