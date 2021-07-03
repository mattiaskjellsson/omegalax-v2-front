export const getData = () => {
    return [{
        poolId: 1,
        _id: 1,
        values: {
            oxygen: 10,
            temperature: 12,
        },
        limits: {
            oxygenHigh: 170,
            oxygenLow: 70,
        },
        alarming: {
        }
    },
    {
        poolId: 2,
        _id: 2,
        values: {
            oxygen: 11,
            temperature: 13,
        },
        limits: {
            oxygenHigh: 172,
            oxygenLow: 72,
        },
        alarming: {
        }
    }]
}