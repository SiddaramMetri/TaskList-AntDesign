import { Card } from "antd";
// import {
//   DeleteFilled,
//   SettingOutlined,
//   // EllipsisOutlined,
//   EditOutlined,
// } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const DisplatDashboard = (props) => {
  const { teamMembers, data } = props;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "4%",
        marginTop: "20px",
      }}
    >
      {teamMembers.map((member) => (
        <div key={member.id}>
          <div>
            <Card style={{ width: 250 }}>
              <Meta
                title={`${member.name} Assigned Task `}
                description={
                  <div>
                    {data.map((project) => {
                      const tasks = project.tasks.filter((task) =>
                        task.members.includes(member.id)
                      );
                      return (
                        tasks.length > 0 && (
                          <div key={project.id}>
                            <ul>
                              <b> {project.projectName}</b>
                              {tasks.map((task) => (
                                <li key={task.id}>{task.title}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      );
                    })}
                  </div>
                }
              />
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplatDashboard;
