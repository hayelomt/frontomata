import ReactDatePicker from 'react-datepicker';

type DateSelectorProps = {
  date: Date | null;
  onDateChange: (d: Date) => void;
};

const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
  return (
    <>
      <ReactDatePicker
        dateFormat="yyyy/MM/dd"
        selected={date}
        onChange={onDateChange}
        className="date-picker"
      />
    </>
  );
};

export default DateSelector;
