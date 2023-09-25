import { Select } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  StopTwoTone,
} from "@ant-design/icons";

const { Option } = Select;

function StatusDropdown({ value, onChange }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircleTwoTone twoToneColor="#52c41a" />;
      case "Inactive":
        return <CloseCircleTwoTone twoToneColor="#eb2f96" />;
      case "Blocked":
        return <StopTwoTone twoToneColor="#f5222d" />;
      default:
        return null;
    }
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <div style={{ padding: "8px 12px", borderTop: "1px solid #e8e8e8",  border:"30px"}}>
            <span style={{ marginRight: 8 }}>{getStatusIcon(value)}</span>
            {value}
          </div>
        </div>
      )}
    >
      <Option value="Active">
        <span>
          <CheckCircleTwoTone twoToneColor="#52c41a" /> Active
        </span>
      </Option>
      <Option value="Inactive">
        <span>
          <CloseCircleTwoTone twoToneColor="#eb2f96" /> Inactive
        </span>
      </Option>
      <Option value="Blocked">
        <span>
          <StopTwoTone twoToneColor="#f5222d" /> Blocked
        </span>
      </Option>
    </Select>
  );
}

export default StatusDropdown;
