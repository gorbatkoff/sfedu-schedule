import { useState } from "react";
import Calendar from "react-calendar";

import "./MyCalendar.scss";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  return <Calendar onChange={onChange} value={value} />;
}
