import React from 'react'
import CompanyForm from './TEMP_CompanyForm'
import IndividualForm from './IndividualForm'

// add country later when the module is implemented
export const ContactAdd = (props: any) => {
  const { kind, visibility } = props

  const company = <CompanyForm kind={kind} visibility={visibility} />

  const individual = <IndividualForm kind={kind} visibility={visibility} />
  return <>{kind === 'Company' ? <>{company}</> : <>{individual}</>}</>
}

export default ContactAdd
