import React from 'react'
import { ClientCaseItem } from '../../../types/Cards'
type CaseCardProps = {
  item : ClientCaseItem 
  }

export default function ClientCard({
  item
} : CaseCardProps) {
  const {
    id,
    status,
    description,
    category,
    createdAt,
    updatedAt,
    client
  } = item
  const {
    profile
  } = client
   const avatar = profile?.avatar
    const displayname = profile?.displayname
    const location = profile?.location
  return <></>


}
