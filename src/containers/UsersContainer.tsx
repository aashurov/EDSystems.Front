import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import AddUserTab from "../components/user/AddUserTab";
import AllUserTab from "../components/user/AllUsersTab";
import CuriersTab from "../components/user/CuriersTab";
import ManagersTab from "../components/user/ManagersTab";
import CustomersTab from "../components/user/Customers";
import StaffTab from "../components/user/StaffTab";

export enum UserTabs{
  AddUser = "add-user",
  AllUsers = "all-users",
  Customers = "customers",
  Staff = "staff",
  Managers = "managers",
  Couriers = "couriers",
}

export default function UsersContainer(){
    const { tab = UserTabs.AllUsers } = useParams();
    return (
        <ContainerLayout>
          {tab === UserTabs.AddUser && (
            <AddUserTab/>
          )}
          {tab === UserTabs.AllUsers && (
            <AllUserTab/>
          )}
          {tab === UserTabs.Customers && (
            <CustomersTab/>
          )}
          {tab === UserTabs.Staff && (
            <StaffTab/>
          )}
          {tab === UserTabs.Managers && (
            <ManagersTab/>
          )}
          {tab === UserTabs.Couriers && (
            <CuriersTab/>
          )}
        </ContainerLayout>
    )
}