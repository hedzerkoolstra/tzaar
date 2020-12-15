let allPlayers = []

function addPlayer(newPlayer) {
    
    let idIsNew = true
    allPlayers.forEach(player => {
        if (player.id == newPlayer.id) {
            idIsNew = false
        }
    })
    console.log('Id is new? ' + idIsNew);

    let nameisNew = true
    allPlayers.forEach(player => {
        if (player.name == newPlayer.name) {
            nameisNew = false
        }
    })
    console.log('Name is new? ' + nameisNew);

    // Add player when id and name are new
    if (nameisNew && idIsNew) {
        allPlayers.push(newPlayer)
        console.log(newPlayer.name + ' is added');
    // Change name when id exists but name is new
    } else if (nameisNew && !idIsNew) {
        console.log('name is new, id not');
        allPlayers.forEach(player => {
            if (player.id == newPlayer.id) {
                player.name = newPlayer.name
            }
        })
    // Don't change name if there is already a player with this name
    } else {
        console.log('Player exists');
    }
    
    if (allPlayers.length > 0) {
        console.log('Total Players: ' + allPlayers.length);
    } else {
        console.log('no players');
    }
    return allPlayers
}

function removePlayer(id) {

    console.log(allPlayers.length);

    let i = allPlayers.findIndex(el => {
        return el.id == id
    }) 

    // if (allPlayers.length > 0) {
    //     console.log(allPlayers[i].name + ' will be removed');
    // }
    
    allPlayers.splice(i, 1)
    
    console.log('Total Players: ' + allPlayers.length);

    return allPlayers
}

module.exports = { addPlayer, removePlayer } 