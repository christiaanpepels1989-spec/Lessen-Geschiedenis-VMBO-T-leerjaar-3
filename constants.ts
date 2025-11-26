
import { Lesson } from './types';

export const LESSON_DATA: Lesson[] = [
  {
    id: 1,
    title: "De VOC-tijd",
    era: "1602 - 1799",
    hook: {
      type: 'video',
      description: "Schooltv: De VOC en de handel in de Oost",
      searchTerm: "Schooltv VOC",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/J.P._Coen_op_de_reede_van_Batavia_-_J.P._Coen_in_Batavia_Harbour_%28Adam_Willaerts%29.jpg/1280px-J.P._Coen_op_de_reede_van_Batavia_-_J.P._Coen_in_Batavia_Harbour_%28Adam_Willaerts%29.jpg",
      videoUrl: "https://player.ntr.nl/index.php?id=WO_NTR_16851798"
    },
    content: {
      title: "De machtige VOC en de handelskolonie",
      text: "In de 17e eeuw waren specerijen zoals peper en nootmuskaat goud waard. Om de concurrentie te verslaan, richtte Nederland in 1602 de Verenigde Oost-Indische Compagnie (VOC) op. Dit was niet zomaar een handelsbedrijf. De VOC kreeg van de Nederlandse regering bijzondere rechten (een octrooi): ze mochten zelf forten bouwen, soldaten aannemen, verdragen sluiten met vorsten en zelfs oorlog voeren. Het leek wel een staat in een staat.\n\nHet doel was het stichten van een handelskolonie. De VOC wilde in het begin niet heel Indonesië veroveren of besturen; het ging puur om de winst. Ze wilden strategische havens bezitten en controle hebben over de productie van specerijen. Ze streefden naar een monopolie: het alleenrecht om in bepaalde producten te handelen. Niemand anders mocht deze specerijen kopen of verkopen. Vanuit hun hoofdkwartier Batavia (nu Jakarta) dwongen ze dit af. Wilde een lokale bevolking niet leveren? Dan gebruikte Jan Pieterszoon Coen geweld om de controle te krijgen."
    },
    checkQuestion1: {
      question: "Wat is het belangrijkste kenmerk van een handelskolonie zoals de VOC die stichtte?",
      options: [
        "Het doel was om zoveel mogelijk land te bezitten en te besturen.",
        "Het draaide om het bezit van havens en controle over de handelsproducten.",
        "Het was bedoeld om zoveel mogelijk Nederlanders te laten emigreren.",
        "Het was bedoeld om het geloof te verspreiden in het binnenland."
      ],
      correctAnswer: 1,
      explanation: "Precies. Bij een handelskolonie gaat het om de winst en de toegang tot producten (specerijen), niet perse om het besturen van grote stukken land."
    },
    deepDive: {
      title: "Standbeeld van Coen",
      description: "Het standbeeld van Jan Pieterszoon Coen dat staat al jarenlang in Hoorn. Hij kijkt streng en houdt zijn hand op zijn zwaard.",
      sourceText: "\"Dispereert niet\" (Wanhoop niet), was zijn lijfspreuk. Maar voor de bevolking van de Banda-eilanden bracht hij de dood."
    },
    checkQuestion2: {
      question: "Waarom is er tegenwoordig veel discussie over standbeelden van Coen?",
      options: [
        "Omdat de beelden niet mooi gemaakt zijn.",
        "Omdat hij rijkdom bracht, maar ook verantwoordelijk was voor massamoord.",
        "Omdat hij eigenlijk nooit in Indonesië is geweest.",
        "Omdat hij van specerijen hield die we nu niet meer eten."
      ],
      correctAnswer: 1,
      explanation: "Precies. We kijken nu anders naar het verleden. Rijkdom voor Nederland betekende ellende voor anderen. Mag je zo iemand nog eren?"
    },
    cliffhanger: "De VOC ging uiteindelijk failliet. Maar Nederland bleef de baas. In de 19e eeuw bedachten ze een nieuw systeem om nóg meer geld te verdienen..."
  },
  {
    id: 2,
    title: "De 19e Eeuw: Winstbejag",
    era: "1830 - 1870",
    hook: {
      type: 'image',
      description: "Prent: Dwangarbeid op een koffieplantage. Javaanse boeren sjouwen zware lasten terwijl een Nederlandse opzichter in wit pak toekijkt.",
      searchTerm: "Lithografie koffieplantage nederlands indie 19e eeuw"
    },
    content: {
      title: "Het Cultuurstelsel: De boer betaalt",
      text: "Nederland was blut en had geld nodig. De oplossing? Het **Cultuurstelsel**. Javaanse boeren werden gedwongen om op 20% van hun grond producten te verbouwen voor de Nederlandse markt, zoals koffie, suiker en thee. \n\nDe lokale vorsten kregen een bonus (cultuurprocenten) als hun gebied veel leverde. Het gevolg? Ze persten hun eigen bevolking uit. In Nederland stroomden de miljoenen binnen, waarmee we spoorwegen en kanalen aanlegden. In Indonesië ontstond hongersnood omdat boeren geen tijd meer hadden voor hun eigen rijstvelden."
    },
    checkQuestion1: {
      question: "Wat was een direct gevolg van het Cultuurstelsel voor de Javaanse boeren?",
      options: [
        "Ze werden erg rijk door de export.",
        "Ze leerden nieuwe talen spreken.",
        "Ze leden honger omdat ze hun eigen voedsel niet konden verbouwen.",
        "Ze mochten verhuizen naar Nederland."
      ],
      correctAnswer: 2,
      explanation: "Helaas wel. Alle tijd en grond ging naar koffie en suiker voor Nederland. Er bleef te weinig over voor rijst."
    },
    deepDive: {
      title: "Multatuli klaagt aan",
      description: "In 1860 schreef Eduard Douwes Dekker (Multatuli) het boek 'Max Havelaar'.",
      sourceText: "\"De Javaan wordt mishandeld!\" ... \"Ik zal gelezen worden!\""
    },
    checkQuestion2: {
      question: "Wat wilde Multatuli bereiken met zijn boek Max Havelaar?",
      options: [
        "Hij wilde een spannend avonturenboek schrijven.",
        "Hij wilde Nederlanders wakker schudden over het onrecht in Indonesië.",
        "Hij wilde tips geven voor het verbouwen van koffie.",
        "Hij wilde rijk worden als schrijver."
      ],
      correctAnswer: 1,
      explanation: "Correct. Hij wilde dat Nederlanders in de spiegel keken en zagen waar hun rijkdom vandaan kwam."
    },
    cliffhanger: "Het boek werkte. Mensen schaamden zich. Rond 1900 besloot Nederland: 'We moeten iets terugdoen'. Maar was dat wel zo onbaatzuchtig?"
  },
  {
    id: 3,
    title: "Ethische Politiek",
    era: "Rond 1900",
    hook: {
      type: 'image',
      description: "Foto: Een 'Desa-school' rond 1920. Een klas vol Javaanse kinderen, blootsvoets maar netjes, die leren lezen en schrijven. Het symbool van 'verheffing'.",
      searchTerm: "Foto volksschool nederlands indie 1920"
    },
    content: {
      title: "Iets terugdoen... of betuttelen?",
      text: "Rond 1900 dacht Nederland: 'We hebben een ereschuld'. Er kwam de **Ethische Politiek**. Het doel was: het leven van de Indonesiërs verbeteren. Er werd geïnvesteerd in drie dingen: onderwijs, irrigatie (water voor landbouw) en gezondheidszorg.\n\nHet klinkt nobel. En ja, er kwamen scholen. Maar Nederland gedroeg zich als een strenge ouder die beter wist wat goed was voor het 'kind' Indonesië. Bovendien: door Indonesiërs op te leiden, konden ze ook prima werken in het Nederlandse bestuur. Het was dus ook eigenbelang."
    },
    checkQuestion1: {
      question: "Welke drie dingen stonden centraal in de Ethische Politiek?",
      options: [
        "Oorlog, vrede en handel.",
        "Onderwijs, irrigatie en gezondheidszorg.",
        "Voetbal, feesten en religie.",
        "Spoorwegen, fabrieken en mijnbouw."
      ],
      correctAnswer: 1,
      explanation: "Goed onthouden. De gedachte was om de bevolking 'op te heffen' (te ontwikkelen)."
    },
    deepDive: {
      title: "De Schoolbanken",
      description: "Kijk naar de foto van de klas. Je ziet Indonesische kinderen die Nederlands leren.",
      sourceText: "Bron: Foto uit 1910. Alleen kinderen van de elite mochten naar de beste scholen."
    },
    checkQuestion2: {
      question: "Wat was een onbedoeld gevolg van dit onderwijs?",
      options: [
        "De kinderen wilden allemaal naar Nederland verhuizen.",
        "De kinderen leerden over vrijheid en democratie, en wilden dat ook voor hun eigen land.",
        "De kinderen vergaten hun eigen taal.",
        "Er waren te weinig leraren."
      ],
      correctAnswer: 1,
      explanation: "Precies! Door westers onderwijs leerden ze ook over westerse ideeën zoals vrijheid. Dat zouden ze later tegen Nederland gebruiken."
    },
    cliffhanger: "Die slimme studenten begonnen zich te organiseren. Ze dachten: 'Waarom zijn wij eigenlijk niet de baas in eigen land?' Het verzet begint."
  },
  {
    id: 4,
    title: "Opkomst Nationalisme",
    era: "1900 - 1942",
    hook: {
      type: 'image',
      description: "Foto: Soekarno houdt een toespraak (jaren '30). Hij draagt zijn iconische zwarte 'peci' (hoedje) en wijst vurig naar de menigte. Je voelt de passie.",
      searchTerm: "Soekarno speech 1930 zwart wit"
    },
    content: {
      title: "Indonesië los van Nederland",
      text: "De studenten die door de Ethische Politiek waren opgeleid, werden de leiders van het verzet. Dit noemen we **nationalisme**: liefde voor het eigen volk en het streven naar een eigen staat. \n\nLeiders zoals **Soekarno** en Hatta richtten politieke partijen op. Ze wilden niet meer vragen om verbeteringen, ze eisten onafhankelijkheid ('Merdeka'). Nederland reageerde fel. Soekarno werd opgepakt en verbannen. De Nederlandse gouverneur zei: 'We zijn hier al 300 jaar, we blijven hier nog wel 300 jaar'. Ze onderschatten de kracht van het nationalisme."
    },
    checkQuestion1: {
      question: "Wat betekent 'nationalisme' in deze context?",
      options: [
        "Dat je heel veel van Nederland houdt.",
        "Dat je streft naar een eigen, onafhankelijk land voor je eigen volk.",
        "Dat je graag in het buitenland studeert.",
        "Dat je lid bent van een handelsvereniging."
      ],
      correctAnswer: 1,
      explanation: "Juist. Ze voelden zich 'Indonesiër' in plaats van Javaan of Sumatraan, en wilden hun eigen land besturen."
    },
    deepDive: {
      title: "Soekarno's Woorden",
      description: "Soekarno was een geweldige spreker. Hij kon grote mensenmassa's betoveren.",
      sourceText: "\"Geef mij duizend oude mannen, en ik trek de berg Semeru uit zijn wortels. Geef mij tien jongeren, en ik schud de wereld door elkaar.\""
    },
    checkQuestion2: {
      question: "Waarom was Soekarno zo gevaarlijk voor het Nederlandse bestuur?",
      options: [
        "Hij had heel veel wapens.",
        "Hij was heel rijk.",
        "Hij kon de bevolking verenigen en inspireren om in opstand te komen.",
        "Hij was goede vrienden met de Koningin."
      ],
      correctAnswer: 2,
      explanation: "Woorden zijn soms sterker dan wapens. Hij gaf de mensen zelfvertrouwen."
    },
    cliffhanger: "Nederland dacht de situatie onder controle te hebben. Maar toen brak de Tweede Wereldoorlog uit en verscheen er een nieuwe, machtige vijand aan de horizon."
  },
  {
    id: 5,
    title: "De Vrijheidsstrijd",
    era: "1942 - 1949",
    hook: {
      type: 'image',
      description: "Foto: De Japanse invasie per fiets (1942). Soldaten trekken op eenvoudige fietsen het land binnen. Het toont hoe snel de koloniale macht instortte.",
      searchTerm: "Japanse soldaten fietsen Java 1942"
    },
    content: {
      title: "Van bezetting naar onafhankelijkheid",
      text: "In 1942 veroverde Japan in korte tijd Nederlands-Indië. De Nederlanders werden opgesloten in kampen. Voor veel Indonesiërs leek Japan eerst een bevrijder, maar ook zij onderdrukten de bevolking.\n\nToen Japan in 1945 verslagen was, riep Soekarno direct de onafhankelijkheid uit. Nederland accepteerde dit niet! We stuurden soldaten om 'de orde te herstellen'. Dit noemen we de **Politionele Acties** (eigenlijk een oorlog). Na 4 jaar vechten en onder druk van Amerika, moest Nederland in 1949 toegeven. Indonesië was definitief vrij."
    },
    checkQuestion1: {
      question: "Wat gebeurde er direct nadat Japan capituleerde in 1945?",
      options: [
        "Nederland nam het bestuur rustig weer over.",
        "Soekarno riep de onafhankelijkheid van Indonesië uit.",
        "Iedereen ging samen feestvieren.",
        "Amerika nam het gebied over."
      ],
      correctAnswer: 1,
      explanation: "Correct. Nederland dacht terug te keren naar de oude situatie, maar Soekarno was ze voor."
    },
    deepDive: {
      title: "De Prijs van Vrijheid",
      description: "Een foto van jonge Nederlandse soldaten die in de jungle lopen, of Indonesische strijders met bamboesperen.",
      sourceText: "Bron: Veteranen vertellen vaak dat ze dachten dat ze mensen kwamen helpen, maar in een guerrillaoorlog terechtkwamen."
    },
    checkQuestion2: {
      question: "Waarom noemen we de oorlog tussen 1945-1949 'Politionele Acties' en geen 'Oorlog'?",
      options: [
        "Omdat de politie meevocht.",
        "Omdat het heel kleinschalig was.",
        "Omdat Nederland het zag als een interne kwestie: alsof de politie een opstandje neerslaat in eigen land.",
        "Omdat oorlog een te moeilijk woord was."
      ],
      correctAnswer: 2,
      explanation: "Dat is het politieke antwoord. Door het geen oorlog te noemen, leek het minder erg. Maar voor de soldaten en burgers was het een echte oorlog."
    },
    cliffhanger: "Indonesië was vrij. De relatie tussen Nederland en Indonesië blijft bijzonder en soms pijnlijk, door deze gedeelde geschiedenis."
  }
];
