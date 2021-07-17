import {toast} from 'react-toastify'

const options = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const onSuccess = (msg) => {
  toast.success(msg, options)
}

export const onDelete = (msg) => {
  toast.info(msg,options)
}