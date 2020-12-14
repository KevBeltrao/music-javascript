const playButton = document.querySelector('.play-button');

const getNote = (string) => {
  const notes = {
    C: 16.35,
    'C#': 17.32,
    Db: 17.32,
    D: 18.35,
    'D#': 19.45,
    Eb: 19.45,
    E: 20.60,
    F: 21.83,
    'F#': 23.12,
    Gb: 23.12,
    G: 24.5,
    'G#': 25.96,
    Ab: 25.96,
    A: 27.50,
    'A#': 29.14,
    Bb: 29.14,
    B: 30.87,
  };
  
  const [noteName, noteOctaveString] = string.split(/(\d+)/);

  const noteOctave = Number(noteOctaveString);

  console.log(noteName, noteOctave);


  return notes[noteName] * (2 ** noteOctave);
};

const intro1 = [
  'D5', 'D6', 'A5', 'G5', 'G6', 'A5', 'F#6', 'A5',
];
const intro2 = [
  'E5', 'D6', 'A5', 'G5', 'G6', 'A5', 'F#6', 'A5',
];
const intro3 = [
  'G5', 'D6', 'A5', 'G5', 'G6', 'A5', 'F#6', 'A5',
];
const introFinal = [
  'E6', 'A5', 'D6', 'A5', 'E6', 'A5', 'F#6', 'A5', 'G6', 'A5', 'F#6', 'A5', 'E6', 'A5', 'D6', 'D6',
];

const normalIntro = [
  ...intro1,
  ...intro1,
  ...intro2,
  ...intro2,
  ...intro3,
  ...intro3,
  ...intro1,
  ...intro1,
];

const lastIntro = [
  ...intro1,
  ...intro1,
  ...intro2,
  ...intro2,
  ...intro3,
  ...intro3,
  ...introFinal,
];

const intro = [
  ...normalIntro,
  ...normalIntro,
  ...lastIntro,
];

const fullSong = [
  ...intro,
];

const bassWait = [
  'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0',
  'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0',
  'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0',
  'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0',
  'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0',
  'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0', 'C0',
  'D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3',
  'D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'A3',
];

const bassIntro1 = [
  'D4', 'D4', 'D4', 'F#4', 'F#4', 'D4', 'F#4', 'G4', 'A4', 'A4',
  'B4', 'A4', 'G4', 'F#4', 'D4', 'A3', 'C4', 'C4', 'C4', 'E4', 'E4', 'E4', 'E4',
  'C4', 'F4', 'E4', 'C4', 'F4', 'F4', 'E4', 'C4', 'B3', 'G3', 'G3', 'G3', 'G3',
  'G3', 'G3', 'G3', 'D4', 'G4', 'G4', 'G4', 'G4', 'G4', 'G4', 'G4',
  'D4', 'G4', 'F#4', 'D4', 'G4', 'G4', 'F#4', 'D4', 'D4', 'D4', 'D4', 'D4', 'D4',
  'D4', 'D4', 'D4', 'D4',
];

const bass = [
  // ...bassWait,
  ...bassIntro1,
];

const createOscillator = () => {
  const context = new AudioContext();
  
  const oscillator = context.createOscillator();
  
  oscillator.connect(context.destination);
  oscillator.type = 'sine';

  return oscillator;
}

const playSong = (song, bass) => {
  let i = 1;

  const oscillator1 = createOscillator();
  const oscillator2 = createOscillator();

  oscillator1.start();
  oscillator1.frequency.value = getNote(song[0]);
  oscillator2.start();
  oscillator2.frequency.value = getNote(bass[0]);

  const interval = setInterval(() => {
    oscillator1.frequency.value = getNote(song[i]);
    oscillator2.frequency.value = getNote(bass[i]);

    i += 1;

    if (i === bass.length) {
      clearInterval(interval);

      setTimeout(() => {
        oscillator1.frequency.value = getNote('C0');
        oscillator2.frequency.value = getNote('C0');
      }, 250);
    }
  }, 250);
};

playButton.addEventListener('click', () => {
  playSong(fullSong, bass);
});
