import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import "../../assets/react-datepicker.css";

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  showTimeSelect?: boolean;
}

const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
  <Input
    autoComplete="off"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
  />
);
customDateInput.displayName = "DateInput";

const CustomInput = React.forwardRef(customDateInput);

export const DateInput = ({
  value,
  onChange,
  showTimeSelect = false,
}: DateInputProps) => {
  return (
    <InputGroup>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        dateFormat={showTimeSelect ? "MM/dd/yyyy, h:mm aa" : "MM/dd/yyyy"}
        customInput={<CustomInput />}
      />
      <InputRightElement color="black" children={<BsFillCalendarPlusFill />} />
    </InputGroup>
  );
};
