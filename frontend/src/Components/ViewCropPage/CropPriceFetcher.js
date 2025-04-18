import React, { useState, useEffect } from 'react';
import './CropPriceFetcher.css';
import { motion } from 'framer-motion';

const CropPriceFetcher = () => {
  const [type, setType] = useState('');
  const [crop, setCrop] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  
  
  useEffect(() => {
    if (state && statesAndDistricts[state]) {
      setDistrictOptions(statesAndDistricts[state]);
    } else {
      setDistrictOptions([]);
    }
    setDistrict('');
  }, [state]);

  const fetchCropPrices = async () => {
    if (!type || !crop || !state || !district) {
      alert("Please select all fields before fetching data.");
      return;
    }

    setLoading(true);
    setError('');
    setShowPopup(false);

    try {
      const response = await fetch(`http://localhost:4000/api/prices?type=${type}&crop=${crop}&state=${state}&district=${district}`);
      const data = await response.json();

      if (data && data.price) {
        setPrice(data.price);
        setTimestamp(data.timestamp);
        setShowPopup(true);
      } else {
        setError("Unexpected response from server.");
        setPrice(null);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      setPrice(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setType('');
    setCrop('');
    setState('');
    setDistrict('');
    setDistrictOptions([]);
    setPrice(null);
    setTimestamp('');
    setShowPopup(false);
    setError('');
  };

  const crops =  [
    "Wheat", "Rice (Paddy)", "Maize (Corn)", "Barley", "Millets", "Bajra (Pearl Millet)", "Jowar (Sorghum)", "Ragi (Finger Millet)", 
    "Chana (Chickpea)", "Moong (Green Gram)", "Masoor (Lentil)", "Arhar/Tur (Pigeon Pea)", "Urad (Black Gram)", "Rajma (Kidney Beans)", 
    "Mustard", "Potato"
]; 

const statesAndDistricts =  {
    "Andhra Pradesh": [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Sri Potti Sriramulu Nellore",
        "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa", "Anakapalli", "Annamayya", "Bapatla",
        "Eluru", "Kakinada", "Konaseema", "Manyam", "Nandyal", "NTR", "Palnadu", "Parvathipuram", "Sathya Sai", "Tirupati"
    ],
    "Arunachal Pradesh": [
        "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada",
        "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare",
        "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar Capital Complex"
    ],
    "Assam": [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh",
        "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong",
        "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
        "Tinsukia", "Udalguri", "West Karbi Anglong", "Bajali", "Tamulpur"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran",
        "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura",
        "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran",
        "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg",
        "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya",
        "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja", "Manendragarh-Chirmiri-Bharatpur",
        "Mohla-Manpur-Ambagarh Chowki", "Sarangarh-Bilaigarh", "Khairagarh-Chhuikhadan-Gandai", "Sakti"
    ],
    "Goa": [
        "North Goa", "South Goa"
    ],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dang", "Gandhinagar", "Jamnagar", "Junagadh",
        "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Puranpur", "Rajkot", "Sabarkantha",
        "Surat", "Surendranagar", "Vadodara", "Valsad"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal",
        "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jammu and Kashmir": [
        "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama",
        "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Giridih", "Godda", "Hazaribagh", "Jamtara", "Khunti", "Koderma",
        "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
        "Bagalkot", "Bangalore", "Belagavi", "Bellary", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada",
        "Davanagere", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara",
        "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
    ],
    "Kerala": [
        "Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram",
        "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
        "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia",
        "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone",
        "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Pachmarhi", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa",
        "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shivpuri", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", 
        "Gadchiroli", "Gondia", "Hingoli", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", 
        "Nanded", "Nandurbar", "Navi Mumbai", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", 
        "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
      ],
      "Manipur": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", 
        "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
      ],
      "Meghalaya": [
        "East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", 
        "South West Khasi Hills", "West Garo Hills", "West Khasi Hills"
      ],
      "Mizoram": [
        "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"
      ],
      "Nagaland": [
        "Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
      ],
      "Odisha": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", 
        "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", 
        "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", 
        "Sambalpur", "Subarnapur", "Sundargarh"
      ],
      "Punjab": [
        "Amritsar", "Barnala", "Bathinda", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", 
        "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shehar", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", 
        "Sangrur", "Tarn Taran"
      ],
      "Rajasthan": [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", 
        "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", 
        "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"
      ],
      "Sikkim": [
        "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
      ],
      "Tamil Nadu": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", 
        "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", 
        "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "The Nilgiris", "Theni", "Tiruchirappalli", 
        "Tirunelveli", "Tiruppur", "Vellore", "Villupuram", "Virudhunagar"
      ],
      "Telangana": [
        "Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahabubnagar", "Medak", "Nalgonda", "Nirmal", "Nizamabad", 
        "Rangareddy", "Warangal", "Khammam"
      ],
      "Tripura": [
        "Dhalai", "Khowai", "North Tripura", "South Tripura", "Unakoti", "West Tripura"
      ],
      "Uttar Pradesh": [
        "Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Banda", 
        "Barabanki", "Bareilly", "Basti", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", 
        "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Gonda", "Gorakhpur", 
        "Hamirpur", "Hardoi", "Hathras", "Jaunpur", "Jhansi", "Jalaun", "Kannauj", "Kanpur", "Kaushambi", "Kushinagar", 
        "Lakhimpur Kheri", "Lucknow","Mainpuri","Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", 
        "Raebareli", "Rampur", "Shahjahanpur", "Sitapur", "Sultanpur", "Unnao", "Varanasi"
      ],
      "Uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", 
        "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
      ],
      "West Bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Bardhaman", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", 
        "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", 
        "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
      ],
      "Puducherry": [
        "Karaikal", "Mahe", "Puducherry", "Yanam"
      ]
    };

  return (
    <div className="crop-container">
      <div className="crop-card">
        <h2>Crop Price Fetcher</h2>
        <div className="form-section">
          <div className="form-group">
            <label>Type:</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
            </select>
          </div>
          <div className="form-group">
            <label>Crop:</label>
            <select value={crop} onChange={e => setCrop(e.target.value)}>
              <option value="">Select Crop</option>
              {crops.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>State:</label>
            <select value={state} onChange={e => setState(e.target.value)}>
              <option value="">Select State</option>
              {Object.keys(statesAndDistricts).map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>District:</label>
            <select value={district} onChange={e => setDistrict(e.target.value)} disabled={!state}>
              <option value="">Select District</option>
              {districtOptions.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="action-buttons">
          <button onClick={fetchCropPrices} disabled={loading || !type || !crop || !state || !district}>
            {loading ? "Fetching..." : "Fetch Prices"}
          </button>
          <button onClick={resetForm} className="reset-btn">Reset</button>
        </div>
        {error && <div className="error-box">{error}</div>}
      </div>

      {showPopup && (
  <div className="popup-overlay" onClick={() => setShowPopup(false)}>
    <motion.div
      className="popup-content industrial-popup"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h2>🔧 Price Info Panel</h2>
      <div className="popup-info">
        <p><span>Crop:</span> {crop}</p>
        <p><span>Type:</span> {type}</p>
        <p><span>Location:</span> {district}, {state}</p>
        <p><span>Price:</span> ₹{price}/quintal</p>
        <p><span>Last Updated:</span> {new Date(timestamp).toLocaleString()}</p>
      </div>
      <button className="popup-close" onClick={() => setShowPopup(false)}>CLOSE</button>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default CropPriceFetcher;
