

db.weather_data.find({"Wind Direction": { $gt: 180, $lt: 360 }}, {_id: false, "Temperature": true, "State": true}).sort({"Temperature": 1}).limit(1)


