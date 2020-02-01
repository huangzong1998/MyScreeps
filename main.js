var roleWorker = require('role.worker');


//将采矿、建筑、升级、维修等后勤功能整合到一个worker类型的creep上
//优先级 1放满spawn和extension 2build建筑 3升级controller
//寻矿，先找矿，没有矿再找箱子
module.exports.loop = function () {
	//清理内存
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    
    if(workers.length < 6){
        var newName = 'Worker' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            newName,{memory: {role:'worker'}});
    }
    //spawn中显示提示
	if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

	//遍历所有creep
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'worker'){
            roleWorker.run(creep);
        }
    }
}