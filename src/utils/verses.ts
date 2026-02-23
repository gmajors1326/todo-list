export const BIBLE_VERSES = [
    { text: "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11" },
    { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31" },
    { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28" },
    { text: "Don’t hit the panic button; get the praise button! For God has not given us a spirit of fear, but of power and of love and of a sound mind.", reference: "2 Timothy 1:7" },
    { text: "The Lord is my shepherd, I shall not want.", reference: "Psalm 23:1" },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
    { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", reference: "John 14:27" },
    { text: "Commit your way to the Lord; trust in him and he will do this.", reference: "Psalm 37:5" },
    { text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.", reference: "Colossians 3:15" },
    { text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?", reference: "Psalm 27:1" },
    { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7" },
    { text: "With man this is impossible, but with God all things are possible.", reference: "Matthew 19:26" },
    { text: "Give thanks to the Lord, for he is good; his love endures forever.", reference: "Psalm 107:1" },
    { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105" },
    { text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself.", reference: "Matthew 6:34" },
    { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", reference: "Colossians 3:23" },
    { text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", reference: "Ephesians 4:32" },
    { text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.", reference: "1 Thessalonians 5:16-18" },
    { text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.", reference: "Zephaniah 3:17" },
    { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", reference: "Matthew 5:16" },
    { text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", reference: "John 16:33" },
    { text: "God is our refuge and strength, an ever-present help in trouble.", reference: "Psalm 46:1" },
    { text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.", reference: "Lamentations 3:22-23" },
    { text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", reference: "James 1:5" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6" },
    { text: "The Lord will fight for you; you need only to be still.", reference: "Exodus 14:14" },
    { text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.", reference: "Psalm 34:8" },
    { text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "Matthew 6:33" }
];

export const getVerseOfTheDay = () => {
    const today = new Date();
    // Create a seed based on year, month, and day
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    // Simple deterministic index
    const index = seed % BIBLE_VERSES.length;
    return BIBLE_VERSES[index];
};
