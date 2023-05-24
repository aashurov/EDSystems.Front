import { useMemo } from "react";
import { StatusApi } from "./StatusApi";

interface Props{
    readonly StatusApi: StatusApi;
}

export function useStatusApiContext():Props{
    const api = useMemo(() => new StatusApi(), []);

    return {
        StatusApi: api
    }
}