/**
 * Created by ldupin on 1/4/16.
 */

import {Howl} from './howler'

export class Shared
{
  static instance: Shared;

  static TIMER_IDLE: Number;
  static TIMER_RUNNING: Number;
  static TIMER_ELAPSED: Number;
  static LOSER_COUNTDOWN: Number;

  //return my settings
  static getSettings()
  {
    if (typeof Shared.instance == 'undefined')
      Shared.instance = new Shared();

    return Shared.instance;
  }

  //Setup my class defaults
  constructor()
  {
    Shared.TIMER_IDLE = 0;
    Shared.TIMER_RUNNING = 1;
    Shared.TIMER_ELAPSED = 2;
    Shared.LOSER_COUNTDOWN = 3;

    if (typeof Shared.instance == 'undefined')
    {
      this.minAlert = 5;
      this.maxAlert = 8;
      this.preAlert = 10;
      this.loserCountdown = 20;
      this._mode = Shared.TIMER_IDLE;
      this._func = null;
      this._scope = null;
      this._resetCount = 0;
      this._loserCount = 0;
      this._timerId = [];

      //Play the boat craft alarm
      this._soundTheme = new Howl({ urls: ['/android_asset/www/sounds/staying.mp3'] });
      this._soundCountdown = new Howl({ urls: ['/android_asset/www/sounds/jeopardy.mp3'] });
      this._soundWarning = new Howl({ urls: ['/android_asset/www/sounds/trans.mp3'] });
      this._soundWaka = new Howl({ urls: ['/android_asset/www/sounds/boing.mp3'] });
    }
    else
      this.storeSettings( Shared.instance );
  }

  //Return the mode
  currentMode() { return Shared.instance._mode }

  //Store my callback
  storeCallback( scope, func )
  {
    Shared.instance._func = func;
    Shared.instance._scope = scope;
  }

  //Call the user callback
  _usrCallback( mode, param )
  {
    Shared.instance._scope[Shared.instance._func]( mode, param );
  }

  //Store settings
  storeSettings( settings )
  {
    ['minAlert', 'maxAlert', 'preAlert', 'loserCountdown'].forEach((x) => {
      this[x] = settings[x];
    })
  }

  //User button click
  buttonClick()
  {
    let self = Shared.getSettings();

      //Quit if the user hasn't given us a callback
    if ( self._func == null )
    {
      console.log("No function callback given");
      return;
    }

      //Handle user input
    switch ( self._mode )
    {
      case Shared.TIMER_IDLE:
        self._mode = Shared.TIMER_RUNNING;
        self._resetCount = 0;
        self._startTimer();
        self._usrCallback( self._mode, 0 );
        break;

      case Shared.TIMER_RUNNING:
        if ( (++self._resetCount) >= 5 )
        {
          self._mode = Shared.TIMER_IDLE
          self._resetCount = 0;
          self.resetTimer();
        }
        else
          self._playWakaWaka();

        self._usrCallback( self._mode, self._resetCount );
        break;

      case Shared.TIMER_ELAPSED:
        self._startLoserCountdown();
        self._resetCount = 0;
        self._loserCount = self.loserCountdown;
        self._mode = Shared.LOSER_COUNTDOWN;
        self._usrCallback( self._mode, self._loserCount );
        break;

      case Shared.LOSER_COUNTDOWN:
        if ( (++self._resetCount) >= 5 )
        {
          self._mode = Shared.TIMER_IDLE
          self._resetCount = 0;
          self.resetTimer();
          self._usrCallback_func( self._mode, 0 );
        }
        else
          self._playWakaWaka();
        break;

      default:
        console.log("Unknown mode: "+ self._mode);
        break;
    }
  }

  //Reset my timers and put everything back into a normal state
  resetTimer()
  {
    let self = Shared.getSettings();

      //Reset my mode and timer
    self._mode = Shared.TIMER_IDLE;
    self._resetCount = 0;

      //Kill all timer
    self._timerId.forEach( (x) => { clearTimeout( x ); })
    self._timerId = [];
  }


  //*** Private methods

    //Start the countdown timer
  _startTimer()
  {
    let self = Shared.getSettings();

      //Get my ticks before this will go off
    let tick_span = (self.maxAlert - self.minAlert) * Math.random();
    let ticks = (tick_span + self.minAlert) * 60 * 1000;

      //Add the random timer in
    self._timerId.push( setTimeout( Shared.instance._timerElapsed, ticks ));

      //Do we have a pre warning?
    if ( self.preAlert > 0 )
      self._timerId.push( setTimeout( Shared.instance._playPreAlert, ticks - self.preAlert * 1000 ));
  }

  //Timer has elapsed!
  _timerElapsed()
  {
    let self = Shared.getSettings();

      //Play the sound!
    self._soundTheme.play();

      //Let the user know whats up
    self._mode = Shared.TIMER_ELAPSED;
    self._resetCount = 0;
    self._usrCallback( self._mode, 0 );
  }

  //Loser countdown
  _loserCountdown()
  {
    let self = Shared.getSettings();

      //Update my count down
    if ( --self._loserCount <= 0 )
    {
      this._soundWaka.play();

        //Reset everything back to a known state
      self.resetTimer();

        //Start my new timer
      self._mode = Shared.TIMER_RUNNING;
      self._resetCount = 0;
      self._startTimer();
    }

      //Update what we are doing
    self._usrCallback( self._mode, self._loserCount );
  }

  //Play a warning sound
  _playPreAlert()
  {
    let self = Shared.getSettings();

    self._soundWarning.play();
  }

  //Play a waka sound
  _playWakaWaka()
  {
    this._soundWaka.play();
  }

  //Start the loser countdown
  _startLoserCountdown()
  {
    this._soundCountdown.play();

      //Add the random timer in
    self._timerId.push( setInterval( Shared.instance._loserCountdown, 1000 ));
  }
}
