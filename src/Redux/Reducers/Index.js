import {
    POST_FAVORITES,
    ADD_ITEM_TO_CHART,
    DELETE_FAVORITES,
    GET_CARDS,
    FILTER_CARDS,
    GET_SEARCH,
    SET_NAME_FILTER,
    ORDER_BY_NAME,
    ORDER_BY_PRICE,
    ORDER_BY_RATE,
    POST_NEW_PRODUCT,
    GET_ALL_USERS,
    DELETE_CHART,
    GET_FAVORITES,
    GET_CHART_2,
    GET_REVIEWS,
    SAVE_RATING_AND_COMMENT,
    GET_ALL_ORDERS,
    MODIFICAR_USUARIO,
    SAVE_RATING_WEB,
    GET_RATING_WEB,
    GET_ORDERS_ID,
    GET_ALL_RATING_WEB

} from "../Actions/Types";

const initialState = {
    allFavorites: [],
    shoppingChart: [],
    allGames: [],
    cards: [],
    filteredCards: [],
    nameFilter: '',
    allUsers: [],
    reviews: [],
    allOrders: [],
    ordersID: [],
    ratingsWeb: [],
    allRatingsWeb: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RATING_WEB:
            return {
                ...state,
                allRatingsWeb: action.payload,

            }

        case GET_RATING_WEB:
            return {
                ...state,
                ratingsWeb: action.payload,

            }
        case SAVE_RATING_WEB: {
            return {
                ...state,
                ratingsWeb: action.payload
            }
        }
        case SAVE_RATING_AND_COMMENT: {
            return {
                ...state,
                reviews: action.payload
            }
        }

        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,

            }


        case POST_FAVORITES:

            return {
                ...state,
                allFavorites: action.payload
            }

        case DELETE_FAVORITES:

            return {
                ...state,
                allFavorites: action.payload
            }

        case GET_FAVORITES:

            return {
                ...state,
                allFavorites: action.payload
            }


        case POST_NEW_PRODUCT:
            return {
                ...state,
                allGames: action.payload
            }


        case ADD_ITEM_TO_CHART:
            return {
                ...state,
                shoppingChart: action.payload

            }

        case DELETE_CHART:
            return {
                ...state,
                shoppingChart: action.payload

            }

        case GET_CHART_2:
            return {
                ...state,
                shoppingChart: action.payload

            }


        case GET_CARDS:
            return {
                ...state,
                cards: action.payload,
                filteredCards: action.payload,
            }



        case GET_ALL_ORDERS:
            return {
                ...state,
                allOrders: action.payload,
            }

        case GET_ORDERS_ID:
            return {
                ...state,
                ordersID: action.payload,
            }

        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,

            }


        /*    case MODIFICAR_USUARIO:
   
               return{
                   ...state,
   
               } */

        case FILTER_CARDS:
            return {
                ...state,
                filteredCards: action.payload,
            }

        case GET_SEARCH:
            return {
                ...state,
                filteredCards: action.payload,
            }

        case SET_NAME_FILTER:
            return {
                ...state,
                nameFilter: action.payload,
            }

        case ORDER_BY_NAME: {
            let orderAz = [...state.filteredCards];
            orderAz = orderAz.sort((a, b) => {
                switch (action.payload) {
                    case 1:
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                        } else return 1
                    case 2:
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        } else return 1
                    default: return 0;
                }
            })
            return {
                ...state,
                filteredCards: orderAz
            }
        }
        case ORDER_BY_PRICE: {
            let orderPrice = [...state.filteredCards];
            orderPrice = orderPrice.sort((a, b) => {
                switch (action.payload) {
                    case 'MENOR PRECIO':
                        return a.price - b.price;
                    case 'MAYOR PRECIO':
                        return b.price - a.price;
                    default:
                        return 0;
                }
            });
            return { ...state, filteredCards: orderPrice };
        }






        default: return { ...state }
    }
}



export default rootReducer;


