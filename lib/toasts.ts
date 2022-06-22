import { toast } from "react-hot-toast";

export class ToastUX {
  constructor() {}

  isExisting() {
    toast.success("This URL has already been shortened!", {
      duration: 4000,
    });
  }

  isError(err: string) {
    toast.error(err);
  }

  isSuccess() {
    toast.success("Your URL has been shortened!");
  }
}
