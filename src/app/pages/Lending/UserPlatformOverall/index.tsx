import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { UserPlatformsOverall } from './UserPlatformOverall'

export const UserPlatformsOverallPage = () => {
  return (
      <Card>
        <CardContent>
          <UserPlatformsOverall />
        </CardContent>
      </Card>
  )
}