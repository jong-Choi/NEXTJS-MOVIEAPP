import { toast } from "react-toastify";

export const toastSuccess = (message: string, offset?: number) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: offset || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const toastError = (message: string, offset?: number) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: offset || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const toastInfo = (message: string, offset?: number) => {
  toast.info(message, {
    position: "bottom-left",
    autoClose: offset || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const toastDefault = (message: string, offset?: number) => {
  toast(message, {
    position: "bottom-left",
    autoClose: offset || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const toastAlert = { toastSuccess, toastError, toastInfo, toastDefault };

export default toastAlert;
