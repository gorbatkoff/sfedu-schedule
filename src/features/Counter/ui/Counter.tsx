import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import { Button, Heading } from "@chakra-ui/react";
import {
  counterActions,
  counterSlice,
} from "/src/features/Counter/model/slice/counterSlice";

interface CounterProps {
  className?: string;
}

export const Counter = memo(({ className }: CounterProps) => {
  const counter = useSelector((state: StateSchema) => state.counter.value);

  const dispatch = useDispatch();

  const increaseValue = () => {
    dispatch(counterActions.increment());
  };

  return (
    <div>
      <Heading style={{ color: "red" }}>{counter}</Heading>

      <Button onClick={increaseValue}>Increase</Button>
    </div>
  );
});
