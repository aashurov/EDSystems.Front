import { useParams } from "react-router-dom";
import BranchTab from "../components/administrator/BranchTab";
import PlanTab from "../components/administrator/PlanTab";
import RoleManagerTab from "../components/administrator/RoleManagerTab";
import StatusTab from "../components/administrator/StatusTab";
import ContainerLayout from "../components/app/ContainerLayout";

export enum AdministratorTabs{
  RoleManagerTab = "role-manager",
  PlanTab = "plan",
  StatusTab = "status",
  BranchesTab = "branches",
}

export default function AdministratorContainer(){
  
    const { tab = AdministratorTabs.RoleManagerTab } = useParams();

    return (
        <ContainerLayout>
              {tab === AdministratorTabs.RoleManagerTab && (
                <RoleManagerTab/>
              )}   
               {tab === AdministratorTabs.PlanTab && (
                <PlanTab/>
              )} 
               {tab === AdministratorTabs.StatusTab && (
                <StatusTab/>
              )} 
               {tab === AdministratorTabs.BranchesTab && (
                <BranchTab/>
              )}           
        </ContainerLayout>
    )
}