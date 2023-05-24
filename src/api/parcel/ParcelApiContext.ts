import { useMemo } from "react";
import { ParcelApi } from "./ParcelApi";

interface Props{
    readonly ParcelApi: ParcelApi;
}

export function useParcelApiContext():Props{
    const api = useMemo(() => new ParcelApi(), []);

    return {
        ParcelApi: api
    }
}