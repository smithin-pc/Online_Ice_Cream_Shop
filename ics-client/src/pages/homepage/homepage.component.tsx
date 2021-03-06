import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoadingOverlay from "react-loading-overlay";

import { fetchIcreamStart } from '../../redux/icream/icream.action';
import Menu from '../../components/menu/menu.component';
import './homepage.styles.scss';
import { HomepageProps } from './homepage.types';
import IPagination from '../../components/pagination/pagination.component';
import { createStructuredSelector } from 'reselect';
import { selectActivePage } from '../../redux/pagination/pagination.selector';
import { GetAllICreamPayload } from '../../redux/icream/icream.types';
import Filter from '../../components/filter/filter.component';
import { isSpinnerLoading } from '../../redux/overlay/overlay.selector';

class HomePage extends React.Component<HomepageProps> {

    componentDidMount() {
        const { getAllIcream, activePage } = this.props;
        getAllIcream({
            search: "",
            page: activePage > 1 ? activePage : 0,
            filter: "",
        });
    }

    render() {
        return (
            <LoadingOverlay
                active={this.props.loading}
                spinner
                text='Frosting...'>
                <Filter />
                <Menu />
                <IPagination />
            </LoadingOverlay>
        );
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllIcream: (payload: GetAllICreamPayload) => dispatch(fetchIcreamStart(payload)),
});

const mapStateToProps = createStructuredSelector({
    activePage: selectActivePage,
    loading: isSpinnerLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);