import { Button, Col, Input } from "antd";

const Header = (props) => {
  const { handleBtnAddProjectClick, handleTestData, handleChange, formData } =
    props;
  return (
    <>
      <label style={{ marginTop: "7px" }}>Project Name</label>

      <Col span={8}>
        <Input
          placeholder="Enter Project Name"
          className="col-4"
          value={formData.projectName}
          name="projectName"
          onChange={handleChange}
        />
      </Col>

      <Button type="primary" onClick={handleBtnAddProjectClick}>
        Add Tasks
      </Button>
      <Button onClick={handleTestData}>Test Data</Button>
    </>
  );
};

export default Header;
