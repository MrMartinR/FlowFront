import React, { useEffect, useState } from 'react'

const getUrlFromSvgString = (string) => {
  let blob = new Blob([string], {type: 'image/svg+xml'});
  let url = URL.createObjectURL(blob);
  return url;
}

const SvgDisplayComponent = ({svgData, width, height}) => {

  const [svgUrl, setSvgUrl] = useState(null)

  useEffect(()=>{
    if (svgData && !svgUrl) {
      setSvgUrl(getUrlFromSvgString(svgData))
    }
    return ()=>{URL.revokeObjectURL(svgUrl)}
  }, [svgData, svgUrl])

  return (
    <img width={width} height={height} alt="" src={svgUrl}/>
  )
}

export default SvgDisplayComponent
