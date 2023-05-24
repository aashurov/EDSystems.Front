import React from "react";

export interface TableHeaderProps{
    readonly header: string;
    readonly access: string;
    readonly cell?: (value: any) => void;
    readonly width: number;
}

export interface IdProps{
    readonly id: number;
}

export interface Dict<T>{
    readonly [key: string]: T;
}

export type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export enum SizeType{
    Small = "small",
    Large = "large",
    Medium = "medium"
}
    
export enum PositionType{
    Top = "top",
    Left = "left",
    Right = "right",
    Bottom = "bottom"
}
    
