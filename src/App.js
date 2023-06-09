import { Button, Card, Input, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import "./App.css";
import CardDetails from "./Components/CardDetails";
import Header from "./Components/Header";

import { v4 as uuidv4 } from "uuid";
import DisplatDashboard from "./Components/DisplatDashboard";

function App() {
  const [data, setData] = useState([]);
  // const [assignCount, setAssignCount] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    tasks: [],
  });
  const [teamMembers, setTeamMembers] = useState([
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

  const [taskAdd, setTaskAdd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstRender, setFirstData] = useState(true);
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

  const handleOk = () => {
    const selectedMembers = teamMembers.filter((ele) => ele.selected);
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
    const result = teamMembers.map((user) => {
      return { ...user, selected: false };
    });
    setTeamMembers(result);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        members: deleteAssign,
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
    const result = teamMembers.map((user) => {
      if (user.id === id) {
        return { ...user, ...{ selected: !user.selected } };
      } else {
        return { ...user };
      }
    });
    setTeamMembers(result);
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

  const handleDeleteFullCard = (mainId) => {
    console.log(mainId);
    const deleteData = newObj.filter((ele) => {
      return ele.id !== mainId;
    });
    setData(deleteData);
  };

  return (
    <>
      <div className="container">
        <Header
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
        />
        <h4>Assign Task </h4>
        {teamMembers.map((ele, i) => {
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

      <DisplatDashboard teamMembers={teamMembers} data={data} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <br />
        {data.map((ele, i) => {
          return (
            <div>
              <CardDetails
                handleDeleteFullCard={handleDeleteFullCard}
                handleDeleteChange={handleDeleteChange}
                handleCheckBox={handleCheckBox}
                mainId={ele.id}
                key={i}
                title={ele.projectName}
                tasks={ele.tasks}
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
