import * as actions from '../actions/actionTypes';

import {updateObject} from "../../utility/utility";

interface InitialFeedState {
    feeds: Array<any>;
    loading: boolean;
    selectedCategoryFilter: string;
    selectedCountryFilter: string;
}

const initialState: InitialFeedState = {
    feeds: [],
    loading: false,
    selectedCategoryFilter: '',
    selectedCountryFilter: ''
}

const fetchFeedsSuccess = (state: InitialFeedState, action: any) => {
    return {
        ...state,
        feeds: state.feeds.concat(action.feeds)
    }
};


const refreshFeeds = (state: InitialFeedState, action: any) => {
    return updateObject(state, {
        feeds: action.feeds
    });
};


const fetchFeedsStart = (state: InitialFeedState, action: any) => {
    return updateObject(state, {
        loading: true
    });
};

const categoryFilterSelected = (state: InitialFeedState, action: any) => {
    return updateObject(state, {
        selectedCategoryFilter: action.value
    });
};

const countryFilterSelected = (state: InitialFeedState, action: any) => {
    return updateObject(state, {
        selectedCountryFilter: action.value
    });
};

const removeCountryFilter = (state: InitialFeedState, action: any) => {
    return updateObject(state, {
        selectedCountryFilter: action.value
    });
};

const removeCategoryFilter = (state: InitialFeedState, action: any) => {
    return updateObject(state, {
        selectedCategoryFilter: action.value
    });
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actions.FETCH_FEEDS_START:
            return fetchFeedsStart(state, action);
        case actions.COUNTRY_FILTER_SELECTED:
            return countryFilterSelected(state, action);
        case actions.FETCH_FEEDS_COMPLETED:
            return fetchFeedsSuccess(state, action);
        case actions.CATEGORY_FILTER_SELECTED:
            return categoryFilterSelected(state, action);
        case actions.REMOVE_COUNTRY_FILTER:
            return removeCountryFilter(state, action);
        case actions.REMOVE_CATEGORY_FILTER:
            return removeCategoryFilter(state, action);
        case actions.REFRESH_FEEDS:
            return refreshFeeds(state, action);
        default:
            return state;
    };
};

export default reducer;