import React from 'react'
import CardSample from '@/components/card-sample'

// Material
import { Grid } from '@material-ui/core'

// components
import Page from '@/components/page'
import Content from '@/components/content'
import AvatarEditor from '../../components/avatar-editor'

import Header from './header'

const Dashboard = () => {
  const [imgData, setImgData] = React.useState(null)
  return (
    <Page>
      <Header/>
      <Content>
        <Grid container spacing={2}>
          {[...Array(1).keys()].map(n => (
            <Grid item key={n} sm={12} md={6} lg={4}>
              <CardSample n={n}/>
            </Grid>
          ))}
          <Grid item>
            <AvatarEditor value={imgData} onChange={setImgData}/>
          </Grid>
          <Grid item xs={12}><img src={imgData}/></Grid>
        </Grid>
        
      </Content>
    </Page>
  )
}

export default Dashboard
