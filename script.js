

class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, isActive: false};
        // Привязали конктекст, без этого не заработает херня эта

        this.on = this.on.bind(this)
        this.off = this.off.bind(this)
        this.pause = this.pause.bind(this)
        this.reset = this.reset.bind(this)
    }

tick() {
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;
    let milliseconds = this.state.milliseconds;

    milliseconds +=4;
    if(milliseconds>=1000){
        seconds +=1
        milliseconds=0
    }
    if(seconds==60){
        minutes +=1
        seconds=0
    }
    if(minutes==60) {
        hours +=1
        minutes=0
    }

        this.setState({milliseconds:milliseconds, seconds:seconds, minutes:minutes, hours:hours});
    
}

on(){
    if(this.state.isActive){
        return
    }
    this.interval = setInterval(() => this.tick(), 1);
    this.setState({isActive: true});
}

pause(){
    clearInterval(this.interval);
    this.setState({isActive: false});
}

reset(){
    this.setState({milliseconds: 0, seconds: 0, minutes: 0, hours: 0})
}

off(){
    this.pause()
    this.reset()
}

render(){
    return (
        <div className="sverxTimer">
        <div className="timer">
        <span>{zero10(this.state.hours)}:</span>
        <span>{zero10(this.state.minutes)}:</span>
        <span>{zero10(this.state.seconds)}.</span>
        <span>{zero100(this.state.milliseconds)}</span>
            </div>
        <div className="buttons_timer">
        <button className="timer_b" onClick={this.on}>ON</button>
        <button className="timer_b" onClick={this.off}>OFF</button>
            </div>
        <div className="buttons_timer_bot">
        <button className="timer_a" onClick={this.reset}>RESET</button>
        <button className="timer_a" onClick={this.pause}>PAUSE</button>
            </div>
        </div>
    );
}
}

function zero10 (n){
    if(n<10){
        return "0"+n
    }
    return n
}
function zero100 (n){
    if(n<100){
        if(n<10){
            return "00"+n
        }
        return "0"+n
    }
    return n
}

ReactDOM.render(<Timer/>, document.querySelector(".spliti"))