// Datos compartidos entre front y worker.

export const CATEGORIES = ["lodging", "food", "groceries", "shopping", "activities", "transport", "nightlife", "other"] as const;
export type Category = (typeof CATEGORIES)[number];

// País (ISO 3166-1 alpha-2) -> moneda (ISO 4217). Nombres de países vía Intl.DisplayNames.
const RAW =
  "AR:ARS,BO:BOB,BR:BRL,CL:CLP,CO:COP,CR:CRC,CU:CUP,DO:DOP,EC:USD,SV:USD,GT:GTQ,HN:HNL,MX:MXN,NI:NIO,PA:PAB,PY:PYG,PE:PEN,PR:USD,UY:UYU,VE:VES," +
  "US:USD,CA:CAD,BS:BSD,BB:BBD,JM:JMD,TT:TTD,AW:AWG,CW:ANG,BZ:BZD," +
  "ES:EUR,PT:EUR,FR:EUR,IT:EUR,DE:EUR,NL:EUR,BE:EUR,AT:EUR,IE:EUR,GR:EUR,FI:EUR,LU:EUR,MT:EUR,CY:EUR,SK:EUR,SI:EUR,EE:EUR,LV:EUR,LT:EUR,HR:EUR,MC:EUR,AD:EUR,SM:EUR,VA:EUR,ME:EUR," +
  "GB:GBP,CH:CHF,LI:CHF,NO:NOK,SE:SEK,DK:DKK,IS:ISK,PL:PLN,CZ:CZK,HU:HUF,RO:RON,BG:BGN,RS:RSD,BA:BAM,MK:MKD,AL:ALL,UA:UAH,MD:MDL,GE:GEL,AM:AMD,AZ:AZN,TR:TRY,RU:RUB," +
  "MA:MAD,EG:EGP,TN:TND,ZA:ZAR,KE:KES,TZ:TZS,NA:NAD,BW:BWP,MU:MUR,SC:SCR,CV:CVE,SN:XOF,GH:GHS,NG:NGN,ET:ETB,MG:MGA," +
  "AE:AED,QA:QAR,SA:SAR,OM:OMR,JO:JOD,IL:ILS,LB:LBP,BH:BHD,KW:KWD," +
  "IN:INR,LK:LKR,MV:MVR,NP:NPR,TH:THB,VN:VND,KH:KHR,LA:LAK,MY:MYR,SG:SGD,ID:IDR,PH:PHP,CN:CNY,HK:HKD,MO:MOP,TW:TWD,JP:JPY,KR:KRW,MN:MNT,KZ:KZT,UZ:UZS," +
  "AU:AUD,NZ:NZD,FJ:FJD,PF:XPF";

export const COUNTRY_CURRENCY: Record<string, string> = Object.fromEntries(RAW.split(",").map((p) => p.split(":")));
export const CURRENCIES = [...new Set(Object.values(COUNTRY_CURRENCY))].sort();


export const MEMBER_COLORS = 8; // paleta en el front (índice)
