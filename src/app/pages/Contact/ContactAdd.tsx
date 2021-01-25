import React from 'react'
import CompanyForm from './CompanyForm'
import IndividualForm from './IndividualForm'

// add country later when the module is implemented
export const ContactAdd = (props: any) => {
  const { kind, visibility } = props

  const company = <CompanyForm kind={kind} visibility={visibility} />

  const individual = <IndividualForm kind={kind} visibility={visibility} />
  return <div>{kind === 'Company' ? <div>{company}</div> : <div>{individual}</div>}</div>
}

export default ContactAdd
