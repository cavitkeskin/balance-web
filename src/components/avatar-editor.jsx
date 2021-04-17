import React, { useState } from 'react'
// import axios from 'axios'
import AvatarEditor from 'react-avatar-editor'
import PropTypes from 'prop-types'
import { Card, Slider, IconButton, CardContent, CardActions, Box } from '@material-ui/core'

import OpenIcon from '@material-ui/icons/FolderOpen'
import SaveIcon from '@material-ui/icons/Check'

const Editor = ({ value, onChange, ...props }) => {
  let fileInput = React.createRef()
  let avatarEditor = React.createRef()
  const [scale, setScale] = React.useState(1)
  const [imageUrl, setImageUrl] = useState(value)

  const handleScaleChange = (event, value) => {
    setScale(value)
  }

  React.useEffect(() => {
    setScale(1)
    setImageUrl(value)
  }, [value])

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    let fileReader = new FileReader()
    fileReader.onloadend = () => {
      let content = fileReader.result
      console.log({ content })
      setImageUrl(content)
    }
    fileReader.readAsDataURL(event.target.files[0])
  }

  const saveImageHandle = () => {
    const canvas = avatarEditor.current.getImageScaledToCanvas()
    onChange(canvas.toDataURL('image/jpeg', .98))
  }

  const size = 240
  return (
    <Card {...props}>  
      <CardContent>
        {imageUrl 
          ? <AvatarEditor 
            ref={avatarEditor}
            image={imageUrl||''} 
            width={size} height={size} 
            border={0} color={[0, 0, 0, 0.3]}
            scale={scale} 
            borderRadius={size/2}
            style={{ display: 'block', margin: '0 auto' }}/>
          : <div style={{ width:size, height: size, backgroundColor: '#aaa', display: 'block', margin: '0 auto' }}>
            <div style={{ width:size, height: size, borderRadius: '50%', backgroundColor: '#fff', display: 'flex',
              justifyContent: 'center',
              alignItems: 'center' }}>
              <IconButton onClick={() => {fileInput.current.click()}}><OpenIcon style={{ fontSize: size/4 }}/></IconButton>
            </div>
          </div>}
      </CardContent>
      <CardActions>
        <Box style={{ padding: '0 1rem', flexGrow: 1 }}>
          <Slider 
            value={scale}
            disabled={!imageUrl}
            min={1} max={5} step={0.01} 
            onChange={handleScaleChange}/>
        </Box>
        <input type="file" ref={fileInput} style={{ display:'none' }} onChange={handleFileChange}/>
        <IconButton onClick={() => {fileInput.current.click()}}><OpenIcon/></IconButton>  
        <IconButton onClick={saveImageHandle} disabled={!imageUrl}><SaveIcon/></IconButton>  
      </CardActions>
    </Card>
  )
}

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Editor