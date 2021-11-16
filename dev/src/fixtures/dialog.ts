export enum DialogType {
  Random = 'Random',
  Ok = 'Ok',
  Hello = 'Hello',
}

export type Dialogues = Record<DialogType, string[]>

export interface DialogItem {
  type: DialogType
  line: string
}

export const rugoDialogLines: Partial<Dialogues> = {
  Random: [
    "I'll find a way to save us all.",
    'My friends are here for me.',
    "I'll fight for a new future.",
    "I'm trying to save everyone.",
    "We're not gonna give up.",
    'This world needs a hero.',
    "I will fight for the world's future.",
    "There's a lot of people counting on me.",
    "I'll be a hero to everyone.",
    "I'm fighting for the sake of the world.",
    "I won't let my friends down.",
    "We'll find a way to save everyone.",
    'My friends are here for me.',
  ],
}

export const saashDialogLines: Partial<Dialogues> = {
  Random: [
    "I think I'll start with some drinking!",
    'You seem like a decent chap. I like you!',
    "I like the new songs, don't you?",
    'Do you want to hear some songs with me?',
    'I am good with the songs!',
    "Let's play some music together!",
    "Ah, I'm feeling in the mood for some music...",
    'Come closer and let me tell you a story...',
    "What's happening in the world, I wonder...",
    'Ah, what a great night to be with friends...',
    'A party can be a good place to meet new people...',
  ],
}

export const aerithDialogLines: Partial<Dialogues> = {
  Random: [
    "You can't read these books. They are very special.",
    'A book is more than just words. It is knowledge.',
    "I don't have much time left, but I'd like to share my knowledge with you.",
    'You are strong. I have faith in you.',
    "It's time to get this show on the road!",
    'We are not alone!',
    'We must not fail this time!',
    "It's time to get this show on the road!",
    'Ah, I think I know what you are looking for.',
    'What brings you here?',
    'Oh, another one! Another book, I suppose.',
    "What's on your mind?",
    "I've got something for you.",
    "Hey, you don't know anything! I'm the only one who knows how to do it!",
    'Humph, just a mere young one...',
    'A book is more than just words. It is knowledge.',
    "I don't have much time left, but I'd like to share my knowledge with you.",
    'Ah, I think I know what you are looking for.',
  ],
}

export const celsoDialogLines: Partial<Dialogues> = {
  Random: [
    'I am a mere servant of the gods.',
    'I am a humble servant of the gods.',
    'The Divine presence will guide you through your struggles.',
    'We must look within to find peace.',
    'The universe will provide.',
    'Be not afraid.',
    'Everything will be alright.',
    'Trust in yourself.',
    'You are not alone.',
    'Everything will be fine.',
    'Trust in the Divine.',
    'You are strong.',
    'Everything will be alright.',
  ],
}

export const theodorusDialogLines: Partial<Dialogues> = {
  Random: [
    "I can't help but feel, that something is terribly wrong.",
    'I have a bad feeling about this.',
    'I have a feeling this is not going to go well.',
    'I have a funny feeling about this.',
    'I have a funny feeling.',
    'I have a good feeling about this.',
    'My feelings are telling me that this is not going to end well.',
    'There is something wrong with this picture.',
  ],
}

export const miraDialogLines: Partial<Dialogues> = {
  Random: [
    'I shall lead everyone to the promised land. For the light of hope is still glowing inside my heart.',
    'I shall bring peace to this corrupted world.',
    'I shall fight against the darkness.',
    'I shall vanquish the invaders and the evil rulers.',
    'I need a guide.',
    "Let's do business.",
    "Let's talk.",
    "Let's trade.",
    'The land is my home.',
    'This is my land.',
  ],
}