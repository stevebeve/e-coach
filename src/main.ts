/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onEnter('hallo').subscribe(() => {
        currentPopup = WA.ui.openPopup("halloPopup", 
        "Willkommen im WA tutorial!\n sieh dich ruhig etwas um :).\n Wenn du bereit bist gehe in den rechten Raum und fange mit der ersten Lektion an.\n Wenn du fertig bist stelle dich im linken Raum auf das Portal um fortzufahren!"
        ,  []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)
    WA.room.area.onLeave('hallo').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
