import { IAuthUser } from "@/interfaces/authUser";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = (): IAuthUser => useContext(AuthContext)