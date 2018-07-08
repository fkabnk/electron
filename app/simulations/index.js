import {ASTROS, BASE_COST, TECHNOLOGIES, STRUCTURES} from "./constants";


const time = {
    day: 86400,
    hour:3600,
    minute:60
}

const Goals = {
    Shipyards: 8,
    WARP_DRIVE: 1,
    credits: 100
}

var Account = {
    economy:0,
    production:0,
    construction:20,
    research:0,
    fleet:0,
    technology:0,
    experience:0,
    bases:1,
    time:0,
    credits: 100
}

var base = {
    area:0,
    population:0,
    energy:4,
    construction:20,
    production:0,
    economy:0
}

var current_techs = {
    ENERGY:0,
    COMPUTER:0,
    ARMOUR:0,
    LASER:0,
    MISSILES:0,
    STELLAR_DRIVE:0,
    PLASMA:0,
    WARP_DRIVE:0,
    SHIELDING:0,
    ION:0,
    PHOTON:0,
    ARTIFICAL_INTELLIGENCE:0,
    DISRUPTOR:0,
    CYBERNETICS:0,
    TACHYON_COMMUNICATIONS:0,
    ANTI_GRAVITY:0
}

var current_structures = {
    Urban_structures:1,
    Solar_plants:0,
    Gas_plants:0,
    Fusion_plants:0,
    Antimatter_plants:0,
    Obrital_plants:0,
    Research_labs:0,
    Metal_refineries:0,
    Crystal_mines:0,
    Robotic_factories:0,
    Shipyards:0,
    Orbital_shipyards:0,
    Spaceports:0,
    Command_centers:0,
    Nanite_factories:0,
    Android_factories:0,
    Economic_centers:0,
    Terraform:0,
    Multilevel_platforms:0,
    Orbital_base:0,
    Jump_gate:0,
    Biosphere_modification:0,
    Capital:0,
    Barracks:0,
    Laser_turrets:0,
    Missile_turrets:0,
    Plasma_turrets:0,
    Ion_turrets:0,
    Photon_turrets:0,
    Disruptor_turrets:0,
    Deflection_shields:0,
    Planetary_shield:0,
    Planetary_ring:0
}

var current_structure = {
    name: "",
    finishTime: 0
}

var current_tech = {
    name: "",
    finishTime: 0
}

var baseStats = {}

var randomKey = (obj) => {
    var keys = Object.keys(obj)
    var key = keys[ keys.length * Math.random() << 0];
    
    return key;
};

export const starter = () =>{
    let astroKey = randomKey(ASTROS);

    let values = ASTROS[astroKey];

    let area = {
        Moon: values.Area_moon,
        Planet: values.Area_planet
    };

    let areaType = randomKey(area);

    let returnObj = {
        type:astroKey,
        value:{
            astro:{
                output:"Astro Type",
                value:astroKey
            },
            area:{
                output:"Astro Area",
                value: area[areaType]
            },
            type:{
                output:"Astro Size",
                value:areaType
            },
            fert:{
                output:"Astro Population",
                value:values.Fertility
            },
            gas:{
                output:"Astro Gas",
                value:values.Gas
            },
            crystals:{
                output:"Astro Crystals",
                value:values.Crystals
            },
            metal:{
                output:"Astro Metal",
                value:values.Metal
            }
        }
    }

    baseStats = returnObj.value;

    base.area = area[areaType];
    base.population = values.Fertility;
}

const checkPossibleBase = (structure) =>{

    let build = STRUCTURES[structure];
    if(Math.abs(build.AREA) < base.area){
        if(Math.abs(build.POPULATION) < base.population){
            if(Math.abs(build.ENERGY) < base.energy){
                return true;
            }
        }
    }

    return false;
}

const checkPossibleTech = (type, name) =>{
    if(type == "tech"){
        var action = TECHNOLOGIES[name];
    }
    if(type == "con"){
        var action = STRUCTURES[name];
    }

    if(action.REQUIREMENTS){
        for(var key in action.REQUIREMENTS){
            if(action.REQUIREMENTS[key] > current_techs[key]){

                return false;
            }
        }
    }

    return true;

}

const checkPossibleLabs = (name) => {
    if(TECHNOLOGIES[name].LABS > current_structures.Research_labs){
        return false;
    }
    return true;
}

const checkPossibleCredits = (type, name) => {
    if(type == "tech"){
        var action = TECHNOLOGIES[name];
    }
    if(type == "con"){
        var action = STRUCTURES[name];
    }

    let cost = Math.ceil(action.BASE_COST*(Math.pow(1.5,action.name)));

    if(cost > Account.credits){
        return false;
    }

    return true;

}

const actions = (action) => {
    switch (action){
        case 0:
            doTech();
        case 1:
            doCon();
    }
}

const sim = () => {
    let simTime = Math.random()*3600;

    current_tech.name = false;
    current_tech.finishTime = Account.time + simTime;

}

const doTech = () =>{

    Account.time = current_tech.finishTime;

    if(current_tech.name){
        current_techs[current_tech.name] += 1;
        current_tech.finishTime = 0;
        current_tech.name = "";
    }

    let key = randomKey(TECHNOLOGIES);
    if(checkPossibleTech("tech", key)){
        if( checkPossibleLabs(key)){
            if(checkPossibleCredits("tech", key)){
                let simChance = Math.floor(Math.random()*Math.floor(100));
                let newRoll = Math.floor(Math.random()*Math.floor(100));

                if(newRoll > simChance){
                    sim();
                }
                else{
                    let cost = Math.ceil(TECHNOLOGIES[key].BASE_COST*(Math.pow(1.5,current_tech[key])));
                    current_tech.name = key;
                    current_tech.finishTime = Account.time + ((cost/(current_structures.Research_labs*6)*time.hour));
                };
            }
        }
    }
}

const doCon = () =>{
    if(current_structure.finishTime != 0){
     Account.time = current_structure.finishTime;
    }
    console.log(current_structure.name)
    if(current_structure.name){
        current_structures[current_structure.name] += 1;
        if(current_structure.name == "Crystal_mines"){
            base.economy += baseStats.crystals.value;
            base.area--;
            base.energy--;
            base.population--;
        }
        else if(current_structure.name == "Metal_refineries"){
            base.economy++;
            base.production += baseStats.metal.value;
            base.construction += baseStats.metal.value;
            base.area--;
            base.energy--;
            base.population--;
        }
        else if(current_structure.name == "Gas_plants"){
            base.economy = STRUCTURES[current_structure.name].ECONOMY;
            base.production = STRUCTURES[current_structure.name].PRODUCTION;
            base.construction = STRUCTURES[current_structure.name].CONSTRUCTION;
            base.area += STRUCTURES[current_structure.name].AREA;
            base.population += STRUCTURES[current_structure.name].POPULATION;
            base.energy += baseStats.gas.value;
        }
        else{
            base.economy = STRUCTURES[current_structure.name].ECONOMY;
            base.production = STRUCTURES[current_structure.name].PRODUCTION;
            base.construction = STRUCTURES[current_structure.name].CONSTRUCTION;
            base.area += STRUCTURES[current_structure.name].AREA;
            base.population += STRUCTURES[current_structure.name].POPULATION;
            base.energy += STRUCTURES[current_structure.name].ENERGY;
        }
        current_structure.name = "";
        current_structure.finishTime = 0;
    }
    let key = randomKey(STRUCTURES);
    if(checkPossibleTech("con", key)){
        if( checkPossibleBase(key)){
            if(checkPossibleCredits("con", key)){
                let simChance = Math.floor(Math.random()*Math.floor(100));
                let newRoll = Math.floor(Math.random()*Math.floor(100));

                if(newRoll > simChance){
                    sim();
                }
                else{
                    let cost = Math.ceil(STRUCTURES[key].COST*(Math.pow(1.5,current_structures[key])));

                    current_structure.name = key;
                    current_structure.finishTime = Account.time + ((cost/base.construction)*3600);

                };
                return;
            }
        }
    }

}

const goalReached = () => {
    if(current_structures.Shipyards < 8 || current_techs.WARP_DRIVE < 1 || Account.credits < 100){
        return false;
    }
    return true;
}

const tick = (time) => {
    let currentHour = Math.ceil(Account.time/time.hour);
    let newHour = Math.floor(time/time.hour);

    if(currentHour > newHour){
        Account.credits = Account.credits + Account.economy;
        Account.time = currentHour*time.hour;
        return true;
    }
    return false;
}

export const doAction = () =>{

    let counter = 0;

    starter();
    while(!goalReached()){
        counter++;
        console.log("doing")
        if(current_structure.finishTime > current_tech.finishTime){
            var nextEvent = 1;
            var newTime = current_structure.finishTime;
            var checkTick = tick(newTime);
            if(!checkTick){
                actions(nextEvent);
            }
        }
        else{
            var nextEvent = 0;
            var newTime = current_tech.finishTime;
            var checkTick = tick(newTime);
            if(!checkTick){
                actions(nextEvent);
            }
        }
        if(counter > 10000){
            break;
        }
    }
    console.log(base)

    console.log(current_structures);

}