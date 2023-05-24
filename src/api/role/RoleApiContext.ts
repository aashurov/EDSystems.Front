import { useMemo } from "react";
import { RoleApi } from "./RoleApi";

interface Props{
    readonly RoleApi: RoleApi;
}

export function useRoleApiContext():Props{
    const api = useMemo(() => new RoleApi(), []);

    return {
        RoleApi: api
    }
}