import { Button, Col, Input } from "antd";

const Header = (props) => {
  const { handleBtnAddProjectClick, setProjectName, projectName, formData } =
    props;
  return (
    <>
      <label style={{ marginTop: "7px" }}>Project Name</label>
      <Col span={8}>
        <Input
          placeholder="Enter Project Name"
          className="col-4"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        />
      </Col>

      <Button type="primary" onClick={handleBtnAddProjectClick}>
        Add Tasks
      </Button>
    </>
  );
};

export default Header;
