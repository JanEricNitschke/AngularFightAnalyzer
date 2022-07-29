export const informationmap = new Map<string, string>([
    ["Maps", "Select map and then the allowed positions of CT's and T's.<br>The players have to have been in one of the specified positions for their class.<br> If no positions are are set then every position is allowed."],
    ["Kill", "Select whether you want to filter directly by weapons or generally by classes for the killing weapon.<br> The kill must have been made by a weapon matching at least one of the chosen classes weapons.<br>\
     If nothing is specified then every weapon passes."],
    ["CT", "Select whether you want to filter directly by weapons or generally by classes for CT's.<br>The players must have had at least one matching weapon in their inventory.<br> If nothing is specified then no filter is applied on the CT's inventories."],
    ["T", "Select whether you want to filter directly by weapons or generally by classes for T's.<br>The players must have had at least one matching weapon in their inventory.<br> If nothing is specified then no filter is applied on the T's inventories."],
    ["Time", "Select the time range you want to consider.<br> The value for a kill is how much time has passed between the end of freeze time and the kill, NOT the game time when the kill occured.<br>\
     Pauses affect this time.So kills that occur in a round after a pause will have a time larger than the usual total round time.<br> If you do not want to set an upper limit on the time you can set it to 175.\
      This will include those kills that were pushed back because of a pause."],
]);