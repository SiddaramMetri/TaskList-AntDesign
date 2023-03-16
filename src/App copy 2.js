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
import DisplatDashboard from "./Components/DisplatDashboard";

function App() {
  const [data, setData] = useState([]);
  // const [assignCount, setAssignCount] = useState([]);
  const [memberTasks, setMemberTasks] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    tasks: [],
  });
  const [members, setMembers] = useState([
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
  // const [isCardModalOpen, setCardIsModalOpen] = useState(false);
  // const [cardDetailsById, setCardDetailsById] = useState({});
  const newObj = JSON.parse(JSON.stringify(data));

  useEffect(() => {
    firstRender
      ? setData(JSON.parse(localStorage.getItem("data")) || [])
      : localStorage.setItem("data", JSON.stringify(data));
    setFirstData(false);
  }, [data, firstRender]);

  useEffect(() => {
    const localstorageData = localStorage.getItem("formDataTasks");
    if (localstorageData) {
      setFormData(JSON.parse(localstorageData));
    }
  }, []);

  useEffect(() => {
    handleTaskDetailsGet();
  }, []);

  const handleOk = () => {
    // setTaskAdd("");
    // const assignUsers = members.filter((ele) => {
    //   return ele.selected;
    // });

    const selectedMembers = members.filter((ele) => ele.selected);
    const membersId = selectedMembers.map((ele) => ele.id);

    console.log("list of argument", membersId);

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
            members: membersId,
          },
        ],
      };
      setFormData(newObj);
    }
    setTaskAdd("");
    const result = members.map((user) => {
      return { ...user, selected: false };
    });
    // console.log("result", result);
    setMembers(result);
    handleTestData();
    setIsModalOpen(false);
    TasksMemberById();
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
    // TasksMemberById();
  };

  // unused  the function -> we will after
  const handleClickCard = (mainId) => {
    // setCardIsModalOpen(!isCardModalOpen);
    // if (addExtraTask) {
    //   const addDetaisl = newObj.find((ele) => {
    //     return ele.id === mainId;
    //   });
    //   const addTasks = addDetaisl.tasks.map((ele) => {
    //     return { ...ele };
    //   });
    //   console.log("addTasks", addDetaisl);
    //   addTasks.push({
    //     id: uuidv4(),
    //     title: addExtraTask,
    //     completed: false,
    //     members: [],
    //   });
    //   addDetaisl.tasks = addTasks;
    //   setData(newObj);
    //   setAddExtraTasks("");
    // }
    // handleTestData();
  };

  // its delete the card tasks by card id and main id
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

  // its update the member is complete or incomplete
  const handleIsChange = (id) => {
    // alert(id);
    const result = members.map((user) => {
      if (user.id === id) {
        return { ...user, ...{ selected: !user.selected } };
      } else {
        return { ...user };
      }
    });
    setMembers(result);
  };

  // when button Click its open and closr form Header
  const handleBtnAddProjectClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Check Box Update
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
    // console.log("clicked");
    // const newObject = {};
    // newObj.forEach((ele) => {
    //   ele.tasks.forEach((task) => {
    //     task.members.forEach((ele) => {
    //       if (ele.id in newObject) {
    //         newObject[ele.id] += 1;
    //       } else {
    //         newObject[ele.id] = 1;
    //       }
    //     });
    //   });
    // });
    // setAssignCount(newObject);
    console.log("result Data hanlde Test Data");
  };

  const handleDeleteFullCard = (mainId) => {
    console.log(mainId);
    const deleteData = newObj.filter((ele) => {
      return ele.id !== mainId;
    });
    setData(deleteData);
  };

  const handleTaskDetailsGet = () => {
    // const newObje = JSON.parse(JSON.stringify(data));
    // const membersTask = {};
    // newObje.map((ele) => {
    //   return ele.tasks.map((ele) => {
    //     return ele.assignTasks.filter((Ele) => {
    //       if (Ele.selected) {
    //         if (Ele.id in membersTask) {
    //           membersTask[Ele.id] += ele.title;
    //         } else {
    //           membersTask[Ele.id] = ele.title;
    //         }
    //       }
    //     });
    //   });
    // });
    // console.log("membersTask", membersTask);
    // const membersTaskCount = {};
    // const newObje = JSON.parse(JSON.stringify(data));
    // newObje.forEach((ele) => {
    //   ele.tasks.forEach((ele) => {
    //     ele.assignTasks.forEach((Ele) => {
    //       if (Ele.selected) {
    //         if (!membersTaskCount[Ele.name]) {
    //           membersTaskCount[Ele.name] = [];
    //         }
    //         membersTaskCount[Ele.name].push(ele.title);
    //       }
    //     });
    //   });
    // });
    // setMemberTasks(membersTaskCount);
    // console.log("membersTaskCount", membersTaskCount);
  };
  // to get perticulat data
  const TasksMemberById = (id) => {
    console.log("membersid", id);
    // we will get the all data
    const newObj = JSON.parse(JSON.stringify(data));
    const tasks = [];
    newObj.forEach((Ele) => {
      return Ele.tasks.filter((task) => {
        // cheking is id their or not using includes
        if (task.members.includes(id)) {
          // we are find  by the id
          const member = members.find((ele) => {
            return ele.id === id;
          });
          // pushing the data to the tasks array
          tasks.push({
            name: member.name,
            task: task.title,
          });
        }
      });
    });
    //console.log("inside the tasks member by id ", tasks);
    setMemberTasks(tasks);
    // return tasks;
  };

  useEffect(() => {
    const ids = members.map((ele) => ele.id);
    // // console.log("ids", ids);
    // // on filter data we have to map over the data
    const result = ids.map((ele) => TasksMemberById(ele));
    console.log("finals Result", result);
    // setMemberTasks(result);
  }, []);
  return (
    <>
      <div className="container">
        {console.log("memberTasks", memberTasks)}
        <Header
          // handleTestData={handleTestData}
          assign={members}
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
        {members.map((ele, i) => {
          return (
            <div key={i}>
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
                <Meta title={task.title} key={i} />
                {task.members.map((ele) => {
                  return <li key={ele}>{ele}</li>;
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
        <DisplatDashboard memberTasks={memberTasks} />
        <br />
        {data.map((ele, i) => {
          return (
            <div>
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
              <br />
            </div>
          );
        })}
      </div>
      <br />
    </>
  );
}

export default App;
