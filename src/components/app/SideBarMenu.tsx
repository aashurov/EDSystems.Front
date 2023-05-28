import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserIcon from "../icons/UserIcon";
import AppMenu from "./AppMenu";
import SideBarItem from "./SideBarItem";
import { SaveActiveItem } from "../../utils/SaveActiveItem";
import "./assets/app-menu.scss";
import AddIcon from "../icons/AddIcon";
import BoxsIcon from "../icons/BoxsIcon";
import EditIcon from "../icons/EditIcon";
import { RouteContainerTabs } from "../../constants/Routes";
import { AdministratorTabs } from "../../containers/AdministratorContainer";
import { UserTabs } from "../../containers/UsersContainer";
import { useSelector } from "react-redux";
import BookIcon from "../icons/BookIcon";

export default function SideBarMenu(){

    const location = useLocation();
    const tab = useMemo(()=>SaveActiveItem("tab", location.pathname),[SaveActiveItem, location.pathname])
    const childTab = useMemo(()=>SaveActiveItem("childTab", location.pathname),[SaveActiveItem, location.pathname])
    const account = useSelector((state: any) =>state.data.profile);

    const Administrator = account.role.filter((item:any)=>item === "Administrator")
    const Manager = account.role.filter((item:any)=>item === "Manager")
    const Staff = account.role.filter((item:any)=>item === "Staff")
    const Customer = account.role.filter((item:any)=>item === "Customer")
    const Courier = account.role.filter((item:any)=>item === "Courier");

    const navigate = useNavigate();

    return (
        <>
        {/* Administrator */}
        {Administrator.length !== 0 && Manager.length === 0 && Staff.length === 0 && Courier.length === 0 && Customer.length === 0 && (
                <AppMenu
                activeTab={tab}
                defaultTab={RouteContainerTabs.Administrator}
                onChangeTab={(value: string)=>{
                    navigate(`/app/${value}`)
                }}
                >
                <SideBarItem
                    key={RouteContainerTabs.Administrator}
                    icon={
                        <UserIcon color="white"/>  
                    }
                    responsiveContent={
                        <AppMenu
                            defaultTab={AdministratorTabs.RoleManagerTab}
                            activeTab={childTab}
                            onChangeTab={(value: any)=>navigate(`/app/administrator/${value}`)}
                            >
                        <SideBarItem
                            key={AdministratorTabs.RoleManagerTab}
                            >
                            Роли
                        </SideBarItem>    
                        <SideBarItem
                            key={AdministratorTabs.PlanTab}
                            >
                            Тарифы
                        </SideBarItem> 
                        <SideBarItem
                            key={AdministratorTabs.StatusTab}
                            >
                            Статусы
                        </SideBarItem> 
                        <SideBarItem
                            key={AdministratorTabs.BranchesTab}
                            >
                            Филиалы
                        </SideBarItem>    
                        </AppMenu>
                    }
                    >
                    Администратор
                </SideBarItem>

                <SideBarItem
                    key={RouteContainerTabs.Users}
                    icon={
                        <UserIcon color="white"/>  
                    }
                    responsiveContent={
                        <AppMenu
                            activeTab={childTab}
                            defaultTab="add-user"
                            onChangeTab={(value: any)=>navigate(`/app/users/${value}`)}
                            >
                        <SideBarItem
                            key={UserTabs.AddUser}
                            >
                            Создать
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.AllUsers}
                            >
                            Все 
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.Customers}
                            >
                            Клиенты
                        </SideBarItem>    
                        <SideBarItem
                            key={UserTabs.Staff}
                            >
                            Сотрудники
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.Managers}
                            >
                            Менеджеры
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.Couriers}
                            >
                            Курьеры
                        </SideBarItem>    
                        </AppMenu>
                    }
                    >
                    Пользователи
                </SideBarItem>

                <SideBarItem
                    key={RouteContainerTabs.Parcels}
                    icon={
                        <BoxsIcon color="white"/>
                    }
                    responsiveContent={
                        <AppMenu
                            activeTab={childTab}
                            defaultTab="all-parcels"
                            onChangeTab={(value: any)=>navigate(`/app/parcels/${value}`)}
                            >
                            <SideBarItem
                                key="parcel-form"
                                >
                                Создать
                            </SideBarItem>
                            <SideBarItem
                                key="all-parcels"
                                >
                                Все
                            </SideBarItem>     
                            <SideBarItem
                                key="by-couriers"
                                >
                                По курьерам
                            </SideBarItem>  
                            <SideBarItem
                                key="by-customers"
                                >
                                По клиентам
                            </SideBarItem> 
                        </AppMenu>
                    }
                    >
                    Посылки
                </SideBarItem>

                <SideBarItem
                    key="edit-parcel"
                    icon={
                        <EditIcon color="white"/>
                    }
                    >
                    Статус посылок
                </SideBarItem>
                <SideBarItem
                key="edit-parcel-second"
                icon={
                    <BookIcon color="white"/>
                }
                >
                Накладные
            </SideBarItem>
                </AppMenu>
        )}

        {/* Manager */}
        {Administrator.length === 0 && Manager.length !== 0 && Staff.length === 0 && Courier.length === 0 && Customer.length === 0 && (
                <AppMenu
                activeTab={tab}
                defaultTab={RouteContainerTabs.Administrator}
                onChangeTab={(value: string)=>{
                    navigate(`/app/${value}`)
                }}
                >
                <SideBarItem
                    key={RouteContainerTabs.Users}
                    icon={
                        <UserIcon color="white"/>  
                    }
                    responsiveContent={
                        <AppMenu
                            activeTab={childTab}
                            defaultTab="add-user"
                            onChangeTab={(value: any)=>navigate(`/app/users/${value}`)}
                            >
                        <SideBarItem
                            key={UserTabs.AddUser}
                            >
                            Создать
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.AllUsers}
                            >
                            Все
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.Customers}
                            >
                            Клиенты
                        </SideBarItem>    
                        <SideBarItem
                            key={UserTabs.Staff}
                            >
                            Сотрудники
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.Managers}
                            >
                            Менеджеры
                        </SideBarItem> 
                        <SideBarItem
                            key={UserTabs.Couriers}
                            >
                            Курьеры
                        </SideBarItem>    
                        </AppMenu>
                    }
                    >
                    Пользователи
                </SideBarItem>
                <SideBarItem
                    key={RouteContainerTabs.Parcels}
                    icon={
                        <BoxsIcon color="white"/>
                    }
                    responsiveContent={
                        <AppMenu
                            activeTab={childTab}
                            defaultTab="all-parcels"
                            onChangeTab={(value: any)=>navigate(`/app/parcel/${value}`)}
                            >
                            <SideBarItem
                                key="all-parcels"
                                >
                                Все
                            </SideBarItem>     
                        </AppMenu>
                    }
                    >
                    Посылки
                </SideBarItem>
                <SideBarItem
                    key="add-parcel"
                    icon={
                        <AddIcon color="white"/>
                    }
                    >
                    Создать
                </SideBarItem>
                <SideBarItem
                    key="edit-parcel"
                    icon={
                        <EditIcon color="white"/>
                    }
                    >
                    Статус посылок
                </SideBarItem>
                <SideBarItem
                key="edit-parcel-second"
                icon={
                    <EditIcon color="white"/>
                }
                >
                Накладные
            </SideBarItem>
                </AppMenu>
        )}

        {/* Staff */}
        {Administrator.length === 0 && Manager.length === 0 && Staff.length !== 0 && Courier.length === 0 && Customer.length === 0 && (
            <AppMenu
            activeTab={tab}
            defaultTab={RouteContainerTabs.Administrator}
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
            }}
            >
            <SideBarItem
                key={RouteContainerTabs.Users}
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="add-user"
                        onChangeTab={(value: any)=>navigate(`/app/users/${value}`)}
                        >
                    <SideBarItem
                        key={UserTabs.AddUser}
                        >
                        Создать
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.AllUsers}
                        >
                        Все
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.Customers}
                        >
                        Клиенты
                    </SideBarItem>    
                    {/* <SideBarItem
                        key={UserTabs.Staff}
                        >
                        Staff
                    </SideBarItem>  
                    <SideBarItem
                        key={UserTabs.Managers}
                        >
                        Managers
                    </SideBarItem> */}
                    <SideBarItem
                        key={UserTabs.Couriers}
                        >
                        Курьеры
                    </SideBarItem>    
                    </AppMenu>
                }
                >
                Пользователи
            </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Parcels}
                icon={
                    <BoxsIcon color="white"/>
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="all-parcels"
                        onChangeTab={(value: any)=>navigate(`/app/parcels/${value}`)}
                        >
                        <SideBarItem
                            key="all-parcels"
                            >
                            Все
                        </SideBarItem>
                        <SideBarItem
                            key="parcel-form"
                            >
                            Создать
                        </SideBarItem>  
                    </AppMenu>
                }
                >
                Посылки
            </SideBarItem>
            
            {/* <SideBarItem
                key="add-parcel"
                icon={
                    <AddIcon color="white"/>
                }
                >
                Создать
            </SideBarItem> */}
            
            <SideBarItem
                key="edit-parcel"
                icon={
                    <EditIcon color="white"/>
                }
                >
                Статус посылок
            </SideBarItem>

            <SideBarItem
                key="edit-parcel-second"
                icon={
                    <EditIcon color="white"/>
                }
                >
                Накладные
            </SideBarItem>
            </AppMenu>
        )}

        {/* Courier */}
        {Administrator.length === 0 && Manager.length === 0 && Staff.length === 0 && Courier.length !== 0 && Customer.length === 0 && (
            <AppMenu
            activeTab={tab}
            defaultTab={RouteContainerTabs.Administrator}
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
            }}
            >
            <SideBarItem
                key={RouteContainerTabs.Users}
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="add-user"
                        onChangeTab={(value: any)=>navigate(`/app/users/${value}`)}
                        >
                    <SideBarItem
                        key={UserTabs.AddUser}
                        >
                        Мои доставки
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.AllUsers}
                        >
                        Мои заборы
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.AllUsers}
                        >
                        Мои задачи
                    </SideBarItem> 
                    {/* <SideBarItem
                        key={UserTabs.Customers}
                        >
                        Customers
                    </SideBarItem>     */}
                    {/* <SideBarItem
                        key={UserTabs.Staff}
                        >
                        Staff
                    </SideBarItem>  */}
                    {/* <SideBarItem
                        key={UserTabs.Managers}
                        >
                        Managers
                    </SideBarItem>  */}
                    {/* <SideBarItem
                        key={UserTabs.Couriers}
                        >
                        Couriers
                    </SideBarItem>     */}
                    </AppMenu>
                }
                >
                Users
            </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Parcels}
                icon={
                    <BoxsIcon color="white"/>
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="all-parcels"
                        onChangeTab={(value: any)=>navigate(`/app/parcel/${value}`)}
                        >
                        <SideBarItem
                            key="all-parcels"
                            >
                            All Parcels
                        </SideBarItem>     
                    </AppMenu>
                }
                >
                Parcels
            </SideBarItem>
            <SideBarItem
                key="add-parcel"
                icon={
                    <AddIcon color="white"/>
                }
                >
                Add Parcel
            </SideBarItem>
            <SideBarItem
                key="edit-parcel"
                icon={
                    <EditIcon color="white"/>
                }
                >
                Edit Parcel
            </SideBarItem>
            </AppMenu>
        )}

        {/* Customer */}
        {Administrator.length === 0 && Manager.length === 0 && Staff.length === 0 && Courier.length === 0 && Customer.length !== 0 && (
            <AppMenu
            activeTab={tab}
            defaultTab={RouteContainerTabs.Administrator}
            onChangeTab={(value: string)=>{
                navigate(`/app/${value}`)
            }}
            >
            <SideBarItem
                key={RouteContainerTabs.Users}
                icon={
                    <UserIcon color="white"/>  
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="add-user"
                        onChangeTab={(value: any)=>navigate(`/app/users/${value}`)}
                        >
                    <SideBarItem
                        key={UserTabs.AddUser}
                        >
                        Мои отправки
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.AllUsers}
                        >
                        Мои посылки
                    </SideBarItem> 
                    <SideBarItem
                        key={UserTabs.AllUsers}
                        >
                        Создать
                    </SideBarItem>
                    {/* <SideBarItem
                        key={UserTabs.Customers}
                        >
                        Customers
                    </SideBarItem>     */}
                    {/* <SideBarItem
                        key={UserTabs.Staff}
                        >
                        Staff
                    </SideBarItem>  */}
                    {/* <SideBarItem
                        key={UserTabs.Managers}
                        >
                        Managers
                    </SideBarItem>  */}
                    {/* <SideBarItem
                        key={UserTabs.Couriers}
                        >
                        Couriers
                    </SideBarItem>     */}
                    </AppMenu>
                }
                >
                Users
            </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Parcels}
                icon={
                    <BoxsIcon color="white"/>
                }
                responsiveContent={
                    <AppMenu
                        activeTab={childTab}
                        defaultTab="all-parcels"
                        onChangeTab={(value: any)=>navigate(`/app/parcel/${value}`)}
                        >
                        <SideBarItem
                            key="all-parcels"
                            >
                            All Parcels
                        </SideBarItem>     
                    </AppMenu>
                }
                >
                Parcels
            </SideBarItem>
            <SideBarItem
                key="add-parcel"
                icon={
                    <AddIcon color="white"/>
                }
                >
                Add Parcel
            </SideBarItem>
            <SideBarItem
                key="edit-parcel"
                icon={
                    <EditIcon color="white"/>
                }
                >
                Edit Parcel
            </SideBarItem>
            </AppMenu>
        )}
        </>
    )
}