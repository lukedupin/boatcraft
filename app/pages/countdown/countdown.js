import {Page, NavController} from 'ionic/ionic';
import {Shared} from '../../core/shared'

@Page({
  templateUrl: 'build/pages/countdown/countdown.html'
})
export class CountdownPage
{
  constructor(nav: NavController)
  {
    this.nav = nav;
    this.headerText = "Waiting to start game";
    this.buttonText = "Press to start game";
  }

  ngAfterViewInit()
  {
    Shared.getSettings().storeCallback( this, "_callback" );
  }

  userClick()
  {
    Shared.getSettings().buttonClick();
  }


  _callback( mode, reset, countdown )
  {
    switch ( mode )
    {
      case Shared.TIMER_IDLE:
        this.headerText = "Waiting to start game";
        this.buttonText = "Press to start game";
        break;

      case Shared.TIMER_RUNNING:
        this.headerText = "Timer is running";
        this.buttonText = "Click to reset ("+ (5 - reset) +")";
        break;

      case Shared.TIMER_ELAPSED:
        this.headerText = "Boat craft time!!!!!!";
        this.buttonText = "Click to start return countdown";
        break;

      case Shared.LOSER_COUNTDOWN:
        this.headerText = "Seconds remaining before game resumes: "+ countdown;
        this.buttonText = "Click to reset ("+ (5 - reset) +")";
        break;

      default:
        console.log("Unknown mode: "+ mode);
        break;
    }
  }
}
