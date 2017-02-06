import React from 'react';
import './Player.css';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = { play: false };
  }

  componentWillReceiveProps() {
    this.setState({ play: true });
  }

  moveHandle = (e) => {
    var timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    var newMargLeft = e.pageX - this.timeline.offsetLeft;
    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      this.handle.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
      this.handle.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
      this.handle.style.marginLeft = timelineWidth + "px";
    }
  }

  play = () => {
    if (this.state.play) {
      this.setState({ play: false });
      this.audio.pause();
    } else {
      this.setState({ play: true });
      this.audio.play();
    }
  }

  render() {
    return <div>
      <audio src={this.props.audio}
        ref={(audio) => { this.audio = audio } }
        autoPlay
        />
      <div onClick={this.play} className={!this.state.play ? "icon ion-play" : "icon ion-pause"} />
      <div id="timeline" ref={(timeline) => { this.timeline = timeline }}>
        <div id="handle" onClick={this.moveHandle} ref={(handle) => { this.handle = handle }} />
      </div>
    </div>
  }
}

// constructor(props) {
//         super(props);
//         this.state = { playButtonText: "Play" };
//     }

//     play = () => {
//         if (this.audio.paused) {
//             this.setState({ playButtonText: "Pause" });
//             this.audio.play();
//         } else {
//             this.setState({ playButtonText: "Play" });
//             this.audio.pause();
//         }
//     }

//     render() {

//         let player = this.props.audio ?
//             <audio
//                 src={this.props.audio}
//                 style={{ display: "none" }}
//                 ref={(audio) => { this.audio = audio } }
//                 autoPlay
//                 />
//             : <div>Audio Player Here</div>;

//         return <div>
//             {player}
//             <div onClick={this.play}>{this.state.playButtonText}</div>
//             <div>Next</div>
//             <div>Prev</div>
//             <div id="timeline">
//                 <div id="handle" />
//             </div>
//         </div>
//     }