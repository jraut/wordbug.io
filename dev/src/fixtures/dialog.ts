export enum DialogType {
  Frustrated = 'Frustrated',
  Random = 'Random',
  Ok = 'Ok',
  Hello = 'Hello',
  Word = 'Word',
  WordFrustrated = 'WordFrustrated',
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
  Frustrated: [
    "I'm not an impatient person. I can wait. But my heart tells me that something is wrong. I will wait no longer. We must hurry.",
    "I'm leaving! If you want to fight, follow me! If you want to get rid of the bugs, stay here and play!",
    "Grrrrr! I wanna go home, to the North! I wanna see my parents again! I don't wanna stay here and wait any longer! I wanna go home!",
    'It is such a bore! I want to go to battle now! We have waited for too long! I want to fight the invaders and free the world from their tyranny!',
    'I miss my parents and my homeland. I want to go back and free them from the corrupting influence of the bugs!',
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
  Frustrated: [
    "Aagh! Too much waiting! What's taking the wretched crew so long? Why don't we make any progress? Let's get on with it!",
    "Hear ye? The wind is cold, me clothes are wet and my throat is dry! Let's get onward and finish this!",
    'Aaargh! This waiting around is driving me crazy! When will we proceed with the game?',
    'Waiting is for the weak, the timid and the submissive. I am not one of those.',
    'You can never reach your destination if you keep waiting for the perfect time. Even the sky never waits for the right time to rain.',
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
  Frustrated: [
    "Stop wasting time! I've got to get to the City of the Dead before it's too late!",
    "You can't keep me here! I've got to get to the City of the Dead!",
    'How can I meditate? I am surrounded by fools! Oh the wise are lost!',
    'The hydra beast is not here, I know it! How can I calm my mind?',
    'You dare to mock me? Pray the gods to come for you aid. And even they cant help you.',
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
  Frustrated: [
    'I am too wise to worry about this. I will spend my time in meditation.',
    "I've spent the past five years in silence! We must get going!",
    "I am fed up with this place! I can't meditate in peace!",
    'I will use my powers to make them go away! Grrrrr!',
    "Sometimes I feel like I'm on the brink of losing it. Sometimes I feel like I'm going crazy. I have to control myself. I have to. ",
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
  Frustrated: [
    'Waaaagh! We are strong, but we are getting tired of waiting! We must take action!',
    "So it's true that all that glitters is not gold? What a bore! I thought this was a glittering situation. I am so sick of waiting! I'll leave this place and head out to see the world!",
    "What?! You think I'm afraid of bugs? I'll tell you what I'm afraid of. I'm afraid of you! And you and you and you!",
    'I have been left out. I have been forgotten. I have been mistreated. But I have been successful! I have been waiting for this for so long!',
    'Scurvy scallywags! I have a plan! I will take over this a and rule the seas! Hahahaha!',
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
  Frustrated: [
    'Agh! This place is a stinky, smelly mess! They should be cleaning up! I am going to report this to the captain!',
    "Hrrrr...I'm not used to this kind of climate. I'm cold. I want to go home!",
    'I must not waste time, yet I can not bear to do anything with this situation. Could we get going?',
    'How much longer must I wait? I need to find someone who can provide me with an answer.',
    'If we leave this like it is we will cause problems for the others. I must be able do something to help.',
  ],
}
