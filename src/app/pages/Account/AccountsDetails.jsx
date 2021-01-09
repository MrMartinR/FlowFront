import React, { useEffect, useState } from "react";
import {
  Card,
} from "@material-ui/core";
import {Typography} from '@material-ui/core';
import {Chip} from '@material-ui/core';
import { CardHeader } from "@material-ui/core";
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';


export function AccountsDetails({selectedItemIndex, list, currencyTable, countriesTable}) {

  const [currencies, setCurrencies] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    // console.log(list[selectedItemIndex]);
    // console.log(currencyTable);
    // console.log(countriesTable);
    if (list[selectedItemIndex] && currencyTable && countriesTable) {
      // console.log(list[selectedItemIndex]);
      let countryIds = list[selectedItemIndex].country_id
      let currencyIds = list[selectedItemIndex].currency_id
  
      let currencyNames = []
      let countryNames = []
  
      for (let i=0 ; i<currencyTable.length ; i++) {
        if (currencyIds.includes(currencyTable[i].id)) {
          currencyNames.push(currencyTable[i].name);
        }
      }
      for (let i=0 ; i<countriesTable.length ; i++) {
        if (countryIds.includes(countriesTable[i].id)) {
          countryNames.push(countriesTable[i].name);
        }
      }
  
      setCurrencies(currencyNames);
      setCountries(countryNames);
    }
    
  }, [list, selectedItemIndex, currencyTable, countriesTable])

  const getUrlFromSvgString = (string) => {
    let blob = new Blob([string], {type: 'image/svg+xml'});
    let url = URL.createObjectURL(blob);
    return url;
  }

  return (
    <Card style={{marginLeft: '1rem', width: "100%", minWidth: "400px"}}>
      {/* <CardBody> */}
        <div style={{display: 'flex', flexDirection:"row", justifyContent: 'flex-start', padding: "4rem"}}>
          <div style={{width: "4rem", height: "4rem", marginRight: "2rem", borderColor: "#666", borderWidth: ".2rem", borderRadius: ".4rem"}}>
            <img alt="" src={list[selectedItemIndex] ? getUrlFromSvgString(list[selectedItemIndex].icon) : null}/>
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h2">{list[selectedItemIndex] ? list[selectedItemIndex].name : "-"}</Typography>
            <Typography style={{color: 'gray'}} variant="h5">{list[selectedItemIndex] ? list[selectedItemIndex].category : "-"}</Typography>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: (window.innerWidth < 600) ? 'column' : 'row'}}>
          <Card style={{width: "350px", height: "200px", margin: "1rem", borderWidth: "0.1rem", borderStyle: "solid", borderColor: '#eee'}}>
            <CardHeader style={{textAlign: 'center'}} title="Currencies" />
            {/* <CardBody style={{padding: "1rem"}}> */}
              {/* <Typography variant="h5" style={{textAlign: 'center', marginBottom: "2rem", borderBottomWidth: "0.1rem", borderBottomColor: "#ccc", borderBottomStyle: "solid"}}>Currencies</Typography> */}
              {currencies && currencies.map((value, index) => (
                <Chip key={index} label={value} style={{marginRight: ".4rem"}} />
              ))}
            {/* </CardBody> */}
          </Card>

          <Card style={{width: "350px", height: "200px", margin: "1rem", borderWidth: "0.1rem", borderStyle: "solid", borderColor: '#eee'}}>
            <CardHeader style={{textAlign: 'center'}} title="Countries" />
            {/* <CardBody style={{padding: "1rem"}}> */}
              {/* <Typography variant="h5" style={{textAlign: 'center', marginBottom: "2rem", borderBottomWidth: "0.1rem", borderBottomColor: "#ccc", borderBottomStyle: "solid"}}>Countries</Typography> */}
              {countries && countries.map((value, index) => (
                <Chip key={index} label={value} style={{margin: ".4rem"}} />
              ))}
            {/* </CardBody> */}
          </Card>
        </div>


        {/* <ExpansionPanel square>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5">Currencies</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {currencies && currencies.map((value, index) => (
              <Chip key={index} label={value} style={{margin: ".4rem"}} />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel square>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5">Countries</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {countries && countries.map((value, index) => (
              <Chip key={index} label={value} style={{margin: ".4rem"}} />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel> */}

      {/* </CardBody> */}
    </Card>
  );
}