import { Button, Card, Input, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import "./App.css";
import CardDetails from "./Components/CardDetails";
import Header from "./Components/Header";
import {
  DeleteFilled,
  SettingOutlined,
  // EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);
  const [assignCount, setAssignCount] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    tasks: [],
  });

  const [assign, setAssign] = useState([
    {
      id: 1001,
      name: "Srujan",
      selected: false,
    },
    {
      id: 1005,
      name: "Vittal",
      selected: false,
    },
    {
      id: 1010,
      name: "Sushiledra",
      selected: false,
    },
    {
      id: 1015,
      name: "Shridhar",
      selected: false,
    },
  ]);

  //const [projectName, setProjectName] = useState("");
  const [taskAdd, setTaskAdd] = useState("");
  const [addExtraTask, setAddExtraTasks] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstRender, setFirstData] = useState(true);
  const [isCardModalOpen, setCardIsModalOpen] = useState(false);
  // const [cardDetailsById, setCardDetailsById] = useState({});
  const newObj = JSON.parse(JSON.stringify(data));

  useEffect(() => {
    firstRender
      ? setData(JSON.parse(localStorage.getItem("data")) || [])
      : localStorage.setItem("data", JSON.stringify(data));
    handleTaskDetailsGet();

    setFirstData(false);
  }, [data, firstRender]);

  useEffect(() => {
    const localstorageData = localStorage.getItem("formDataTasks");
    if (localstorageData) {
      setFormData(JSON.parse(localstorageData));
    }
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
    // setTaskAdd("");
    const assignUsers = assign.filter((ele) => {
      return ele.selected;
    });

    const resultData = assign.map((ele) => {
      if (ele.selected) return ele.id;
    });

    console.log("list of argument", resultData);

    if (taskAdd) {
      const newObj = {
        ...formData,
        id: uuidv4(),
        projectName: formData.projectName,
        tasks: [
          ...formData.tasks,
          {
            id: uuidv4(),
            title: taskAdd,
            completed: false,
            assignTasks: assignUsers,
          },
        ],
      };
      setFormData(newObj);
    }
    setTaskAdd("");
    const result = assign.map((user) => {
      return { ...user, selected: false };
    });
    // console.log("result", result);
    setAssign(result);
    handleTestData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handleCardOk = () => {
  //   setCardIsModalOpen(false);
  // };

  // const handleCardCancel = () => {
  //   setCardIsModalOpen(false);
  // };

  /* const handleBlueChange = (e) => {
    if (taskAdd) {
      const newObj = {
        ...formData,
        id: uuidv4(),
        projectName: formData.projectName,
        tasks: [
          ...formData.tasks,
          { id: uuidv4(), title: taskAdd, completed: false },
        ],
      };
      setFormData(newObj);
    }
    setTaskAdd("");
    setIsModalOpen(false);
  };
   */

  const handleClickdelete = (id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      const deleteResult = formData.tasks.filter((task) => {
        return task.id !== id;
      });
      const deleteAssign = formData.tasks.filter((task) => {
        return task.id !== id;
      });
      const newObj = {
        ...formData,
        projectName: formData.projectName,
        tasks: deleteResult,
        assignTasks: deleteAssign,
      };
      setFormData(newObj);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      projectName: e.target.value,
    });
  };

  const handleSubmitClick = () => {
    if (formData.tasks.length !== 0 && formData.projectName !== "") {
      const newObj = {
        ...formData,
        projectName: formData.projectName,
      };
      const newData = [...data, newObj];
      setData(newData);
      setFormData({ projectName: "", tasks: [] });
      //
    } else if (formData.projectName === "") {
      alert("Please enter Project Name");
    } else if (formData.tasks.length === 0) {
      alert("Please enter tasks");
    }
    handleTestData();
  };

  const handleClickCard = (mainId) => {
    setCardIsModalOpen(!isCardModalOpen);

    if (addExtraTask) {
      const addDetaisl = newObj.find((ele) => {
        return ele.id === mainId;
      });

      const addTasks = addDetaisl.tasks.map((ele) => {
        return { ...ele };
      });

      console.log("addTasks", addDetaisl);

      addTasks.push({
        id: uuidv4(),
        title: addExtraTask,
        completed: false,
        assignTasks: [],
      });

      addDetaisl.tasks = addTasks;
      setData(newObj);
      setAddExtraTasks("");
    }
    handleTestData();
  };

  const handleDeleteChange = (id, mainId) => {
    console.log(id);
    const newPara = newObj.find((ele) => {
      return ele.id === mainId;
    });

    const deleteTasks = newPara.tasks.filter((ele) => {
      return ele.id !== id;
    });

    newPara.tasks = deleteTasks;
    setData(newObj);
  };

  const handleIsChange = (id) => {
    // alert(id);
    const result = assign.map((user) => {
      if (user.id === id) {
        return { ...user, ...{ selected: !user.selected } };
      } else {
        return { ...user };
      }
    });
    setAssign(result);
  };
  const handleBtnAddProjectClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckBox = (id, mainId) => {
    const newData = JSON.parse(JSON.stringify(data));

    const project = newData.find((ele) => {
      return ele.id === mainId;
    });

    const updatedTasks = project.tasks.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          completed: !ele.completed,
        };
      } else {
        return { ...ele };
      }
    });

    // const updateAssignTasks = newObj.assignTasks.map((ele) => {
    //   return ele;
    // });
    //console.log(updatedTasks);

    project.tasks = updatedTasks;

    setData(newData);
  };

  // const handleChangeAssign = (SibId, ChidId, mainId) => {
  //   console.log("slibing", SibId);
  //   console.log("ChidId", ChidId);
  //   console.log("mainId", mainId);
  //   // const result = newObj.find((ele) => {
  //   //   return ele.id === mainId;
  //   // });

  //   // const childObj = result.tasks.find((ele) => {
  //   //   return ele.id === ChidId;
  //   // });

  //   // const sibObj = childObj.assignTasks.map((ele) => {
  //   //   //console.log(ele.id === SibId);
  //   //   if (ele.id === SibId) {
  //   //     return { ...ele, selected: !ele.completed };
  //   //   } else {
  //   //     return { ...ele };
  //   //   }
  //   // });
  //   // result.tasks = childObj;
  //   // childObj.assignTasks = sibObj;

  //   // setData(newObj);
  // };

  const handleTestData = () => {
    console.log("clicked");
    const newObject = {};
    newObj.map((ele) => {
      return ele.tasks.map((ele) => {
        return ele.assignTasks.map((Ele) => {
          if (Ele.selected) {
            // console.log(Ele.name, ele.title);
            if (Ele.name in newObject) {
              newObject[Ele.name] += 1;
            } else {
              newObject[Ele.name] = 1;
            }
          }
        });
      });
    });

    setAssignCount(newObject);
    console.log("resultData", newObject);
  };

  const handleDeleteFullCard = (mainId) => {
    console.log(mainId);
    const deleteData = newObj.filter((ele) => {
      return ele.id !== mainId;
    });
    setData(deleteData);
  };

  const handleTaskDetailsGet = () => {
    const newObje = JSON.parse(JSON.stringify(data));
    newObj.map((ele) => {
      return ele.tasks.map((ele) => {
        return ele.assignTasks.filter((Ele) => {
          if (Ele.selected) {
            console.log(Ele.name, ele.title);
          }
        });
      });
    });
  };

  return (
    <>
      <div className="container">
        <Header
          // handleTestData={handleTestData}
          assign={assign}
          handleChange={handleChange}
          setFormDat={setFormData}
          formData={formData}
          handleBtnAddProjectClick={handleBtnAddProjectClick}
        />
      </div>
      <br />
      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          value={taskAdd}
          placeholder="Enter Task"
          onChange={(e) => {
            setTaskAdd(e.target.value);
          }}
          // onBlur={handleBlueChange}
        />
        <h4>Assign Task </h4>
        {assign.map((ele) => {
          return (
            <div key={ele.id}>
              <input
                type="checkbox"
                checked={ele.selected}
                onChange={() => {
                  handleIsChange(ele.id);
                }}
              />
              {ele.name}
            </div>
          );
        })}
      </Modal>
      <br />
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
          title="Assign Work"
          description={Object.keys(assignCount).map((ele, i) => (
            <div key={i}>
              <h3>
                {ele} - {assignCount[ele]}
              </h3>
            </div>
          ))}
        />
      </Card>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          gap: "15px",
        }}
      >
        {formData.tasks.map((task, i) => {
          return (
            <Row key={i}>
              <Card
                style={{ width: 300 }}
                key={i}
                onClick={() => {
                  handleClickdelete(task.id);
                }}
              >
                <Meta title={task.title} />
                {task.assignTasks.map((ele) => {
                  return <li key={ele.id}>{ele.name}</li>;
                })}
              </Card>
            </Row>
          );
        })}
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "col",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button type="primary" danger onClick={handleSubmitClick}>
          Submit
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {data.map((ele, i) => {
          return (
            <CardDetails
              // handleChangeAssign={handleChangeAssign}

              handleDeleteFullCard={handleDeleteFullCard}
              setAddExtraTasks={setAddExtraTasks}
              handleDeleteChange={handleDeleteChange}
              handleCheckBox={handleCheckBox}
              mainId={ele.id}
              key={i}
              title={ele.projectName}
              tasks={ele.tasks}
              handleClickCard={handleClickCard}
            />
          );
        })}
      </div>
      <br />
    </>
  );
}

export default App;
