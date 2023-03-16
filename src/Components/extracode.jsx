import { Button, Card, Input, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import "./App.css";
import CardDetails from "./Components/CardDetails";
import Header from "./Components/Header";
function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    tasks: [],
  });
  //const [projectName, setProjectName] = useState("");
  const [taskAdd, setTaskAdd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstRender, setFirstData] = useState(true);
  // const [isCardModalOpen, setCardIsModalOpen] = useState(f);

  useEffect(() => {
    firstRender
      ? setData(JSON.parse(localStorage.getItem("data")) || [])
      : localStorage.setItem("data", JSON.stringify(data));

    setFirstData(false);
  }, [data, firstRender]);

  /*  */
  useEffect(() => {
    const localstorageData = localStorage.getItem("formDataTasks");
    // console.log(localstorageData)
    if (localstorageData) {
      setFormData(JSON.parse(localstorageData));
    }
    // console.log("updated Data", data);
  }, []);

  useEffect(() => {
    localStorage.setItem("formDataTasks", JSON.stringify(formData));
    // console.log("formData after", formData);
  }, [formData]);

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

  const handleCheckBox = (id, mainId) => {
    // console.log("checkbox", id);
    const result = data.filter((ele) => {
      console.log("main id", mainId);
      console.log("data ele.id ", ele.id);
      if (ele.id === mainId) {
        console.log("mainId is ok");
        const updatedData = ele.tasks.map((Ele) => {
          if (Ele.id === id) {
            const newObj = { ...Ele, completed: !Ele.completed };
            // console.log("if part executed", newObj);
            return newObj;
          } else {
            const newObj = { ...Ele };
            // console.log("if else part executed", newObj);
            return newObj;
          }
        });
        const newObjUpdate = {
          ...formData.tasks,
          tasks: updatedData,
        };
        return newObjUpdate;
        // console.log("updateData final", updatedData);
        // return updatedData;
      } else {
        console.log("mainId is not Matching");
      }
      // const updatedData = ele.tasks.filter((Ele) => {
      //   if (Ele.id === id) {
      //     console.log("list of task detaisls", Ele);
      //     const newObj = { ...Ele, completed: !Ele.completed };
      //     console.log("if part executed", newObj);
      //     // return newObj;
      //   } else {
      //     const newObj = { ...Ele };
      //     console.log("if else part executed", newObj);
      //     // return newObj;
      //   }
      // console.log("updateData", updatedData);
      //  });
      // const newObjUpdate = {
      //   ...formData.tasks,
      //   tasks: updatedData,
      // };
      //console.log("updated data", updatedData);
      //   console.log("hadlecheck", newObjUpdate);
      //   // return newObjUpdate;
      //   return newObjUpdate;
      // });
      //setData(result);
      // console.log("original result", result);
      // const result = tasks.map((task) => {
      //   if (task.id == id) {
      //     return { ...task, ...{ completed: !task.completed } };
      //   } else {
      //     return { ...task };
      //   }
    });
    console.log("filter Element", result);
    // const newObjUpdate = {
    //   ...formData,
    //   tasks: [...formData.tasks,  formData.tasks: result ],
    // };
    //console.log("finalResult Data", newObjUpdate);
    // console.log("final Data", data);
  };

  const handleBlueChange = (e) => {
    // console.log(e.target.value);
    if (taskAdd) {
      const newObj = {
        ...formData,
        id: Number(new Date()),
        projectName: formData.projectName,
        tasks: [
          ...formData.tasks,
          { id: Number(new Date()), title: taskAdd, completed: false },
        ],
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
      const newObj = {
        ...formData,
        projectName: formData.projectName,
        tasks: DeleteResult,
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
  // console.log("formData", formData);

  const handleSubmitClick = () => {
    //console.log("submit clicked");
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
              handleCheckBox={handleCheckBox}
              mainId={ele.id}
              key={i}
              title={ele.projectName}
              task={ele.tasks}
            />
          );
        })}
      </div>
    </>
  );
}
// const result = data.map((ele) => {
//   if (ele.id === mainId) {
//     return Object.keys(ele).map((Ele) => {
//       Ele
//     });
//     // ele.tasks.map((ele) => {
//     //   if (ele.id === id) {
//     //     return { ...ele, completed: !ele.completed };
//     //   } else {
//     //     return { ...ele };
//     //   }
//     // });
//   } else {
//     return { ...ele };
//   }
// });
// console.log("result", result);
// const result = data.find((ele) => {
//   if (ele.id === mainId) {
//     console.log("Id is Matching");
//     const updatedData = ele.tasks.map((Ele) => {
//       if (Ele.id === id) {
//         const newObj = { ...Ele, completed: !Ele.completed };
//         return newObj;
//       } else {
//         const newObj = { ...Ele };
//         return newObj;
//       }
//     });
//     // console.log("Update details", updatedData);
//     const newObjUpdate = {
//       ...formData.tasks,
//       tasks: updatedData,
//     };
//     console.log("After adding to Object", newObjUpdate);

//     const newObj = {
//       ...formData,
//       tasks: newObjUpdate,
//     };
//     // setFormData(newObj);
//     console.log("newObject", newObj);
//     return newObj;
//   } else {
//     console.log("mainId is not Matching");
//     return false;
//   }
// });
// console.log("find Method", result);
export default App;
