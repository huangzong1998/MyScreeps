var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
		//如果库存有空位
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);//找所在房间的所有资源
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {//尝试采集
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});//不在指定范围就移动过去
            }
        }
        else {//库存满
            var targets = creep.room.find(FIND_STRUCTURES, {//找建筑
                    filter: (structure) => {//建筑类型extension或spawn
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;//库存未满
                    }
            });
            if(targets.length > 0) {//优先充能spawn
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;