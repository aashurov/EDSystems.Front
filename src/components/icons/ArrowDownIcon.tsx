interface Props{
    readonly size?: number;
    readonly color?: string; 
}

export default function ArrowDownIcon({size = 15, color = "black"}:Props){
    return (
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   <path d="M12 3v18m0 0-7-7m7 7 7-7"></path>
</svg>
    )
}

