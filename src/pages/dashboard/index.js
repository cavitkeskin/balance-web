import React from 'react'
import CardSample from '@/components/card-sample'

// Material
import { Grid } from '@material-ui/core'

// components
import Page from '@/components/page'
import Content from '@/components/content'
import AvatarEditor from '../../components/avatar-editor'

import Header from './header'

const invitationId = '60b75fc52f6f6d03beeef4f8'

const testLinks = [
  { title: 'fpbook://',
    children: [
      { url: 'fpbook://auth/reset/123456', title: 'auth/reset/123456' },
    ],
  },
  { title: 'https://books.fivepebble.com/', 
    children: [
      { url: 'https://books.fivepebble.com/auth/reset/123456', title: 'auth/reset/123456' },
      { url: `https://books.fivepebble.com/confirm/invitation/${invitationId}`, title: 'confirm/invitation/:token' },
    ],
  },
  { title: 'exp://0.0.0.0:19000/--/', 
    children: [
      { url: 'exp://0.0.0.0:19000/--/auth/reset/123456', title: 'auth/reset/123456' },
      { 
        url: `exp://0.0.0.0:19000/--/confirm/invitation/${invitationId}`, 
        title: `confirm/invitation/${invitationId}` },
      { 
        url: `exp://0.0.0.0:19000/--/confirm/invitation/${invitationId}/deny`, 
        title: 'confirm/invitation/:token/deny' },
      { 
        url: `exp://0.0.0.0:19000/--/confirm/invitation/${invitationId}/accept`, 
        title: 'confirm/invitation/:token/accept' },
    ],
  },
]

const Dashboard = () => {
  const [imgData, setImgData] = React.useState(null)
  return (
    <Page>
      <Header/>
      <Content>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            {testLinks.map(({ title, children }, n) => (
              <div key={n}>
                <h4 style={{ marginBottom: 4 }}>{title}</h4>
                <ol style={{ paddingLeft: 26, margin: 0 }}>
                  {children.map(({ url, title }, n) => (
                    <li key={n}><a href={url}>{title||url}</a></li>
                  ))}
                </ol>
              </div>
            ))}
          </Grid>
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
