import { Card, Input } from "antd";
import {
  DeleteFilled,
  SettingOutlined,
  // EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
const CardDetails = (props) => {
  const {
    title,
    tasks,
    mainId,
    handleDeleteChange,
    handleCheckBox,
    isCardModalOpen,
    setAddExtraTasks,
    addExtraTask,
    handleDeleteFullCard,
  } = props;
  return (
    <div style={{ margin: "20px", marginLeft: "50px" }}>
      <Card
        title={title}
        bordered={false}
        style={{ width: 200 }}
        actions={[
          // <SettingOutlined key="setting" />,
          <EditOutlined style={{ color: "#7cb305" }} key="edit" />,
          // <EllipsisOutlined key="ellipsis" />,
          <DeleteFilled
            key="delete"
            style={{ color: "#f5222d" }}
            onClick={() => {
              handleDeleteFullCard(mainId);
            }}
          />,
        ]}
      >
        {tasks.map((Taskses, i) => {
          return (
            <span key={i}>
              {
                <Card
                  style={{ width: 200 }}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined style={{ color: "#7cb305" }} key="edit" />,
                    <DeleteFilled
                      key="delete"
                      style={{ color: "#f5222d" }}
                      onClick={() => {
                        handleDeleteChange(Taskses.id, mainId);
                      }}
                    />,
                  ]}
                >
                  <Meta
                    key={i}
                    title={
                      <div>
                        <input
                          type="checkbox"
                          checked={Taskses.completed}
                          onChange={() => {
                            handleCheckBox(Taskses.id, mainId);
                          }}
                        />
                        {Taskses.completed ? (
                          <s>{Taskses.title}</s>
                        ) : (
                          <span> {Taskses.title} </span>
                        )}
                      </div>
                    }
                    description={Taskses.members.map((Ele, i) => {
                      return (
                        <div key={i}>
                          <p>{Ele}</p>
                        </div>
                      );
                    })}
                  />
                </Card>
              }
            </span>
          );
        })}

        {isCardModalOpen && (
          <Input
            type="text"
            value={addExtraTask}
            placeholder="Enter Task"
            onChange={(e) => {
              setAddExtraTasks(e.target.value);
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default CardDetails;
