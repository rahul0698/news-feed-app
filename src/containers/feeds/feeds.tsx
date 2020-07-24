import React, {Component} from 'react';
import './feeds.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from '../../store/actions/index';
import Feed from "../../components/feed/feed";

import InfiniteScroll from 'react-infinite-scroll-component';

interface IProps {
    feeds: Array<{}>;
    selectedCategoryFilter: string;
    selectedCountryFilter: string;
    fetchFeeds: ( filterObject?: IFilter, page?: number, pageLimit?: number) => void;
    setCategoryFilter: (category: string) => void;
    setCountryFilter: (country: string) => void;
    removeCountryFilter: () => void;
    removeCategoryFilter: () => void;
}

interface IFilter {
    country?: string;
    category?: string;
}

class Feeds extends Component<IProps> {

    filterByCategory = [
        {key: "Select all...", value: ""},
        {key: "business", value: "business"},
        {key: "entertainment", value: "entertainment"},
        {key: "general", value: "general"},
        {key: "science", value: "science"},
        {key: "health", value: "health"},
        {key: "sports", value: "sports"},
        {key: "technology", value: "technology"},
    ];

    filterByCountry = [
        {key: "Select all...", value: ""},
        {key: "United States", value: "us"},
        {key: "Canada", value: "ca"},
        {key: "Russia", value: "ru"},
        {key: "UAE", value: "ae"},
    ];


    pageNumber = 1;


    constructor(props: any) {
        super(props);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
        this.nextFeeds = this.nextFeeds.bind(this);
    }

    componentDidMount() {
        this.props.fetchFeeds();
    }

    nextFeeds() {
        this.pageNumber += 1;
        let filterObject: IFilter = {};
        if(this.props.selectedCountryFilter) {
            filterObject['country'] = this.props.selectedCountryFilter;
        }

        if(this.props.selectedCategoryFilter) {
            filterObject['category'] = this.props.selectedCategoryFilter;
        }
        this.props.fetchFeeds(filterObject, this.pageNumber, 20);
    }

    renderFeeds() {
        if(this.props.feeds) {
            return this.props.feeds.map((feed: any, index:number) => {
                return <Feed data={feed} key={index}/>
            })
        }
    }

    handleFilterSelect(event: any) {
        this.pageNumber = 1;
        if(event.target.name === 'country') {
            if(event.target.value) {
                this.props.setCountryFilter(event.target.value);
                this.props.fetchFeeds({
                        category: this.props.selectedCategoryFilter,
                        country: event.target.value
                    }, this.pageNumber)
            } else {
                this.props.removeCountryFilter();
                this.props.fetchFeeds({
                        category: this.props.selectedCategoryFilter,
                        country: ''
                    }, this.pageNumber)
            }
        } else if (event.target.name === 'category') {
            if(event.target.value) {
                this.props.setCategoryFilter(event.target.value);
                this.props.fetchFeeds({
                    category: event.target.value,
                    country: this.props.selectedCountryFilter
                    }, this.pageNumber);
            }else {
                this.props.removeCategoryFilter();
                this.props.fetchFeeds({
                        category: '',
                        country: this.props.selectedCountryFilter
                    }, this.pageNumber);
            }
        }
    }

    renderFilterOptions (optionsArray: any) {
        return optionsArray.map((option: any) =>
            <option key={option.key}
                    value={option.value}>{option.key}</option>
        )
    }

    render() {
      return (
          <div className="feeds">
              <div className="filter-list">
                  <p className="filter-heading">Filter News by</p>
                  <label htmlFor="category">
                      <p className="filter-label">Category:</p>
                      <select className="filter-select"
                              value={this.props.selectedCategoryFilter}
                              onChange={this.handleFilterSelect}
                              name="category">
                          {this.renderFilterOptions(this.filterByCategory)}
                      </select>
                  </label>
                  <label htmlFor="country">
                      <p className="filter-label">Country:</p>
                      <select className="filter-select"
                              placeholder="Please select country"
                              value={this.props.selectedCountryFilter}
                              onChange={this.handleFilterSelect}
                              name="country">
                          {this.renderFilterOptions(this.filterByCountry)}
                      </select>
                  </label>
              </div>
              <div className="feeds-container">
                  <InfiniteScroll
                      dataLength={this.props.feeds.length} //This is important field to render the next data
                      next={this.nextFeeds}
                      hasMore={true}
                      pullDownToRefresh={false}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                          <p style={{textAlign: 'center'}}>
                              <b>Yay! You have seen it all</b>
                          </p>
                      }
                      >
                      {this.renderFeeds()}
                  </InfiniteScroll>
              </div>
          </div>
      )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        fetchFeeds: actions.fetchFeeds,
        setCountryFilter: actions.countryFilterSelected,
        setCategoryFilter: actions.categoryFilterSelected,
        removeCountryFilter: actions.removeCountryFilter,
        removeCategoryFilter: actions.removeCategoryFilter
    }, dispatch)
}

const mapStateToProps = (state: any) => {
    return {
        feeds: state.feeds.feeds,
        selectedCategoryFilter: state.feeds.selectedCategoryFilter,
        selectedCountryFilter: state.feeds.selectedCountryFilter,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds);