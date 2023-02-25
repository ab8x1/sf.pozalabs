export type liquidationType = {
    gasPrice: string,
    gasUsed: string,
    rewardAmount: string,
    timestamp: string,
    token: string,
}

type rewardsType = {
    ['7d']: number,
    ['30d']: number
}

type aprType = {
    ['7d']: number,
    ['30d']: number
}

type transactionsType = {
    total: number,
    jackPot: number,
    unprofitable: number
}

export type tokenType = {
    rewards: rewardsType,
    transactions: transactionsType,
    apr: aprType,
    currentSentinel: string,
    stake: number
}

export type sentinelsType = {
    [key: string]: tokenType
}

const obj = {
    'elo': {
        rewards: {

        }
    }
}