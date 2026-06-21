export function getIndicator(
    data:any,
    name:string
){

    return data?.data.find(
        (x:any)=>
            x.indicator===name
    )

}


export function buildLineData(
    data:any[],
    names:string[]
){

    const years =
        Object.keys(
            data[0]?.values || {}
        )

    const rows =
        years.map(year => {

            const row:any = {
                year
            }

            names.forEach(name => {

                const item =
                    data.find(
                        x =>
                            x.indicator === name
                    )

                row[name] =
                    item?.values?.[year]

            })

            return row

        })

    return rows
}