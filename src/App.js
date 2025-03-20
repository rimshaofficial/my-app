import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import "./styles.css";

const emotions = [
  { name: "Happy", emoji: "😊" },
  { name: "Sad", emoji: "😢" },
  { name: "Angry", emoji: "😡" },
  { name: "Worried", emoji: "😟" },
  { name: "Confused", emoji: "😕" }
];

const messages = {
  Happy: [
    "کہہ دو کہ ہمیں صرف وہی پہنچے گا جو اللہ نے ہمارے لیے لکھ دیا ہے۔ وہی ہمارا مولیٰ ہے اور مومنوں کو اللہ ہی پر بھروسہ کرنا چاہیے۔ (التوبہ 9:51)",
    "اللہ کسی جان کو اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔ (البقرہ 2:286)",
    "آج وہ دن ہے جب سچوں کو ان کا سچ نفع دے گا۔ ان کے لئے وہ جنتیں ہیں جن کے نیچے نہریں بہتی ہیں۔ (المائدہ 5:119)",
    "جو کوئی بھی نیک عمل کرے، خواہ مرد ہو یا عورت، اور وہ مومن ہو، تو ہم اسے بہترین زندگی عطا کریں گے۔ (النحل 16:97)",
    "ہاں! جس نے اللہ کے سامنے سر تسلیم خم کیا اور وہ نیکوکار ہے، اس کے لیے اس کے رب کے پاس اجر ہے۔ (البقرہ 2:112)",
    "یہ لوگ اپنے صبر کی وجہ سے بلند مقام پر فائز کیے جائیں گے، اور وہاں انہیں سلامتی اور خوشی کے ساتھ استقبال کیا جائے گا۔ (الفرقان 25:75)",
    "اور اللہ پرہیزگاروں کو ان کی کامیابی کے ساتھ نجات دے گا، نہ ان کو کوئی برائی چھوئے گی اور نہ وہ غمگین ہوں گے۔ (الزمر 39:61)",
    "بے شک، اللہ کے دوستوں پر نہ کوئی خوف ہوگا اور نہ وہ غمگین ہوں گے۔ (یونس 10:62-63)",
    "بے شک مشکل کے ساتھ آسانی ہے۔ بے شک مشکل کے ساتھ آسانی ہے۔ (الانشراح 94:5-6)",
    "اگر تم بھلائی کرو گے تو اپنی ہی جانوں کے لیے بھلائی کرو گے۔ (الاسراء 17:7)"
  ],
  Sad: [
    "بے شک مشکل کے ساتھ آسانی ہے۔ بے شک مشکل کے ساتھ آسانی ہے۔ (الانشراح 94:5-6)",
    "کہہ دو کہ ہمیں صرف وہی پہنچے گا جو اللہ نے ہمارے لیے لکھ دیا ہے۔ (التوبہ 9:51)",
    "اللہ کسی جان کو اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔ (البقرہ 2:286)",
    "اور نہ کمزور پڑو اور نہ غم کرو، اور تم ہی غالب رہو گے اگر تم مومن ہو۔ (آل عمران 3:139)",
    "کہہ دو کہ اے میرے بندو جنہوں نے اپنی جانوں پر ظلم کیا ہے، اللہ کی رحمت سے ناامید نہ ہو۔ (الزمر 39:53)",
    "اور جو لوگ ہماری راہ میں کوشش کرتے ہیں، ہم انہیں ضرور اپنے راستوں کی طرف رہنمائی کریں گے۔ (العنکبوت 29:69)",
    "کوئی مصیبت زمین میں یا تمہاری جانوں پر نہیں آتی مگر وہ ایک کتاب میں لکھی ہوئی ہے۔ (الحدید 57:22-23)",
    "صبر اور نماز کے ذریعے مدد حاصل کرو۔ (البقرہ 2:45)",
    "اور اللہ کی رحمت سے ناامید نہ ہو۔ (یوسف 12:87)",
    "یاد رکھو، اللہ کے ذکر میں دلوں کو اطمینان ملتا ہے۔ (الرعد 13:28)"
  ],
  Angry: [
    "اچھا کہنا اور معاف کرنا اس صدقے سے بہتر ہے جس کے بعد تکلیف ہو، اور اللہ بے نیاز اور بردبار ہے۔ (البقرہ 2:263)",
    "معاف کرنے کی عادت اپنا لو اور اچھے کاموں کا حکم دو اور بے وقوفوں سے منہ موڑ لو۔ (الاعراف 7:199)",
    "انہیں معاف کرو اور ان کے لیے استغفار کرو اور معاملات میں ان سے مشورہ کرو۔ (آل عمران 3:159)",
    "اپنے رب کی راہ کی طرف حکمت اور اچھی نصیحت کے ساتھ دعوت دو۔ (النحل 16:125)",
    "اور رحمان کے بندے وہ ہیں جو زمین پر عاجزی کے ساتھ چلتے ہیں، اور جب جاہل ان سے بات کرتے ہیں تو وہ کہتے ہیں: 'سلام ہے'۔ (الفرقان 25:63)",
    "اور جو لوگ اپنے رب کے حکم کو قبول کرتے ہیں اور نماز قائم کرتے ہیں اور اپنے امور میں باہمی مشورہ کرتے ہیں۔ (الشوریٰ 42:38)",
    "اور اگر وہ صلح کی طرف جھکیں تو تم بھی اس کی طرف جھک جاؤ اور اللہ پر توکل کرو۔ (الانفال 8:61)",
    "اور جو اللہ پر بھروسہ کرے، اللہ اسے کافی ہے۔ (الطلاق 65:3)",
    "اور میں بندوں پر ظلم کرنے والا نہیں ہوں۔ (الحجر 15:85)",
    "اور جان لو کہ تمہارے مال اور تمہاری اولاد تمہارے لیے ایک آزمائش ہیں، اور بے شک اللہ کے پاس بڑا انعام ہے۔ (الانفال 8:28)"
  ],
  Worried: [
    "اگر اللہ تمہیں کوئی تکلیف پہنچائے تو اس کے سوا کوئی اسے دور کرنے والا نہیں۔ (الانعام 6:17)",
    "ہمارے لیے اللہ کافی ہے اور وہ بہترین کارساز ہے۔ (آل عمران 3:173)",
    "اور اللہ پر بھروسہ کرو، اور اللہ کافی کارساز ہے۔ (الاحزاب 33:3)",
    "اور جب میرے بندے آپ سے میرے بارے میں پوچھیں تو بے شک میں قریب ہوں۔ (البقرہ 2:186)",
    "اور مدد صرف اللہ کی طرف سے آتی ہے۔ (الانفال 8:10)",
    "اگر تم شکر ادا کرو گے تو میں تمہیں اور زیادہ دوں گا۔ (ابراہیم 14:7)",
    "اور اس زندہ پر بھروسہ کرو جو کبھی نہیں مرے گا۔ (الفرقان 25:58)",
    "اور میں اپنے معاملے کو اللہ کے سپرد کرتا ہوں۔ بے شک اللہ اپنے بندوں کو خوب دیکھنے والا ہے۔ (غافر 40:44)",
    "فرمایا، 'ڈرو مت، میں تمہارے ساتھ ہوں، سنتا اور دیکھتا ہوں۔' (طٰہٰ 20:46)",
    "اور اللہ نے تمہیں پیدا کیا، پھر وہ تمہیں موت دے گا۔ (النحل 16:70)"
  ],
  Confused: [
    "اور وہ تمہارے ساتھ ہے جہاں کہیں بھی تم ہو۔ (الحدید 57:4)",
    "اللہ ایمان والوں کا دوست ہے۔ (البقرہ 2:257)",
    "اور جو لوگ ہماری راہ میں کوشش کرتے ہیں، ہم انہیں اپنے راستے دکھائیں گے۔ (العنکبوت 29:69)",
    "اور آپ کا رب جو چاہتا ہے پیدا کرتا ہے اور منتخب کرتا ہے۔ (القصص 28:68)",
    "اللہ کی رحمت سے صرف کافر لوگ ہی ناامید ہوتے ہیں۔ (یوسف 12:87)",
    "وہ تمہارا مولا ہے، اور وہ بہترین مددگار ہے۔ (الحج 22:78)",
    "سن لو! اللہ کے ذکر سے دلوں کو سکون ملتا ہے۔ (الرعد 13:28)",
    "غم نہ کرو، بے شک اللہ ہمارے ساتھ ہے۔ (التوبہ 9:40)",
    "اور آپ کا رب کافی ہے ہدایت دینے والا اور مددگار۔ (الفرقان 25:31)",
    "بے شک، میں تمہارے ساتھ ہوں۔ (المائدہ 5:12)"
  ]
};
const cardImages = ["/1.png", "/2.png", "/3.png"];
const maxFlipsPerDay = 5000;

function FlipCard({ onClick, isFlipped, message, image }) {
  return (
    <motion.div className="card-container" onClick={onClick} whileHover={{ scale: 1.1 }}>
      <motion.div className={`card ${isFlipped ? "flipped" : ""}`} animate={{ rotateY: isFlipped ? 180 : 0 }}>
        <div className="card-front">
          <img src={image} alt="Card" className="card-image" />
        </div>
        <div className="card-back">
          <Typography variant="h6" color="white">{message}</Typography>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EmotionSelection() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(`/${emotions[newValue].name.toLowerCase()}`);
  };

  return (
    <div className="app">
      <img src="/logo.png" alt="Logo" className="logo" />
      <Typography variant="h2" className="title">SELECT YOUR EMOTION</Typography>
      <Tabs value={selectedTab} onChange={handleChange} centered className="cont">
        {emotions.map((emotion, index) => (
          <Tab 
          key={emotion.name} 
          label={<span className="emoji">{emotion.emoji}</span>} 
        />        
        ))}
      </Tabs>
    </div>
  );
}

function FlipPage() {
  const navigate = useNavigate();
  const { emotion } = useParams();
  const selectedEmotion = emotions.find((e) => e.name.toLowerCase() === emotion);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [flipCount, setFlipCount] = useState(0);
  const [randomizedMessages, setRandomizedMessages] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("flipData"));
    if (storedData) {
      const lastFlipDate = new Date(storedData.date);
      const today = new Date();
      if (lastFlipDate.toDateString() === today.toDateString()) {
        setFlipCount(storedData.count);
      } else {
        localStorage.setItem("flipData", JSON.stringify({ date: today, count: 0 }));
      }
    }
  }, []);

  const handleCardClick = (index) => {
    if (flipCount < maxFlipsPerDay && flippedIndex === null) {
      setFlippedIndex(index);
      setRandomizedMessages((prev) => ({
        ...prev,
        [index]: messages[selectedEmotion.name][Math.floor(Math.random() * messages[selectedEmotion.name].length)]
      }));
      
      const newCount = flipCount + 1;
      setFlipCount(newCount);
      localStorage.setItem("flipData", JSON.stringify({ date: new Date(), count: newCount }));
    }
  };

  const handleReset = () => {
    setFlippedIndex(null);
  };

  if (!selectedEmotion) {
    return <Typography variant="h5">Emotion not found!</Typography>;
  }

  return (
    <div className="app">
       <img src="/logo.png" alt="Logo" className="logo" />
      <Typography variant="h5" className="title">
        {selectedEmotion.emoji} {selectedEmotion.name} - Flip a Card! (Flips left: {maxFlipsPerDay - flipCount})
      </Typography>

      <div className="card-row">
        {cardImages.map((image, index) => (
          <FlipCard
            key={index}
            onClick={() => handleCardClick(index)}
            isFlipped={flippedIndex === index}
            message={randomizedMessages[index] || ""}
            image={image}
          />
        ))}
      </div>

      <Button variant="contained" color="inherit" onClick={handleReset} disabled={flippedIndex === null}>
        Reset
      </Button><br></br>
      <Button variant="contained" color="" onClick={() => navigate("/")}>Back</Button>
      <Typography variant="body1" className="info-text">
        You can flip a card up to <b>5 times per day</b>. Come back tomorrow for more flips!
      </Typography>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmotionSelection />} />
        <Route path="/:emotion" element={<FlipPage />} />
      </Routes>
    </Router>
  );
}