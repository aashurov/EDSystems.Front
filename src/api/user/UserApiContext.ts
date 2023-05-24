import { useMemo } from "react";
import { UserApi } from "./UserApi";

interface Props{
    readonly UserApi: UserApi;
}

export function useUserApiContext():Props{
    const api = useMemo(() => new UserApi(), []);

    return {
        UserApi: api
    }
}