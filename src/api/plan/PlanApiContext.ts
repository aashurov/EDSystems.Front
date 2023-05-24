import { useMemo } from "react";
import { PlanApi } from "./PlanApi";

interface Props{
    readonly PlanApi: PlanApi;
}

export function usePlanApiContext():Props{
    const api = useMemo(() => new PlanApi(), []);

    return {
        PlanApi: api
    }
}