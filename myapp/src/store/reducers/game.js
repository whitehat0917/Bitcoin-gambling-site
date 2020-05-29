import uuid from 'react-uuid';
import {
    TOGGLE_FLAG,
    INIT,
    SETBALANCE,
    CHANGEBALANCE,
    CHANGE_DIFFICULTY,
    GAMEOVER,
    CLEAR,
    SETBITCOINADDRESS,
    CHANGEUUID,
    CHANGEBACKGROUND
} from '../actions/types';
import config from '../../setting/config';

const initialState = {
    gameover: false,
    clear: false,
    bomb: config['easy'].bombNum,
    difficulty: 'easy',
    uuid: uuid(),
    balance: 0,
    rate: 1.1,
    bitcoinAddress: "",
    background: 1
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FLAG:
            {
                const { flagged } = action.payload
                let { bomb } = state;
                if (flagged) {
                    bomb -= 1;
                } else {
                    bomb += 1;
                }
                return {
                    ...state,
                    bomb: bomb
                }
            }
        case INIT:
            {
                // return {
                //   balance: state.balance,
                //   rate: state.rate,
                //   uuid: state.uuid,
                //   gameover: false,
                //   clear: false,
                //   bomb: config[state.difficulty].bombNum,
                //   difficulty: state.difficulty,
                // }
                // return Object.assign({}, state, { gameover: false, clear: false })
                return {
                    ...state,
                    gameover: false,
                    clear: false
                }
            }

        case SETBALANCE:
            {
                // const { balance, rate } = action.payload
                const { rate } = action.payload
                return {
                    ...state,
                    // balance: balance,
                    rate: rate
                }
            }

        case CHANGEBALANCE:
            {
                const { balance } = action.payload;
                return {
                    ...state,
                    balance: balance
                }
            }

        case CHANGEUUID:
            {
                const { uuid } = action.payload;
                return {
                    ...state,
                    uuid: uuid
                }
            }

        case CHANGEBACKGROUND:
            {
                const { background } = action.payload;
                return {
                    ...state,
                    background: background
                }
            }

        case CHANGE_DIFFICULTY:
            {
                const { difficulty } = action.payload
                return {
                    gameover: false,
                    clear: false,
                    bomb: config[difficulty].bombNum,
                    difficulty: difficulty
                }
            }

        case GAMEOVER:
            {
                const { gameover } = action.payload;
                return {
                    ...state,
                    gameover: gameover
                }
            }
        case CLEAR:
            {
                const { clear } = action.payload;
                return {
                    ...state,
                    clear: clear
                }
            }
        case SETBITCOINADDRESS:
            {
                const { bitcoinAddress } = action.payload;
                return {
                    ...state,
                    bitcoinAddress: bitcoinAddress
                }
            }
        default:
            return state;
    }
}

export default game;