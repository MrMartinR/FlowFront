import * as React from 'react';
import { XGrid, LicenseInfo } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';


LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );

export const PlatformsPage = () => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
  });

  return (
    <div style={{ height: 600, width: '100%' }}>
      <XGrid
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
      />
    </div>
  );
}

// export default PlatformsPage;



// import React from "react"
// // import PlatformsList from './PlatformsList'
// import { XGrid } from '@material-ui/x-grid';
// // import { useDemoData } from '@material-ui/x-grid-data-generator';


// const PlatformsPage = () => {
//   return (
//     <div style={{ height: 520, width: '100%' }}>
//       <XGrid></XGrid>
//     </div>
//   )

// }

// export default PlatformsPage;

// // export default function XGridDemo() {
// //   const { data } = useDemoData({
// //     dataSet: 'Commodity',
// //     rowLength: 100000,
// //   });

// //   return (
// //     <div style={{ height: 520, width: '100%' }}>
// //       <XGrid
// //         {...data}
// //         loading={data.rows.length === 0}
// //         rowHeight={38}
// //         checkboxSelection
// //       />
// //     </div>
// //   );
// // }


// // export const PlatformsPage = () => {
// //   return (
// //         <Grid 
// //           container 
// //           direction="column"
// //          >
// //           <Card>
// //             <Toolbar variant="dense">
// //               <InputBase placeholder="Search…" />
// //             </Toolbar>
// //           </Card>
          
// //           <Card>
// //             <CardHeader title="Platforms List" />
// //           <CardContent>
// //             Table Grid X
// //           {/* <PlatformsList /> */}
// //           </CardContent>
// //           </Card>

// //          </Grid>
// //     );

// // }
