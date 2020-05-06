import JitsiConferenceManager from '../../lib/jitsiManager/jitsiConferenceManager'
import React from 'react'
import SettingsButton from './controls/settingsButton'
import SuperView from './superView'
import VideoChatControls from './controls/videoChatControls'
import ViewButton from './controls/viewButton'
import _chunk from 'lodash/chunk'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'

@observer
export default class VideoChat extends React.Component {
  constructor (props) {
    super(props)

    this.conference = this.props.conference
    this.handleViewChange = this.handleViewChange.bind(this)
    this.handleCropChange = this.handleCropChange.bind(this)
    this.autoSwitchView = this.autoSwitchView.bind(this)

    // these are dangerous because they trigger double renders
    this.conference.on(JitsiConferenceManager.events.PARTICIPANT_JOINED, this.autoSwitchView)
    this.conference.on(JitsiConferenceManager.events.PARTICIPANT_LEFT, this.autoSwitchView)

    window.addEventListener('resize', debounce(this.autoSwitchView, 50))

    this.state = {
      view: 'single',
      crop: true,
      autoSwitchView: true
    }
  }

  autoSwitchView () {
    if (this.state.autoSwitchView) {
      let { conference } = this.props
      let { view, crop } = this.state
      let width = document.documentElement.offsetWidth

      if (width < 960) {
        crop = true
      }

      if (conference.participants.length >= 2) {
        view = 'grid'
      } else {
        view = 'single'
      }

      this.setState({ view, crop })
    }
  }

  handleViewChange (view) {
    this.setState({ view: view, autoSwitchView: false })
  }

  handleCropChange (crop) {
    this.setState({ crop: crop, autoSwitchView: false })
  }

  render () {
    const { localParticipant, status } = this.props.conference

    return status === 'joined' ? (
      <div className='videoChat'>
        <header>
          <h1>bipbop</h1>
          <div className='controls'>
            <div className='right'>
              <ViewButton onToggle={this.handleViewChange} />
              <SettingsButton localParticipant={localParticipant} />
            </div>
          </div>
        </header>
        <SuperView conference={this.props.conference} view={this.state.view} crop={this.state.crop} />
        <VideoChatControls
          conference={this.props.conference}
          localParticipant={localParticipant}
          view={this.state.view}
          crop={this.state.crop}
          onLeave={this.props.onLeave}
          onToggleChat={this.props.onToggleChat}
          onViewChange={this.handleViewChange}
          onCropChange={this.handleCropChange}
          />
      </div>
    ) : null
  }
}
