class Clock {

    private index: number;
    private timeZone: string;
    
    private is24Format: boolean;
    private amPmString: string; 

    private hours: number; 
    private minutes: number; 
    private seconds: number; 
    
    private editMode: boolean;
    private increaseHour: boolean;

    private clockElement: HTMLElement; 
    private modeButton: HTMLButtonElement; 
    private increaseButton: HTMLButtonElement; 
    private lightButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;
    private formatButton: HTMLButtonElement;

    constructor(index: number, timeZone: string)  {
        this.index = index;
        this.timeZone = timeZone; 

        this.is24Format = true;

        const now: Date = new Date(); 
        now.setUTCHours(now.getUTCHours() + parseInt(timeZone));
        this.hours = now.getHours(); 
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds(); 

        this.editMode = false; 
        this.increaseHour = false;

        const container = document.getElementById("clockContainer");
        
        const containerChild = document.createElement("div");
        containerChild.id = "clockContainer-" + this.index;
        containerChild.classList.add('clock-container');

        const clockElementParent = document.createElement("div");
        clockElementParent.classList.add('clock'); 

        this.clockElement = document.createElement("div"); 
        this.clockElement.id = "clock-" + this.index;
        this.clockElement.classList.add('time-box');

        const clockTimeZoneElement = document.createElement("div"); 
        
        let timeZoneValue = parseInt(this.timeZone); 
        
        if(timeZoneValue == 0){
            clockTimeZoneElement.innerText = "GMT";
        }else if (timeZoneValue > 0){
            clockTimeZoneElement.innerText = "GMT+" + this.timeZone;
        }else if (timeZoneValue < 0){
            clockTimeZoneElement.innerText = "GMT-" + Math.abs(timeZoneValue); 
        }
        
        clockTimeZoneElement.id = "timezone-" + this.index;
        clockTimeZoneElement.classList.add('timezone'); 

        clockElementParent.appendChild(this.clockElement);
        clockElementParent.appendChild(clockTimeZoneElement);

        this.modeButton = document.createElement("button"); 
        this.modeButton.id = 'modeButton-'+ this.index;
        this.modeButton.innerHTML = "<span style = 'position: absolute; transform:translate(-50%, -150%) ; color: black' >Mode</span>";
        this.modeButton.classList.add('clock-button');
        this.modeButton.style.top = "0";
        this.modeButton.style.left = "50%"; 
        this.modeButton.style.transform = "translate(-50%, -100%)"; 
        this.modeButton.addEventListener('click', () => this.toggleEditMode());

        this.increaseButton = document.createElement("button"); 
        this.increaseButton.id = "increaseButton-" + this.index;
        this.increaseButton.innerHTML = "<span style = 'position: absolute; transform: translate(-50%, -270%) rotate(270deg) ; color: black' >Increase</span>";
        this.increaseButton.disabled = true;
        this.increaseButton.classList.add('clock-button'); 
        this.increaseButton.style.top = "50%";
        this.increaseButton.style.left = "100%";
        this.increaseButton.style.transform = "translate(-20%, 0) rotate(90deg)";
        this.increaseButton.style.backgroundColor = "red";
        this.increaseButton.addEventListener('click', () => this.increaseTime());

        this.lightButton = document.createElement("button");
        this.lightButton.id = "lightButton-" + this.index;
        this.lightButton.innerHTML = "<span style = 'position: absolute; transform: translate(-50%, 50%); color: black' >Light</span>";
        this.lightButton.classList.add('clock-button');
        this.lightButton.style.bottom = "0";
        this.lightButton.style.left = "50%";
        this.lightButton.style.transform = "translate(-50%, 100%)"; 
        this.lightButton.addEventListener('click', () => this.toggleLight());

        this.resetButton = document.createElement("button"); 
        this.resetButton.id = "resetButton-" + this.index; 
        this.resetButton.innerHTML = "<span style = 'position: absolute; transform: translate(-50%, 130%) rotate(270deg) ; color: black' >Reset</span>";
        this.resetButton.classList.add('clock-button');
        this.resetButton.style.top = "50%";
        this.resetButton.style.left = "0";
        this.resetButton.style.transform = "translate(-80%, -50%) rotate(90deg)";
        this.resetButton.addEventListener('click', () => this.resetTime()); 

        this.formatButton = document.createElement("button"); 
        this.formatButton.id = "formatButton-" + this.index; 
        this.formatButton.innerHTML = "<span style = 'position: absolute; transform:translate(-50%, -150%) ; color: black' >HourFormat</span>";
        this.formatButton.classList.add('clock-button');
        this.formatButton.style.top = "18.30127%";
        this.formatButton.style.left = "81.69873%";
        this.formatButton.style.transform = "translate(50%, -80%) rotate(51deg)";
        this.formatButton.addEventListener('click', () => this.formatTime()); 

        const containerBottons = document.createElement("div");
        containerBottons.id = "containerButtons"; 
        containerBottons.classList.add('clock-buttons');
        
        containerBottons.appendChild(this.modeButton);
        containerBottons.appendChild(this.increaseButton);
        containerBottons.appendChild(this.lightButton);
        containerBottons.appendChild(this.resetButton);
        containerBottons.appendChild(this.formatButton);

        containerChild.appendChild(clockElementParent);
        containerChild.appendChild(containerBottons)

        container.appendChild(containerChild); 

        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    private updateTime(): void {

        let amPm = this.is24Format ? "" : this.amPmString; 
        
        this.clockElement.innerText = `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0') }  ${this.is24Format ? "" : " | " + this.amPmString}`  ;
        this.seconds++;
        if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes === 60) {
            this.minutes = 0;
            this.hours = (this.hours + 1) % 24;
        }
        }
 
      }

      private increaseTime(): void {
        if (this.editMode) {
          if (this.increaseHour) {
            if(this.is24Format) {
                if (this.hours < 23) {
                    this.hours++;
                  } else {
                    this.hours = 0;
                  }
            }else {
                if(this.hours < 12){
                    this.hours++; 
                }else {
                    let toggle = true; 
                    this.hours = 1; 
                    if(this.amPmString == "AM" ){
                        this.amPmString = "PM";
                        toggle = false; 
                    }
                    if(this.amPmString == "PM" && toggle){
                        this.amPmString = "AM";
                    }
                }
            }
            
          } else {
            if (this.minutes < 59) {
              this.minutes++;
            } else {
              this.minutes = 0;
            }
          }
          this.updateTime();
        }
      }

      private toggleEditMode(): void {
        if (!this.editMode) {
          this.editMode = true;
          this.increaseHour = true;
          
        } else {
          if (this.increaseHour) {
            this.increaseHour = false;
          } else {
            this.editMode = false;
          }
        }
        this.increaseButton.disabled = !this.editMode;
        this.increaseButton.style.backgroundColor = this.increaseButton.disabled  ? "red" : "#008080";
      }

      private toggleLight(): void {
        if (this.clockElement.style.backgroundColor == "white"){
            this.clockElement.style.backgroundColor = "yellow"; 
        }else {
            this.clockElement.style.backgroundColor = "white";
        }
      }

      private resetTime(): void {
        const now: Date = new Date(); 
        now.setUTCHours(now.getUTCHours() + parseInt(this.timeZone));
        this.hours = now.getHours(); 
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        
        if(this.is24Format){
            if(this.amPmString == "PM"){
                this.hours = this.hours + 12; 
            }
        }else {
            if(this.hours > 12){
                this.hours = this.hours - 12; 
                this.amPmString = "PM"; 
            }else {
                this.amPmString = "AM"; 
            }
        }

        this.updateTime(); 
      } 

      private formatTime(): void {
        this.is24Format = !this.is24Format; 

        if(this.is24Format){
            if(this.amPmString == "PM"){
                this.hours = this.hours + 12; 
            }
        }else {
            if(this.hours > 12){
                this.hours = this.hours - 12; 
                this.amPmString = "PM"; 
            }else {
                this.amPmString = "AM"; 
            }
        }

        this.updateTime(); 
        
    } 

}

export default Clock; 