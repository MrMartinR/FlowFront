import React from 'react'
import CompanyForm from './CompanyForm'
import IndividualForm from './IndividualForm'

// add country later when the module is implemented
export const ContactAdd = (props: any) => {
  const { kind, visibility, country, selectedContact, edit, setOpen } = props

  const company = <CompanyForm 
                        kind={kind} 
                        visibility={visibility}
                        setOpen = { setOpen } 
                        selectedContact = { selectedContact }
                        edit = { edit }
                        country = { country } />

  const individual = <IndividualForm 
                        kind={kind} 
                        visibility={visibility}
                        setOpen = { setOpen }
                        selectedContact = { selectedContact }
                        edit = { edit }
                        country = { country } />
  return <>{kind === 'Company' ? <>{company}</> : <>{individual}</>}</>
}

export default ContactAdd
