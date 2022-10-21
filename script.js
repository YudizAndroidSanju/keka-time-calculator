async function fetchData() {
//    const token = localStorage.getItem('access_token');
    const token = "";
//    console.log('Token:: ' + token);
    if (token == null){
        document.getElementById('message').innerHTML = 'Invalid request. Please check token value';
        return;
    }
    const res = await fetch(
        'https://yudiz.keka.com/k/api/mytime/attendance/summary',
        {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                authorization:
                    'Bearer '+token,
                'cache-control': 'no-cache',
                'content-type': 'application/json; charset=utf-8',
                pragma: 'no-cache',
                'request-context': 'appId=cid-v1:Keka Angular SPA',
                'request-id':
                    '|12ac751a9c54457e90777fd3396381ef.91225a2de2ba495d',
                'sec-ch-ua':
                    '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                traceparent:
                    '00-12ac751a9c54457e90777fd3396381ef-91225a2de2ba495d-01',
                'x-requested-with': 'XMLHttpRequest',
            },
            referrer: 'https://yudiz.keka.com/',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        },
    );
    const record = await res.json();

//    document.getElementById('message').innerHTML = 'Wait';
    var lastEntry = record[record.length - 1];

    if (lastEntry.effectiveHoursInHHMM) {
        var total_break = lastEntry.breakDurationInHHMM;
        var effective_hours = lastEntry.effectiveHoursInHHMM
            .replace('h', '')
            .replace('m', '')
            .replace(' ', ':');
        var entries = lastEntry.originalTimeEntries;
        var last_entry = entries[entries.length - 1];
        var last_in = last_entry.actualTimestamp.split('T')[1];

        let i = effective_hours + ':00',
                       effective_hours_date = new Date(getCurrentDate() + ' ' + i),
                       last_in_date = new Date(getCurrentDate() + ' ' + last_in),
                       s = new Date(),
                       d =
                           new Date(getCurrentDate() + ' 08:00:00').getTime() -
                           effective_hours_date.getTime();
                   d2 = s.getTime() - last_in_date.getTime();
                   let diff = d - d2;

                   if (diff <= 0) {
                   document.getElementById('message').innerHTML = 'Your 8hrs completed';
                   } else {
                       var endAt = new Date(
                           new Date().getTime() + diff,
                       ).toLocaleTimeString([], {
                           hour: '2-digit',
                           minute: '2-digit',
                           second: '2-digit',
                           hour12: true,
                       });
                        document.getElementById('message').innerHTML = 'End at ' + endAt;
                   }
    } else {
        console.log('Response error ' + res);
    }
}

fetchData();

function getCurrentDate() {
    var e = new Date();
    return e.getMonth() + 1 + '/' + e.getDate() + '/' + e.getFullYear();
}

chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
  console.log("AM HERE "+response.status);
});

