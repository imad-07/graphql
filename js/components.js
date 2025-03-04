export{ donut, bars, query }
let  donut = (percent, value)=>document.createRange().createContextualFragment(
  `
        <svg id=donut width="400" height="400" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15.915" fill="none" stroke="rgb(220, 180, 140)" stroke-width="3.8"/>
            <circle cx="20" cy="20" r="15.915" fill="none" stroke="#3c2c1d" stroke-width="3.8"
                stroke-dasharray="${percent} ${100 - percent}" stroke-dashoffset="25"
                stroke-linecap="round" transform="rotate(-90 20 20)"/>
                <text x="20" y="22" text-anchor="middle" font-size="5" fill="#ffff">Level: ${value}</text>
        </svg>
    `)
let  bars = (maxWidth, barHeight, spacing, ratio)=>document.createRange().createContextualFragment(
  `<svg id=bars width="${maxWidth + 50}" height="${barHeight * 2 + spacing * 3}">
    <rect x="10" y="${spacing - 5}" width="${ratio / ratio * maxWidth}" height="${barHeight}" stroke="black" stroke-width="5" fill="rgb(220, 180, 140)" />
    <text x="15" y="${spacing + barHeight - 20}" font-size="14" fill="white">Audit Given: ${ratio.toFixed(3)}</text>
    <rect x="10" y="${barHeight + spacing * 2}" width="${(1 /ratio) * maxWidth}" height="${barHeight}" stroke="black" stroke-width="5" fill="#3c2c1d " />
    <text x="15" y="${barHeight * 2 + spacing * 2 - 15}" font-size="14" fill="white">Audit Recieved: 1.000</text>
  </svg>
  `)
const query = `{
    user {
      city : attrs(path: "city")
      login
       auditRatio
    }
    transaction(
       where: {
            type: { _eq: "xp" } ,
            eventId: { _eq: 41 },
   } 
     ) {
       amount
  }
         transaction_aggregate(
      where: { type: { _eq: "level" }, event: { object: { name: { _eq: "Module" } } } }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
    }`
