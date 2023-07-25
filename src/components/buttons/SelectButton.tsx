import React from "react";
import { Select, Space } from "antd";
import '../../styles/notes.less'
import { ISortOptions } from "../../interfaces/note.interface";

interface SelectButtonProps {
  options: ISortOptions[];
  sort: number;
  setSort: (sortValue: number) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({ options, sort, setSort }) => {
  const handleChange = (value: number) => {
    setSort(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue={options[0].value}
        style={{
          width: 200,
        }}
        onChange={handleChange}
        options={options}
        value={sort}
      />
    </Space>
  );
};

export default SelectButton;
