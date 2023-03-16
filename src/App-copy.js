import { Button, Card, Input, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import "./App.css";
import CardDetails from "./Components/CardDetails";
import Header from "./Components/Header";
function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ projectName: "", tasks: [] });
  const [projectName, setProjectName] = useState("");
  const [taskAdd, setTaskAdd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstRender, setFirstData] = useState(true);

  useEffect(() => {
    firstRender
      ? setData(JSON.parse(localStorage.getItem("data")) || [])
      : localStorage.setItem("data", JSON.stringify(data));
    // localStorage.setItem("formData", JSON.stringify(formData))
    setFirstData(false);
  }, [data, firstRender]);

  /*      useEffect(() => {
                const localstorageData = localStorage.getItem('formData');
                // console.log(localstorageData)
                if (localstorageData) {
                    setFormData(JSON.parse(localstorageData));
                }
            }, []);

            useEffect(() => {
                localStorage.setItem('formData', JSON.stringify(formData));
            }, [formData]);
*/
  const handleOk = () => {
    setIsModalOpen(false);
    setTaskAdd("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleBtnAddProjectClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBlueChange = () => {
    if (taskAdd) {
      const newObj = {
        ...formData,
        projectName: projectName,
        tasks: [...formData.tasks, { id: Number(new Date()), title: taskAdd }],
      };
      setFormData(newObj);
    }
    setTaskAdd("");
    setIsModalOpen(false);
  };

  const handleClickdelete = (id) => {
    const choice = window.confirm("Are you sure you want to delete?");
    if (choice) {
      const DeleteResult = formData.tasks.filter((task) => {
        return task.id !== id;
      });
      // const newObj = {
      //   ...formData,
      //   name: projectName,
      //   tasks: DeleteResult,
      // };
      const newObj = {
        ...formData,
        projectName: projectName,
        tasks: DeleteResult,
      };
      setFormData(newObj);
    }
  };

  // console.log("formData", formData);

  const handleSubmitClick = () => {
    //console.log("submit clicked");
    if (formData.tasks.length > 0 && projectName !== "") {
      const newObj = {
        ...formData,
        projectName: projectName,
        tasks: [...formData.tasks, formData.tasks],
      };
      const newData = [...data, newObj];
      setData(newData);
      setFormData({ projectName: "", tasks: [] });
      setProjectName("");
    } else if (projectName === "") {
      alert("Please enter Project Name");
    } else if (formData.tasks.length === 0) {
      alert("Please enter tasks");
    }
  };
  return (
    <>
      {formData.projectName} <br />
      <div className="container">
        <Header
          handleBtnAddProjectClick={handleBtnAddProjectClick}
          projectName={projectName}
          setProjectName={setProjectName}
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
          autofocus
          onBlur={handleBlueChange}
        />
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
                <Meta title={task.title} />
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
              key={i}
              mainId={ele.id}
              title={ele.projectName}
              task={ele.tasks}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
