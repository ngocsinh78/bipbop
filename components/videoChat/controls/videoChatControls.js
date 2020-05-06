import CropButton from './cropButton'
import DetectRTC from 'detectrtc'
import LeaveButton from './leaveButton'
import MicButton from './micButton'
import React from 'react'
import ScreenShareButton from './screenShareButton'
import TextChatButton from './textChatButton'
import VideoButton from './videoButton'
import ViewButton from './viewButton'

export default class VideoChatControls extends React.Component {
  constructor (props) {
    super(props)

    // TODO: Safari should work but it's failing right now so disable it
    this.canScreenCapture = DetectRTC.isScreenCapturingSupported && !DetectRTC.isMobileDevice && !DetectRTC.browser.isSafari
  }

  render () {
    return (
      <footer className='controls'>
        <div className='left'>
          {this.canScreenCapture &&
            <ScreenShareButton localParticipant={this.props.localParticipant} />
          }
        </div>
        <div className='center'>
          <MicButton localParticipant={this.props.localParticipant} />
          <LeaveButton localParticipant={this.props.localParticipant} onLeave={this.props.onLeave} />
          <VideoButton localParticipant={this.props.localParticipant} />
        </div>
        <div className='right'>
          <ViewButton view={this.props.view} onToggle={this.props.onViewChange} />
          <CropButton crop={this.props.crop} onToggle={this.props.onCropChange} />
          {/* <TextChatButton conference={this.props.conference} onToggleChat={this.props.onToggleChat} /> */}
        </div>
      </footer>
    )
  }
}
