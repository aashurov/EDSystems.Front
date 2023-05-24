export enum Pages{
    Login = "/",
    App = "/app"
}

export enum RouteContainerTabs{
    Administrator = "administrator",
    Users = "users",
    Parcels = "parcels",
    AddParcel = "add-parcel",
    EditParcel = "edit-parcel",

    AdministratorPath = "administrator/:tab?",
    UsersPath = "users/:tab?",
    ParcelsPath = "parcels/:tab?",
    AddParcelPath = "add-parcel/:tab?",
    EditParcelPath = "edit-parcel/:tab?",
    EditParcelSecondPath = "edit-parcel-second/:tab?",
}