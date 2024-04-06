// Global flags
requireWeapon = true;
weaponLimit = true;
backpackLimit = true;

// First 14 are support weapons last 6 are backpacks
const image_array = [
    'Anti-Materiel Rifle',
    'Expendable Anti-Tank',
    'Arc Thrower',
    'Flamethrower',
    'Autocannon',
    'Grenade Launcher',
    'Heavy Machine Gun',
    'Laser Cannon',
    'Machine Gun',
    'Quasar Cannon',
    'Railgun',
    'Recoilless Rifle',
    'Spear',
    'Stalwart',
    'Anti-Personnel Minefield',
    'Autocannon Sentry',
    'Eagle 110MM Rocket Pods',
    'Eagle 500KG Bomb',
    'Eagle Airstrike',
    'Eagle Cluster Bomb',
    'Eagle Napalm Airstrike',
    'Eagle Smoke Strike',
    'Eagle Strafing Run',
    'EMS Mortar Sentry',
    'Gatling Sentry',
    'HMG Emplacement',
    'Incendiary Mines',
    'Machine Gun Sentry',
    'Mortar Sentry',
    'Orbital 120MM HE Barrage',
    'Orbital 380MM HE Barrage',
    'Orbital Airburst Strike',
    'Orbital EMS Strike',
    'Orbital Gas Strike',
    'Orbital Gatling Barrage',
    'Orbital Laser',
    'Orbital Precision Strike',
    'Orbital Railcannon Strike',
    'Orbital Smoke Strike',
    'Orbital Walking Barrage',
    'Patriot Exosuit',
    'Rocket Sentry',
    'Shield Generator Relay',
    'Tesla Tower',
    'Guard Dog Rover',
    'Guard Dog',
    'Jump Pack',
    'Supply Pack',
    'Shield Generator Pack',
    'Ballistic Shield Backpack'
];

weapons_index_max = 14;
backpack_index_min = image_array.length - 6;

function updateFlags() {
    requireWeapon = document.getElementById('option1').checked
    weaponLimit = document.getElementById('option2').checked
    backpackLimit = document.getElementById('option3').checked
}
  
function get_random_image() {
    updateFlags();
    let selected = [];
    let weaponSelected = false;
    let backpackSelected = false;

    for (let i = 1; i < 5; i++){
        random_index = 0;

        if(requireWeapon && i == 1){ // If weapon is required and it's the first iteration
            random_index = Math.floor(Math.random() * weapons_index_max);
            weaponSelected = true;

        } else {
            while(true){
                random_index = Math.floor(Math.random() * image_array.length);

                // Nothing special if not weapon or backpack
                if(random_index > weapons_index_max && random_index < backpack_index_min){
                    if(!selected.includes(random_index)) break; // Reroll if it has already been selected
                }

                // If it's a weapon...
                if(random_index <= weapons_index_max){
                    // If weapon limit is not on or weapon is not selected
                    if((weaponLimit == false || (random_index >= weapons_index_max || weaponSelected == false))){ 
                        weaponSelected = true;
                        if(!selected.includes(random_index)) break; // Reroll if it has already been selected
                    } 
                }

                // If it's a backpack...
                if(random_index >= backpack_index_min){
                    // If backpack limit is not on or backpack is not selected
                    if((backpackLimit == false || (random_index >= backpack_index_min || backpackSelected == false))){ 
                        backpackSelected = true;
                        if(!selected.includes(random_index)) break; // Reroll if it has already been selected
                    } 
                }
            }
        }
        
        selected.push(random_index); // Index is added to selected array
        const selected_image = image_array[random_index];
        const elementId = 'strat' + i;
        document.getElementById(elementId).src = `./IMG/${selected_image}.svg`;
    }
    
}