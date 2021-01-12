import * as React from 'react';
import { XGrid, LicenseInfo } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';


LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );

const Originators = () => {
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

export default Originators;