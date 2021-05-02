import {Component,componentDidMount,createRef} from 'react' ;
import Talk from "talkjs"; 




class InboxApp extends Component{
    constructor(props) {
      super(props)
      this.talkjsContainer = createRef();
    }
  
    componentDidMount() {    
      Talk.ready.then(() => {
        var me = new Talk.User({
          id: parseInt(Math.random()*500000).toString(),
          name: "Lakshmi Narayanan",
          email: "demo@talkjs.com",
          photoUrl: "https://demo.talkjs.com/img/alice.jpg",
          welcomeMessage: "hello)",
          role: "booker"
        });
        
        window.talkSession = new Talk.Session({
          appId: "tZKuGYj1",
          me: me
        });
        
        var other = new Talk.User({
          id: parseInt(Math.random()*500000).toString(),
          name: "MAGESHSUNDAR G",
          email: "demo@talkjs.com",
          photoUrl: "http://localhost:3000/static/media/avatar.cb4b66b4.jpg",
          welcomeMessage: "Hello",
          role: "booker"
        });
  
        var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        
        var inbox = window.talkSession.createInbox({selected: conversation});
        inbox.mount(this.talkjsContainer.current);
      });
    }
  
    render() {
      return (
        <div ref={this.talkjsContainer} className="chatbox-container"></div>
      )
    }
  }

  export default InboxApp;
  