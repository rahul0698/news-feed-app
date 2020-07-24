import * as actionTypes from './actionTypes';
import API from '../../utility/api';
import {API_KEY} from '../../mock-data/mock-data';

export const fetchFeedsSuccess = (feeds: any) => {
    return {
        type: actionTypes.FETCH_FEEDS_COMPLETED,
        feeds: feeds
    };
};

export const fetchFeedStart = () => {
    return {
        type: actionTypes.FETCH_FEEDS_START
    }
}

export const categoryFilterSelected = (filterValue: string) => {
    return {
        type: actionTypes.CATEGORY_FILTER_SELECTED,
        value: filterValue
    }
}

export const refreshFeeds = (feeds: any) => {
    return {
        type: actionTypes.REFRESH_FEEDS,
        feeds: feeds
    }
}

export const countryFilterSelected = (filterValue: string) => {
    return {
        type: actionTypes.COUNTRY_FILTER_SELECTED,
        value: filterValue
    }
}

export const removeCountryFilter = () => {
    return {
        type: actionTypes.REMOVE_COUNTRY_FILTER,
        value: ''
    };
};

export const removeCategoryFilter = () => {
    return {
        type: actionTypes.REMOVE_CATEGORY_FILTER,
        value: ''
    };
};

export const fetchFeeds = (filterObject?: any, page=1, pageLimit=20) => {
    return async(dispatch: any) => {
        dispatch(fetchFeedStart());
        let url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}&page=${page}&pageSize=${pageLimit}`;
        if(filterObject && filterObject.country) {
            url += `&country=${filterObject.country}`
        }

        if(filterObject && filterObject.category) {
            url += `&category=${filterObject.category}`
        }
        try {
            const response = await API.get(url);
            if(response.status === 'ok') {
                if(page===1) {
                    dispatch(refreshFeeds(response.articles));
                } else {
                    dispatch(fetchFeedsSuccess(response.articles));
                }
            } else if (response.status === 'error') {
                console.log(response.message);
            }
        } catch(error) {
            console.log(error);
        }
    }
}