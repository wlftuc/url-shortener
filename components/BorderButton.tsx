import { ButtonProps } from "../lib/types";
export default function BorderButton(props: ButtonProps) {
  if (props.className) {
    return <button {...props}>{props.children}</button>;
  }
  return (
    <button
      {...props}
      className="font-semibold border rounded-md p-2 max-w-2xl text-center text-sm"
    >
      {props.children}
    </button>
  );
}
