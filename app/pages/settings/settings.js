import {Page, NavController} from 'ionic/ionic';
import {Shared} from '../../core/shared'

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage extends Shared
{
    //Setup my class defaults
  constructor(nav: NavController)
  {
    super();
    this.nav = nav;
  }

  onPageWillLeave()
  {
    Shared.getSettings().storeSettings( this );
    console.log("Leaving page");
  }

    //Reset to the default state
  resetTimer()
  {
    Shared.getSettings().resetTimer();
  }
}