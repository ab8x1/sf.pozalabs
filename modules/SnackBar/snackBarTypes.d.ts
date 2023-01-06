import { Dispatch, SetStateAction } from "react"

export type SnackBarProps = {
    closeSnackBar: () => void,
    status: "success" | "warning" | "error",
    message: string
}