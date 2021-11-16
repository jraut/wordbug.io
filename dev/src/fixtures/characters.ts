import { Character } from 'src/components/Characters'

export type Family = 'wolf' | 'squirrel' | 'lizard' | 'mystery'
export type Alignment = 'light' | 'dark'
export type CharacterName =
  | 'Saash'
  | 'Rugo'
  | 'Aerith'
  | 'Celso'
  | 'Theodorus'
  | 'Mira'

export const CHARACTER_DATA: Record<CharacterName, Character> = {
  Saash: {
    name: 'Saash',
    alignment: 'dark',
    family: 'wolf',
    description: [
      `Saash is a humongous wolf who loves getting intoxicated and playing musical instruments. He claims to be from Northern Wilds but actually he has no home - he is not able to return to the place his forgotten memories used to call his own. He was outcast after the great wars for the deeds he had done. Altough much of his atrocities were only to protect the innocent, there is no settlement to the past despair. Now, he believes that all sentient beings deserve respect and dignity - especially the weak.`,
      `All his life he wanted to be a warrior, but instead he turned out to be a slave of his enemies. After the war he was put under a spell and kept as a pet for his new master. After several years of being a slave, Saash began to have vivid dreams about his past and what had really happened. Ultimately he broke out and set his opressors to their place.`,
      `After a long years of sowing more terror and despair, he found peace when he had to intervene in a pillage of a city. The invading army was under the same flag as his former vile masters. He saved the innocent of the city who he saw being ushered into same conditions he once was forcewd into. Ever since that night he has been fighting on the side of the weak, even if this caused the amount of his enemies to increase.`,
    ],
    colors: {
      main: '#be3819',
      secondaries: ['#142f0f', '#2e4a5b', '#94679C'],
    },
  },
  Rugo: {
    name: 'Rugo',
    alignment: 'light',
    family: 'wolf',
    description: [
      `Rugo is a wolf. He comes from the Northern Land of agile hunters who are known for their honesty. His parents were the rulers of the nation before the invasion of the bugs and the great corruption. Rugo had to go through a lot to survive. He wants to provide a safe future for everyone.`,
      `Rugo was taught to hunt by his father. As he was growing up, he realized that something was wrong with the world. The flowers began to wither, the bugs began to multiply and the balance of nature was disrupted. Rugo decided to find out what was happening. He went to explore the world.`,
      `The inhabitants of Gubdrow were losing their natural power and ability to feel joy. They were becoming cynical and full of hatred. Rugo didn't know what to do. Then he came to the conclusion that he should do something to save the world. He took his weapons and started to hunt down the bugs. One by one, he eliminated all the threats. His travels took him through the whole continent. He wanted to be a legend for his people. Rugo wanted to bring back the balance of nature.`,
    ],
    colors: {
      main: '#d2a785',
      secondaries: ['#87b251', '#a1d5cf', '#c476aa'],
    },
  },
  Aerith: {
    name: 'Aerith',
    alignment: 'dark',
    family: 'squirrel',
    description: [
      `Aerith is an old squirrel lady who used to be a sorceress, but now she is retired and spends her time as a bookshop owner. She comes from the Mystic Nation which is known for their knowledge of the worlds of beyond. She is one of the oldest inhabitants of Gubdrow, she is respected and feared by everyone. `,
      `Having gathered an unimaginable wealth, she greatly helped in rebuilding the capital city and the surrounding areas of the kingdom. But all her treasures can't make her happy - she is searching for something she has lost long ago... Her only purpose in life is to find the thing that would bring joy back to her heart. Will she find it? And if she does, will she know what to do with it?`,
      `Aerith's bookshop sells books that are old, rare and have powers. All of them are handmade. She can transform the world to her will. Instead of wreaking havok - like she used to massively do in the history - she now provides spells, potions and other magical things to ones she finds worthy.`,
    ],
    colors: {
      main: '#4a7518',
      secondaries: ['#2d6a75', '#8270a3', '#d52f25'],
    },
  },
  Celso: {
    name: 'Celso',
    alignment: 'light',
    family: 'squirrel',
    description: [
      `Celso is a squirrel. He comes from the Mystic Nation which is known for their knowledge of the worlds of beyond. He lost his parents when he was young. His brother was responsible for his upbringing and he brought him to the nation of his ancestors. They had to part ways when his brother was needed to defend the nation. He always felt guilty for not being able to help his brother in time, but he knew he was doing what was best for him. Celso was lucky that there were many wise scholars there who took him in.`,
      `After having mastered his studies, Celso decided to bring peace to his nation. He used his psychic powers to help all the families who were suffering from the loss of proper words for their loved ones. He started using the forgotten old knowledge to reduce the confusion. The nation was shocked at first, but once they found out that they could use this new method to bring back understanding between each other. This new method worked and restored happiness to all of them. `,
    ],
    colors: {
      main: '#d4e19e',
      secondaries: ['#a1d5cf', '#44b3df', '#5B4998'],
    },
  },
  Theodorus: {
    name: 'Theodorus',
    alignment: 'dark',
    family: 'lizard',
    description: [
      `Mira is a lizard. His ancestors were merchants and traders. They earned their money by building a network of trade roads and connecting cities. This way they provided protection and safety on their roads. Since a long time, they have been building a good relationship with the other nations on Gubdrow.`,
      `One day when Mira was a child, he found a nice place to make a camp. He was looking for firewood to start a fire. Suddenly, a very strong wind came, and he lost his balance. He fell down the cliff. After the fall, he fainted. A couple of days later, when he awoke, he noticed that he has been hurt badly. He had many broken bones. His right hand was completely crushed. Mira, however, had a very strong will. He took his crushed hand and got it replaced by a mechanical device he had been building. Initially recovery was slow and rebuilding the surroundings cumbersome but slowly Mira got back on his feet.`,
      `Mira had to learn to cope with his physical conditions. He went through many hardships but overcame them with technical solutions. The people in his home town were not accepting him at first, since he was not able to do networking anymore, having lost his mobility and charisma. As his physical abilities were damaged, he developed his brain instead. He learnt fast and soon became smarter than his peers. His perseverance and technical brilliance earned him the respect of his fellow citizens.`,
    ],
    colors: {
      main: '#005891',
      secondaries: ['#48484b', '#c8393b', '#50590d'],
    },
  },
  Mira: {
    name: 'Mira',
    alignment: 'light',
    family: 'lizard',
    description: [
      `Mira is a lizard. He comes from the Nation of Traders who are sociable and well-networked. He was raised well and had a happy youth. He has become the pinnacle of his society. His loyal subjects see him as a god-like being because of his heroic acts. He has been able to save his people from many dangers. `,
      `His biggest quest was abolishing the Spirit of Malice from the nearby lands, as was foreseen by the elders. One day, Mira rescued a lost princess of the nation of Lanberk who was stranded outside of his city and he brought him back to the city.  Mira's intelligence, determination and willingness to sacrifice himself in order to save the princess impressed them very much. So they gave him anything and everything he ever wished - the hand of the princess.`,
    ],
    colors: {
      main: '#7bc6c0',
      secondaries: ['#5b5b5e', '#ea949d', '#f2edbe'],
    },
  },
}
