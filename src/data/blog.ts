export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: BlogBlock[];
  image: string;
  alt: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
};

const winterImage =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80";
const gearboxImage =
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80";
const lampsImage =
  "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80";
const brakesImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80";

const tr: BlogPost[] = [
  {
    slug: "aracinizi-kisa-hazirlayin",
    featured: true,
    title: "Aracınızı kışa hazırlayın",
    excerpt:
      "Akü voltajı, antifriz derecesi, lastik dişi ve cam suyu. Dört kalem, bir öğleden sonra. Yolda kalmanın çoğu bu listeden çıkar.",
    image: winterImage,
    alt: "Karanlık stüdyo ışığında klasik otomobilin ön ızgarası",
    date: "12 Kasım 2026",
    category: "Mevsim",
    readTime: "5 dk okuma",
    content: [
      {
        type: "p",
        text: "Kış arızası çoğu zaman aralıkta, otoyolda, ilk soğuk sabah çıkar. Tezgahta gördüğümüz işlerin yarısı yeni bir parça değildir. Yazdan kalan akü, su katılmış antifriz, 3 milimin altına inmiş lastik ve donmuş cam suyu. Dördü de bir öğleden sonra ölçülür.",
      },
      {
        type: "h2",
        text: "Akü voltajı ezber sayıyla anlaşılmaz",
      },
      {
        type: "p",
        text: "Kontak kapalıyken 12,6 volt civarı sağlıklı bir aküdür. 12,2’nin altı zaten yarı boştur. Asıl mesele voltaj değil, soğukta marş akımıdır. Dört yaşını geçmiş bir akü yazın çalışır, eksi beş derecede ilk denemede düşer. Ölçümü yük altında yaparız. Sadece multimetreyle “iyi” yazılan aküyü kışa bırakmayız.",
      },
      {
        type: "p",
        text: "Kutup başlarında yeşil-beyaz oksit varsa önce onu temizleriz. Gevşek kutup, yeni aküyü de hasta gösterir. Marş sırasında voltaj 10 voltun altına iniyorsa akü ya da şarj hattı konuşulur. Alternatörün rölantide 13,8–14,4 volt vermediği araç, gece kısa mesafede aküyü bitirir.",
      },
      {
        type: "h2",
        text: "Antifriz derecesi şişenin üstündeki yıl değildir",
      },
      {
        type: "p",
        text: "Renk, koruma derecesi değildir. Kırmızı, mavi veya yeşil sıvı birbirine karışınca tortu yapar ve devridaimi tıkar. Refraktometreyle donma noktasını okuruz. Eksi 25’in üstünde kalan karışım, İç Anadolu gecesinde radyatörü çatlatır. Su eklenmiş sistemde kaynama da düşer. Yazın hararet, kışın donma aynı ihmalin iki yüzüdür.",
      },
      {
        type: "p",
        text: "Hortumlarda şişme, genleşme kabında yağ tabakası veya paslı su varsa sıvıyı tamamlamak yetmez. Kaçak veya conta şüphesi varsa sistemi basınçlarız. Körlemesine antifriz eklemek, kaçağı bir hafta gizler.",
      },
      {
        type: "h2",
        text: "Lastik dişi ve cam suyu",
      },
      {
        type: "p",
        text: "Yasal sınır 1,6 mm’dir. Islak zeminde tutunma 3 mm’den sonra hızla düşer. Kış lastiği 7 derecenin altında çalışır. Yaz lastiğiyle eksi dereceye çıkmak, fren mesafesini uzatır. Diş derinliğini üç noktadan ölçeriz: omuz, orta ve iç omuz. İç omuz erimişse rot ayarı da işin içindedir.",
      },
      {
        type: "p",
        text: "Cam suyu ayrı bir kalemdir. Yazlık mavi su eksi derecede fıskiyede donar. Donan hat, motoru da yakabilir. Kışlık konsantre, eksi 20’ye göre sulandırılır. Silecek lastikleri çizik bırakıyorsa sıvıyı değiştirmek camı temizlemez.",
      },
      {
        type: "ul",
        items: [
          "Akü: yük testi ve kutup temizliği",
          "Antifriz: donma noktası ve karışım kontrolü",
          "Lastik: diş derinliği, basınç, kış lastiği kararı",
          "Cam suyu: kışlık konsantre ve silecek lastiği",
        ],
      },
      {
        type: "p",
        text: "Bu liste satış konuşması değildir. Kasımda tezgaha gelen araçlarda yolda kalanların çoğu bu dört kalemden birinde takılır. Ölçüm temizse aracı kışa bırakırız. Temiz değilse parçayı söylemeden değiştirmeyiz.",
      },
    ],
  },
  {
    slug: "otomatik-sanziman-yagi-ne-zaman-degisir",
    title: "Otomatik şanzıman yağı ne zaman değişir?",
    excerpt:
      "Kilometre tek başına yetmez. Yağın rengi, yanık kokusu ve vites geçişindeki gecikme asıl saati söyler. Körlemesine “ömür boyu” yazısına güvenmeyiz.",
    image: gearboxImage,
    alt: "Açık motor kapağının altında görünen motor bloğu ve hortumlar",
    date: "28 Ekim 2026",
    category: "Şanzıman",
    readTime: "6 dk okuma",
    content: [
      {
        type: "p",
        text: "“Ömür boyu yağ” yazısı, aracın broşüründedir. Tezgahta ömür, yağın hâlâ işini yaptığı süredir. Şehir içi, kısa mesafe, römork ve sık dur-kalk yağı 60 bin kilometrede yorar. Otoyol aracı 80–90 bine kadar temiz kalabilir. Tek rakam her şanzımana uymaz.",
      },
      {
        type: "h2",
        text: "Yağın kendisi konuşur",
      },
      {
        type: "p",
        text: "Sağlıklı ATF kırmızıya yakın, saydam ve kokusuzdur. Kahverengiye dönmüş, tortulu veya yanık kokan yağ değiştirme vaktini geçmiştir. Renk tek başına karar değildir. Bazı yeni yağlar baştan daha koyudur. Kokuyu ve vites davranışını birlikte okuruz.",
      },
      {
        type: "p",
        text: "Geç kavrama, kalkışta sarsıntı, 2’den 3’e atlarken devir yükselmesi ve geri vitesin geç oturması yağın bittiğine işarettir. Bunlar varken yağı “biraz daha gitsin” diye bırakmak, balata ve mekatronik faturasına döner.",
      },
      {
        type: "h2",
        text: "Hangi kutuda ne değişir",
      },
      {
        type: "p",
        text: "Klasik tork konvertörlü kutularda yağ ve filtre birlikte değişir. Çift kavramalı ıslak şanzımanda yağ cinsi ve miktar üretici koduyla gelir. Kuru kavramalı kutuya ATF basılmaz. CVT kendi yağını ister. Yanlış spec, doğru kilometrede bile kutuyu bozar.",
      },
      {
        type: "p",
        text: "Karteri açmadan dipteki tortuyu alamazsınız. Sadece üstten boşaltılan yağ, kapasitenin bir kısmıdır. Biz miktarı ölçerek, seviye sıcaklığa göre ayarlayarak değiştiririz. Eksik yağ, fazla yağ kadar zararlıdır. Fazlası köpürür ve basınç düşer.",
      },
      {
        type: "ul",
        items: [
          "Kalkışta bir saniye gecikme veya sarsıntı",
          "Vites yükseltirken devrin boşta kaçması",
          "Yağ çubuğunda yanık koku veya metal tozu",
          "Üretici aralığı dolmuş, hiç değişmemiş yağ",
        ],
      },
      {
        type: "p",
        text: "Belirti yoksa ve yağ temizse değişimi öne çekmeyiz. Belirti varsa “ömür boyu” cümlesi iş emrine yazılmaz. Yağ kodunu, litre miktarını ve eski yağın fotoğrafını iş emrine koyarız.",
      },
    ],
  },
  {
    slug: "gosterge-panelindeki-ariza-lambalarinin-anlamlari",
    title: "Gösterge panelindeki arıza lambalarının anlamları",
    excerpt:
      "Sarı lamba ile kırmızı lamba aynı olay değildir. Biri servise kadar gider. Diğeri kontağı kapatıp çekici çağırmayı gerektirir.",
    image: lampsImage,
    alt: "Gece yolda profili çekilmiş binek otomobil",
    date: "4 Ekim 2026",
    category: "Elektrik",
    readTime: "7 dk okuma",
    content: [
      {
        type: "p",
        text: "Paneldeki lamba bir arıza kodudur, teşhis değildir. Aynı motor lambası gevşek yakıt kapağından da, tekleme yapan bobinden de yanar. Lambayı silmek kodu siler. Sebebi silmez. Önce rengin ne dediğini ayırırız.",
      },
      {
        type: "h2",
        text: "Kırmızı: dur",
      },
      {
        type: "p",
        text: "Yağ lambası, hararet ve fren ikazı kırmızıdır. Yağ lambası yanıyorsa motoru çalışır halde bırakmayın. Basınç yoksa yataklar dakikalar içinde erir. Hararet kırmızıdaysa kaputu açıp su eklemeye kalkmayın. Motor soğusun, sonra kaçak aranır. Fren ikazı balata sensörü de olabilir, hidrolik seviyesi de. Pedal dibe kaçıyorsa sürmeyin.",
      },
      {
        type: "h2",
        text: "Sarı: erteleme değil, okuma",
      },
      {
        type: "p",
        text: "Motor arıza lambası sarıysa araç çoğu zaman yürür. Tekleme, koku veya güç kaybı varsa yürüyüş biter. ABS ve ESP sarı yandığında fren çalışır, elektronik yardım kalkmıştır. Islak zeminde bunu “önemsiz” saymayın. Akü lambası şarjın kesildiğini söyler. Far ve kaloriferle mesafe kısalır. Akü bitene kadar gidersiniz, sonra kalırsınız.",
      },
      {
        type: "p",
        text: "Lastik basınç lambası bir patlak da olabilir, mevsim geçişinde 0,3 bar düşüş de. Basıncı ölçmeden lambayı resetlemeyin. Direksiyon başı lamba elektrikli direksiyonun torkunu kestiğini gösterir. Direksiyon ağırlaştıysa servise kadar yavaşlayın.",
      },
      {
        type: "ul",
        items: [
          "Yağ, hararet, fren: kontağı kapatın, çekici",
          "Motor, ABS, ESP: kod okutun, belirti varsa beklemeyin",
          "Akü: gece yoluna çıkmayın, şarj hattını ölçtürün",
          "Lastik: dört lastiği soğukken kontrol edin",
        ],
      },
      {
        type: "p",
        text: "Teşhiste önce kodu, sonra veriyi okuruz. Kısa ve uzun yakıt düzeltmesi, misfire sayacı, sensör voltajı. Lambayı söndürüp “geçti” demek, müşteriyi bir hafta sonra aynı lambayla geri getirir. Kodu iş emrine yazarız.",
      },
    ],
  },
  {
    slug: "fren-balatalarinin-bittigini-nasil-anlarsiniz",
    title: "Fren balatalarının bittiğini nasıl anlarsınız?",
    excerpt:
      "Islık, direksiyonda titreme ve uzayan pedal aynı şey değildir. Balata, disk ve hidrolik ayrı arızalardır. Hangisi bittiyse onu değiştiririz.",
    image: brakesImage,
    alt: "Turuncu spor otomobil, fren performansı çağrışımı",
    date: "19 Eylül 2026",
    category: "Fren",
    readTime: "5 dk okuma",
    content: [
      {
        type: "p",
        text: "Balata bitince önce ses gelir, sonra metal. Metal diske değdiğinde hem duruş uzar hem disk çizilir. Çizilen disk, yeni balatayı da yer. “Biraz daha gitsin” cümlesi, balata işini disk işine çevirir.",
      },
      {
        type: "h2",
        text: "Duyduğunuz ses ne söyler",
      },
      {
        type: "p",
        text: "Hafif hızda, frene basınca çıkan ince ıslık çoğu zaman balata ikaz sacıdır. Sac, balata 3 mm civarına inince diske değer. Freni bıraktığınızda da süren tiz ses, balatanın camlaştığını veya pimlerin kuruduğunu gösterir. Kaba gıcırtı ve sürtme ise metalin diske oturduğunu söyler. O noktada ölçüm beklemez.",
      },
      {
        type: "h2",
        text: "Pedal, titreme, yana çekme",
      },
      {
        type: "p",
        text: "Direksiyonun frenlemede titremesi çoğu zaman eğilmiş disktir. Balata değişimi titremeyi geçirmez. Disk kalınlığı minimumun altındaysa yüzey taşlamak da yetmez, disk değişir. Araç bir yana çekiyorsa kaliper pistonu yapışmış olabilir. Tek taraf yeni, diğer taraf bitik balata aynı iş emrinde çıkar.",
      },
      {
        type: "p",
        text: "Pedal yumuşaksa ve ikinci basışta toplanıyorsa konu balata değil, hidroliktir. Yağ kaynama noktası düşmüş ya da sistemde hava vardır. Balata kalınken pedalı yumuşak diye balata satmayız. Önce sıvıyı ve kaçağı ölçeriz.",
      },
      {
        type: "ul",
        items: [
          "İkaz sacı ıslığı: balata ölçümü, genelde değişim",
          "Metal sürtmesi: balata ve disk birlikte",
          "Frenlemede titreme: disk salgısı ve kalınlık",
          "Yumuşak pedal: hidrolik, hava veya kaçak",
        ],
      },
      {
        type: "p",
        text: "Jantı sökmeden kalınlık tahmini yapmayız. Ön ve arka balata aynı anda bitmez. Arkayı unutup sadece önü değiştirmek, dengeyi bozar. İş emrinde dört köşenin milimetresini yazarız.",
      },
    ],
  },
];

const en: BlogPost[] = [
  {
    slug: "aracinizi-kisa-hazirlayin",
    featured: true,
    title: "Prepare your car for winter",
    excerpt:
      "Battery voltage, antifreeze strength, tread depth and washer fluid. Four lines, one afternoon. Most roadside failures start on this list.",
    image: winterImage,
    alt: "Classic car front grille in dark studio light",
    date: "12 November 2026",
    category: "Season",
    readTime: "5 min read",
    content: [
      {
        type: "p",
        text: "Winter failures show up in December, on the motorway, on the first cold morning. Half the jobs on our bench are not a new part. They are a battery left over from summer, antifreeze diluted with water, tread under 3 mm and washer fluid that froze. All four can be measured in an afternoon.",
      },
      {
        type: "h2",
        text: "Battery voltage is not a memorised number",
      },
      {
        type: "p",
        text: "With the key off, about 12.6 volts is a healthy battery. Under 12.2 it is already half empty. The real issue is cold cranking current, not the resting voltage. A battery past four years starts fine in July and drops on the first try at minus five. We load-test it. A battery marked “good” by a multimeter alone does not go into winter.",
      },
      {
        type: "p",
        text: "Green-white oxide on the terminals gets cleaned first. A loose clamp makes a new battery look sick. If voltage falls under 10 volts while cranking, we talk about the battery or the charging circuit. An alternator that does not hold 13.8–14.4 volts at idle will flatten the battery on short night trips.",
      },
      {
        type: "h2",
        text: "Antifreeze strength is not the year on the bottle",
      },
      {
        type: "p",
        text: "Colour is not protection. Red, blue and green mixed together drop sediment and block the circuit. We read the freeze point with a refractometer. A mix above minus 25 will crack a radiator on an inland night. Water in the system also lowers the boil point. Summer overheating and winter freezing are two faces of the same skip.",
      },
      {
        type: "p",
        text: "Swollen hoses, an oil film in the expansion tank or rusty water mean topping up is not enough. If we suspect a leak or a gasket, we pressure-test the system. Pouring antifreeze over a leak hides it for a week.",
      },
      {
        type: "h2",
        text: "Tread and washer fluid",
      },
      {
        type: "p",
        text: "The legal limit is 1.6 mm. Wet grip falls fast after 3 mm. A winter tyre works below 7°C. Taking a summer tyre into freezing weather lengthens the stop. We measure tread in three places: shoulder, centre and inner shoulder. A worn inner shoulder means alignment is part of the job.",
      },
      {
        type: "p",
        text: "Washer fluid is its own line. Summer fluid freezes in the jet at a few degrees below zero. A frozen line can also burn the pump. Winter concentrate is mixed for about minus 20. If the blades leave streaks, new fluid will not clean the glass.",
      },
      {
        type: "ul",
        items: [
          "Battery: load test and terminal clean",
          "Antifreeze: freeze point and mix check",
          "Tyres: tread, pressure, winter-tyre decision",
          "Washer fluid: winter concentrate and blades",
        ],
      },
      {
        type: "p",
        text: "This list is not a sales pitch. Most cars that reach the bench in November failed on one of these four lines. If the measurements are clean, the car goes into winter. If they are not, we do not replace a part without saying which one.",
      },
    ],
  },
  {
    slug: "otomatik-sanziman-yagi-ne-zaman-degisir",
    title: "When should automatic transmission fluid be changed?",
    excerpt:
      "Mileage alone is not the clock. Colour, a burnt smell and a late shift tell the real interval. We do not trust a blanket “lifetime” line.",
    image: gearboxImage,
    alt: "Engine block and hoses under an open bonnet",
    date: "28 October 2026",
    category: "Gearbox",
    readTime: "6 min read",
    content: [
      {
        type: "p",
        text: "“Lifetime fluid” lives in the brochure. On the bench, lifetime means the fluid still does its job. City traffic, short trips, towing and constant stop-start tire fluid by 60,000 km. A motorway car can stay clean toward 80–90,000. One number does not fit every gearbox.",
      },
      {
        type: "h2",
        text: "The fluid speaks for itself",
      },
      {
        type: "p",
        text: "Healthy ATF is close to red, clear and without a burnt smell. Brown, gritty or burnt fluid is already late. Colour alone is not the decision. Some new fluids start darker. We read smell and shift behaviour together.",
      },
      {
        type: "p",
        text: "Late engagement, a shudder on take-off, a flare from second to third and a slow reverse all say the fluid is finished. Leaving those “for a bit longer” turns into a clutch and mechatronics invoice.",
      },
      {
        type: "h2",
        text: "What actually gets changed",
      },
      {
        type: "p",
        text: "On a conventional torque-converter box we change fluid and filter together. A wet dual-clutch unit takes the fluid grade and volume from the maker’s code. A dry-clutch box does not get ATF. A CVT wants its own fluid. The wrong spec ruins a gearbox even at the right mileage.",
      },
      {
        type: "p",
        text: "You cannot lift the sediment without dropping the pan. Fluid drained from the top is only part of the capacity. We measure what comes out and set the level at the specified temperature. Low fluid is as harmful as too much. Too much foams and pressure falls.",
      },
      {
        type: "ul",
        items: [
          "A one-second delay or shudder on take-off",
          "Revs flaring as the box upshifts",
          "Burnt smell or metal dust on the dipstick",
          "A factory interval that was never serviced",
        ],
      },
      {
        type: "p",
        text: "If there is no symptom and the fluid is clean, we do not pull the service forward. If there is a symptom, “lifetime” does not go on the job card. Fluid code, litres and a photo of the old fluid do.",
      },
    ],
  },
  {
    slug: "gosterge-panelindeki-ariza-lambalarinin-anlamlari",
    title: "What the warning lamps on the cluster mean",
    excerpt:
      "An amber lamp and a red lamp are not the same event. One lets you drive to the shop. The other means key off and a flatbed.",
    image: lampsImage,
    alt: "Passenger car in profile on a night road",
    date: "4 October 2026",
    category: "Electrical",
    readTime: "7 min read",
    content: [
      {
        type: "p",
        text: "A lamp on the cluster is a fault code, not a diagnosis. The same engine lamp can come from a loose fuel cap or a misfiring coil. Clearing the lamp clears the code. It does not clear the cause. First we separate what the colour is saying.",
      },
      {
        type: "h2",
        text: "Red means stop",
      },
      {
        type: "p",
        text: "Oil, temperature and brake warnings are red. If the oil lamp is on, do not leave the engine running. Without pressure the bearings wipe in minutes. If the temperature lamp is red, do not open the cap and add water. Let it cool, then look for the leak. A brake warning can be a pad sensor or low fluid. If the pedal goes to the floor, do not drive.",
      },
      {
        type: "h2",
        text: "Amber means read it, do not postpone it",
      },
      {
        type: "p",
        text: "An amber engine lamp usually still moves the car. Misfire, a smell or a loss of power ends the trip. When ABS or ESP is amber, the brakes still work and the electronic help is gone. Do not call that minor on a wet road. A battery lamp means charging has stopped. Lights and the heater shorten the distance. You drive until the battery dies, then you stop.",
      },
      {
        type: "p",
        text: "A tyre-pressure lamp can be a puncture or a 0.3 bar drop at the season change. Do not reset it before you measure. A steering-wheel lamp means the electric rack has cut torque. If the wheel goes heavy, slow down on the way in.",
      },
      {
        type: "ul",
        items: [
          "Oil, temperature, brakes: key off, call a flatbed",
          "Engine, ABS, ESP: read the code, do not wait if there is a symptom",
          "Battery: skip the night drive, measure the charging circuit",
          "Tyres: check all four cold",
        ],
      },
      {
        type: "p",
        text: "Diagnosis starts with the code, then the data. Short and long fuel trims, misfire counters, sensor voltage. Turning the lamp off and saying “it passed” brings the same lamp back in a week. The code goes on the job card.",
      },
    ],
  },
  {
    slug: "fren-balatalarinin-bittigini-nasil-anlarsiniz",
    title: "How can you tell the brake pads are finished?",
    excerpt:
      "A squeal, a shake in the wheel and a longer pedal are not the same fault. Pads, discs and hydraulics fail separately. We replace the one that is actually worn.",
    image: brakesImage,
    alt: "Orange sports car, a nod to brake performance",
    date: "19 September 2026",
    category: "Brakes",
    readTime: "5 min read",
    content: [
      {
        type: "p",
        text: "When a pad is finished you hear it first, then you hear metal. Once metal meets the disc, the stop gets longer and the disc is scored. A scored disc eats the new pad too. “It can go a bit longer” turns a pad job into a disc job.",
      },
      {
        type: "h2",
        text: "What the noise is saying",
      },
      {
        type: "p",
        text: "A thin squeal at low speed, only when you brake, is usually the wear tab. The tab touches the disc around 3 mm. A high tone that stays after you release the pedal means the pad has glazed or the pins are dry. A coarse grind means metal is on the disc. At that point we do not wait for a measurement appointment.",
      },
      {
        type: "h2",
        text: "Pedal, shake, pull",
      },
      {
        type: "p",
        text: "A steering wheel that shakes under braking is usually a warped disc. New pads will not cure it. If the disc is under minimum thickness, skimming is not enough and the disc is replaced. A pull to one side can be a stuck caliper piston. One fresh pad and one worn pad show up on the same job card.",
      },
      {
        type: "p",
        text: "A soft pedal that firms up on the second push is hydraulic, not a pad. The fluid’s boiling point has dropped or there is air in the system. We do not sell pads because the pedal feels soft while the friction material is still thick. We measure the fluid and look for a leak first.",
      },
      {
        type: "ul",
        items: [
          "Wear-tab squeal: measure the pads, usually replace",
          "Metal grind: pads and discs together",
          "Shake under braking: disc runout and thickness",
          "Soft pedal: fluid, air or a leak",
        ],
      },
      {
        type: "p",
        text: "We do not guess thickness without the wheel off. Front and rear pads do not finish together. Changing only the front and forgetting the rear upsets the balance. The job card gets the millimetres at all four corners.",
      },
    ],
  },
];

export const blogPosts = { tr, en };

export function postsFor(lang: string) {
  return lang === "en" ? en : tr;
}

export function postBySlug(lang: string, slug: string) {
  return postsFor(lang).find((post) => post.slug === slug);
}

export const blogCopy = {
  tr: {
    eyebrow: "Defter",
    title: "Atölyeden notlar",
    subtitle:
      "Kış hazırlığı, fren hidroliği, arıza lambası. Satış yazısı değil, tezgahta gördüğümüz işler.",
    cta: "Aracınızda bu belirtiler varsa hemen randevu alın",
    ctaButton: "Randevu al",
    back: "Tüm notlar",
  },
  en: {
    eyebrow: "The log",
    title: "Notes from the workshop",
    subtitle:
      "Winter prep, brake fluid, warning lamps. Not sales copy — jobs we actually see on the bench.",
    cta: "If the car shows these signs, book a visit now",
    ctaButton: "Book a visit",
    back: "All notes",
  },
} as const;

export function copyFor(lang: string) {
  return lang === "en" ? blogCopy.en : blogCopy.tr;
}
