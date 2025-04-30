import { createContext } from "react";

export const RefreshDataContext = createContext({
    refreshData: Date.now(),
    setRefreshData: () => {},
});