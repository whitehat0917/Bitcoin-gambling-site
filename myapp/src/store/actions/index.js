import {
    TOGGLE_FLAG,
    INIT,
    SETBALANCE,
    CHANGE_DIFFICULTY,
    GAMEOVER,
    CLEAR,
    CHANGEBALANCE,
    SETBITCOINADDRESS,
    CHANGEUUID,
    CHANGEBACKGROUND
} from './types';

export const toggle = (flagged) => {
    return {
        type: TOGGLE_FLAG,
        payload: { flagged }
    }
}

export const init = () => {
    return { type: INIT }
}

export const setBalance = () => {
    return {
        type: SETBALANCE,
        payload: {
            // balance: 100,
            rate: 1.1,
        }
    }
}

export const changeBalance = (balance) => {
    return {
        type: CHANGEBALANCE,
        payload: {
            balance: balance,
        }
    }
}

export const changeUuid = (uuid) => {
    return {
        type: CHANGEUUID,
        payload: {
            uuid: uuid,
        }
    }
}

export const changeDifficulty = (difficulty) => {
    return {
        type: CHANGE_DIFFICULTY,
        payload: { difficulty }
    }
}

export const gameover = (gameover) => {
    return {
        type: GAMEOVER,
        payload: { gameover }
    }
}

export const clear = (clear) => {
    return {
        type: CLEAR,
        payload: { clear }
    }
}

export const changeBackground = (background) => {
    return {
        type: CHANGEBACKGROUND,
        payload: { background: background }
    }
}

export const setBitcoinAddress = (address) => {
    return {
        type: SETBITCOINADDRESS,
        payload: {
            bitcoinAddress: address,
        }
    }
}