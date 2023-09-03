const TEST_TEAM = {
    abbreviation : "MAN", 
    displayName : "Manchester United", 
    id : "360", 
    location : "Manchester United", 
    logos : [{href: 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png'}],
    name : "Manchester United", 
    shortDisplayName : "Man United", 
}


export default function Item( {pos, data} ) {
    return (
        <>
        <h1> {data.team.displayName} </h1>
        </>
    )
}