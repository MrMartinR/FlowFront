import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import PlatformsList from './PlatformsList'
import PlatformsFilters from './PlatformsFilters'

import * as platformsActions from "../../../redux/platforms/platformsActions";
import { AutoSizer } from "react-virtualized";
import { Typography } from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const list = []

for (let i = 0; i < 1000; i++) {
  list.push({ 
    status: `${i} Brian Vaughn`,
    logo: `<svg enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="256" fill="#F0F0F0"/><g fill="#D80027"><path d="M244.87,256H512c0-23.106-3.08-45.49-8.819-66.783H244.87V256z"/><path d="m244.87 122.44h229.56c-15.671-25.572-35.708-48.175-59.07-66.783h-170.49v66.783z"/><path d="M256,512c60.249,0,115.626-20.824,159.356-55.652H96.644C140.374,491.176,195.751,512,256,512z"/><path d="m37.574 389.56h436.85c12.581-20.529 22.338-42.969 28.755-66.783h-494.36c6.417 23.814 16.174 46.254 28.755 66.783z"/></g><path d="m118.58 39.978h23.329l-21.7 15.765 8.289 25.509-21.699-15.765-21.699 15.765 7.16-22.037c-19.106 15.915-35.852 34.561-49.652 55.337h7.475l-13.813 10.035c-2.152 3.59-4.216 7.237-6.194 10.938l6.596 20.301-12.306-8.941c-3.059 6.481-5.857 13.108-8.372 19.873l7.267 22.368h26.822l-21.7 15.765 8.289 25.509-21.699-15.765-12.998 9.444c-1.301 10.458-1.979 21.11-1.979 31.921h256v-256c-50.572 0-97.715 14.67-137.42 39.978zm9.918 190.42-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765 8.289 25.509zm-8.289-100.08 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm100.12 100.08-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765 8.289 25.509zm-8.289-100.08 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm0-74.574 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765z" fill="#0052B4"/></svg>`,
    country: "country",
    category: "cat",
    min_investment: "$300",
    protection_scheme: "pro icon",
    secondry_market: 'sec markit',
    sync: 'sec markit',
  });
}

export const PlatformsPage = ({ history }) => {

  const [ filterOpen, setFilterOpen ] = useState(false)

  const dispatch = useDispatch();

  const { platformsState } = useSelector(
    (state) => ({ platformsState: state.platforms }),
    shallowEqual
    );

  useEffect(() => {
    dispatch(platformsActions.fetchPlatforms())
  }, [dispatch])

  useEffect(() => {
    console.log(platformsState);
  }, [platformsState])

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <div className="pf_main">
      <Route path="/platforms/detail">
        {({ history, match }) => (
          // <AccountCreateDialog
          //   countriesTable={countriesState && countriesState.countryTable ? countriesState.countryTable.entities : null} 
          //   currencyTable={currenciesState && currenciesState.currencyTable ? currenciesState.currencyTable.entities : null}
          //   show={match != null}
          //   onHide={() => {
          //     history.push("/platforms");
          //   }}
          // />
          null
        )}
      </Route>
      <Modal
        open={filterOpen}
        onClose={handleFilterClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={filterOpen}>
          <PlatformsFilters setFilterOpen={setFilterOpen} />
        </Fade>
      </Modal>
      <AutoSizer style={{ height: '100%', width:"100%", maxWidth: '910px', boxShadow: '0px 0px 10px #bbb'}}>
        {({ height, width }) => {
          return <div style={{height: height}}>
            <div className="pf_topBar" style={{height: '30px'}}>
              <Typography variant="h5"> Platforms </Typography>
              <IconButton size="small" color="default" onClick={handleFilterOpen} >
                <FilterList />
              </IconButton>
            </div>
            <div className="pf_container" style={{height: height-30}}>
              <PlatformsList width={910} height={height-30} list={platformsState.filteredTable} />
            </div>
          </div>
        }}
      </AutoSizer>
    </div>
  );
}
