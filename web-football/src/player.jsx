export default function Player({data}){
    return (
        <>
        <p> {data.name} </p>
        <p> Worth: {data.value.toString().split('').reverse().join('').replace("000000", "m").split('').reverse().join('')}</p>
        </>
    )


}