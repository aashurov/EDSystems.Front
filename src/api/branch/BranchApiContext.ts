import { useMemo } from "react";
import { BranchApi } from "./BranchApi";

interface Props{
    readonly BranchApi: BranchApi;
}

export function useBranchApiContext():Props{
    const api = useMemo(() => new BranchApi(), []);

    return {
        BranchApi: api
    }
}