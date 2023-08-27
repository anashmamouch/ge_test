import './index.css';
import { MyClass } from './example-unit';
import  Clock  from './clock/Clock'; 

const a = new MyClass(2);
console.log('number is', a.get());

interface TimeZoneObject  {
    label: string,
    value: string
}

let index: number = 2; 

//initialize clocks
//GMT & GMT+3
new Clock(0, "0"); 
new Clock(1, "3")

const createButton: HTMLButtonElement = document.getElementById('createButton') as HTMLButtonElement;;
const timeZoneSelect: HTMLSelectElement  = document.getElementById('timeZoneSelect') as HTMLSelectElement;;

createButton.addEventListener('click', () => createClock() ); 

const createClock: Function = (): void => {
    new Clock(index, timeZoneSelect.value);
    index ++; 
} 

const gmtPlusTimeZones: Array<TimeZoneObject> = [];

for (let index: number = -12; index <= 12; index++) {
  const label: string = index < 0 ? `GMT${index}` : `GMT+${index}`;
  gmtPlusTimeZones.push({ label, value: index.toString() });
}

for (const timezone of gmtPlusTimeZones) {
    const option: HTMLOptionElement = document.createElement('option');
    option.value = timezone.value;
    option.textContent = timezone.label;
    timeZoneSelect.appendChild(option);
}

timeZoneSelect.value = "0"; 
